import type { Request, Response } from "express";
import { GetAllPersonalTrainerUseCase } from "../../useCases/PersonalTrainer/GetAllPersonalTrainerUseCase";

export class GetAllPersonalTrainersController {
	async handle(request: Request, response: Response) {
		if (request.method !== "GET") {
			return response.status(405).json("Method not allowed");
		}

		const getAllPersonalTrainerUseCase = new GetAllPersonalTrainerUseCase();

		try {
			const listPersonalTrainers = await getAllPersonalTrainerUseCase.handle();

			return response.status(200).json(listPersonalTrainers);
		} catch (e) {
			console.log(e);
			return response.status(500).json("couldn't get all PersonalTrainers");
		}
	}
}
