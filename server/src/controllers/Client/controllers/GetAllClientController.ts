import type { Request, Response } from "express";

import { GetAllClientUseCase } from "../../../useCases/Client/GelAllClientUseCase";

export class GetAllClientController {
	async handle(request: Request, response: Response): Promise<Response> {
		if (request.method !== "GET") {
			// const error = new HttpError('Method not allowed', 405)
			// return next(error)
			return response.status(405).json("Method not allowed");
		}

		const getAllClientUseCase = new GetAllClientUseCase();

		try {
			const listClients = await getAllClientUseCase.handle();

			return response.status(200).json(listClients);
		} catch (e) {
			console.error(e);
			return response.status(500).json("Couldn't get all Clients");
		}

		// try {
		//   const data = await prismaClient.client.findMany({
		//     select: {
		//       id: true,
		//       user: {
		//         select: {
		//           name: true,
		//           email: true,
		//         },
		//       },
		//       ctp: {
		//         select: {
		//           // training_plan_id: true,
		//           train: {
		//             select: {
		//               name: true,
		//             },
		//           },
		//         },
		//       },
		//     },
		//   })

		//   const clients = data.map((item) => {
		//     return {
		//       id: item.id,
		//       name: item.user.name,
		//       email: item.user.email,
		//       trainPlan: item.ctp?.train?.name
		//     }
		//   })

		//   return response.status(200).json(clients)
		// } catch (e) {
		//   const error = new HttpError(
		//     "couldn't get all Clients",
		//     500,
		//   )
		//   return next(error)
		// }
	}
}
