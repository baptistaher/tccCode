// import { GetPersonalTrainerByIdController } from './GetPersonalTrainerByIdController';
import { NextFunction, type Request, type Response } from "express";

import { prismaClient } from "../../database/prismaClient";
import { HttpError } from "../../models/http-error";
import { GetPersonalTrainerByIdUseCase } from "../../useCases/PersonalTrainer/GetPersonalTrainerByIdUseCase";

export class GetPersonalTrainerByIdController {
	async handle(request: Request, response: Response) {
		if (request.method !== "GET") {
			return response.status(405).json("Method not allowed");
		}

		const { id } = request.params;

		const getPersonalTrainerByIdUseCase = new GetPersonalTrainerByIdUseCase();
		try {
			const selectedPersonalTrainer =
				await getPersonalTrainerByIdUseCase.handle({ id });

			return response.status(200).json(selectedPersonalTrainer);
		} catch (error) {
			return response.status(500).json("Fail to Find Personal Trainer by Id");
		}
	}
}

// export const GetPersonalTrainerByIdController = async (
//   request: Request,
//   response: Response,
//   next: NextFunction,
// ) => {
//   if (request.method !== 'GET') {
//     // const error = new HttpError('Method not allowed', 405)
//     // return next(error)
//     return response.status(405).json('Method not allowed')
//   }

//   const { id } = request.params

//   const getPersonalTrainerByIdUseCase =
//     new GetPersonalTrainerByIdUseCase()

//   try {
//     const selectedPersonalTrainer =
//       await getPersonalTrainerByIdUseCase.handle({ id })

//     return response
//       .status(200)
//       .json(selectedPersonalTrainer)
//   } catch (e) {
//     return response
//       .status(500)
//       .json('Fail to Find Personal Trainer by Id')
//   }
// }
