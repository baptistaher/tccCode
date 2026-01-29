import type { NextFunction, Request, Response } from "express";
import { GetClientByIdUseCase } from "../../../useCases/Client/GetClientByIdUseCase";

export class GetClientByIdController {
	async handle(
		request: Request,
		response: Response,
		next: NextFunction,
	): Promise<Response> {
		if (request.method !== "GET") {
			// const error = new HttpError('Method not allowed', 405)
			// return next(error)
			return response.status(405).json("Method not allowed");
		}

		const { id } = request.params;

		const getClientByIdUseCase = new GetClientByIdUseCase();

		try {
			const listClients = await getClientByIdUseCase.handle({ id });

			if (Object.keys(listClients).length === 0) {
				return response.status(500).json("Client don't Exist");
			}

			return response.status(200).json(listClients);
		} catch (e) {
			return response.status(500).json("Fail to Find Client by Id");
		}

		// let client

		// try {
		//   client = await prismaClient.client.findUnique({
		//     where: {
		//       id: id,
		//     },
		//     select: {
		//       user: {
		//         select: {
		//           name: true,
		//         },
		//       },
		//     },
		//   })
		// } catch (e) {
		//   // const error = new HttpError(
		//   //   'Fail to Find Client by ID',
		//   //   500,
		//   // )
		//   // return next(error)
		//   return response
		//     .status(500)
		//     .json('Fail to Find Client by ID')
		// }

		// return response.status(200).json(client)
	}
}
