import type { Request, Response } from "express";
import { validationResult } from "express-validator";
import { CreateTrainingPlanUseCase } from "../../useCases/TrainingPlan/CreateTrainingPlanUseCase";

export class CreateTrainingPlanController {
	async handle(request: Request, response: Response): Promise<Response> {
		if (request.method !== "POST") {
			return response.status(405).json("Method not allowed");
		}

		const errors = validationResult(request);

		if (!errors.isEmpty()) {
			return response
				.status(422)
				.json("Invalid inputs passed, please check your data.");
		}

		const { name, description, value } = request.body;

		try {
			const createTrainingPlanUseCase = new CreateTrainingPlanUseCase();
			const trainingplan = await createTrainingPlanUseCase.handle({
				name,
				description,
				value: Number(value),
			});

			return response.status(201).json(trainingplan);
		} catch (err) {
			console.log(err);
			return response.status(400).json("Fail to Create TrainingPlan");
		}
	}
}
