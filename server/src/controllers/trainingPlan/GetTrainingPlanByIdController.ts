import type { Request, Response } from "express";
import { GetTrainingPlanByIdUseCase } from "../../useCases/TrainingPlan/GetTrainingPlanByIdUseCase";

export class GetTrainingPlanByIdController {
	async handle(request: Request, response: Response) {
		if (request.method !== "GET") {
			return response.status(405).json("Method not allowed");
		}

		const { id } = request.params;

		const getTrainingPlanByUse = new GetTrainingPlanByIdUseCase();

		try {
			const trainingPlanInfo = await getTrainingPlanByUse.handle({
				id: String(id),
			});

			if (Object.keys(trainingPlanInfo).length === 0) {
				return response.status(500).json("Training don't Exist");
			}

			return response.status(200).json(trainingPlanInfo);
		} catch (error) {
			console.log(error);
			return response.status(500).json("Fail to Find Training Plan by id");
		}
	}
}
