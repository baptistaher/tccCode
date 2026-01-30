// import { GetPersonalTrainerByIdController } from './GetPersonalTrainerByIdController';
import type { Request, Response } from "express";

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
				await getPersonalTrainerByIdUseCase.handle({
					id: Array.isArray(id) ? id[0] : id,
				});

			return response.status(200).json(selectedPersonalTrainer);
		} catch (error) {
			console.error(error);
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
