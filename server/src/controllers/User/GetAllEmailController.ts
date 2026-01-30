import type { Request, Response } from "express";
import { prisma } from "../../database/prismaClient";

export class GetAllEmailUserController {
	async handle(request: Request, response: Response): Promise<Response> {
		//  allEmail;

		if (request.method !== "GET") {
			// const error = new HttpError('Method not allowed', 405)
			// return next(error)
		}

		try {
			const allEmail = await prisma.user.findMany({
				select: {
					email: true,
				},
			});

			return response.status(200).json(allEmail);
		} catch (err) {
			console.log(err);
			// const error = new HttpError(
			//   "Couldn't get all User Email",
			//   404,
			// )
			// return error
			return response.status(404).json("Couldn't get all User Email");
		}

		// return response.status(200).json(allEmail)
	}
}
