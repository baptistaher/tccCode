import { Roles } from "@prisma/client";
import { hash } from "bcryptjs";
import type { NextFunction, Request, Response } from "express";
import { validationResult } from "express-validator";

import { prismaClient } from "../../../database/prismaClient";
import { HttpError } from "../../../models/http-error";
import { CreateClientUseCase } from "../../../useCases/Client/CreateClientUseCase";

export class CreateClientController {
	async handle(request: Request, response: Response, next: NextFunction) {
		if (request.method !== "POST") {
			const error = new HttpError("Method not allowed", 405);
			return next(error);
		}

		const errors = validationResult(request);

		if (!errors.isEmpty()) {
			return next(
				new HttpError("Invalid inputs passed, please check your data.", 422),
			);
		}

		const {
			name,
			email,
			phone,
			birth,
			trainingplanId,
			personalTrainerId,
			discountId,
		} = request.body;

		const createClientUseCase = new CreateClientUseCase();

		try {
			const newClient = await createClientUseCase.handle({
				name,
				email,
				phone,
				birth: new Date(birth),
				trainingplanId,
				personalTrainerId,
				discountId,
			});

			return response.status(201).json(newClient);
		} catch (e) {
			return response.status(500).json("Fail to create Client");
		}
		// let existingUser

		// try {
		//   existingUser = await prismaClient.user.findUnique({
		//     where: {
		//       email: email,
		//     },
		//   })
		// } catch (e) {
		//   const error = new HttpError(
		//     "Couldn't register the client.",
		//     500,
		//   )

		//   return next(error)
		// }

		// if (existingUser) {
		//   const error = new HttpError(
		//     'User exists already',
		//     422,
		//   )
		//   return next(error)
		// }

		// let hashedPassword

		// try {
		//   hashedPassword = await hash('123456', 12)
		// } catch (e) {
		//   const error = new HttpError(
		//     "Couldn't create Client, please try again",
		//     500,
		//   )
		//   return next(error)
		// }

		// let createClient
		// try {
		//   createClient = await prismaClient.user.create({
		//     data: {
		//       name: name,
		//       email: email,
		//       password: hashedPassword,
		//       phone: phone,
		//       role: Roles.CLIENT,
		//       birth_date: new Date(birth),
		//       client: {
		//         create: {
		//           cpt: {
		//             create: {
		//               personal_trainer_id: personalTrainerId,
		//             },
		//           },
		//           ctp: {
		//             create: {
		//               training_plan_id: trainingplanId,
		//             },
		//           },
		//           cd: {
		//             create: {
		//               discount_id: discountId,
		//             },
		//           },
		//         },
		//       },
		//     },
		//   })
		// } catch (e) {
		//   const error = new HttpError('Fail to add Client', 500)
		//   return next(error)
		// }
		// return response.status(201).json(createClient)
	}
}
