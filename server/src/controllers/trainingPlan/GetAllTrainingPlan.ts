import type { NextFunction, Request, Response } from "express";
import { GetAllTrainingPlansUseCase } from "../../useCases/TrainingPlan/GetAllTrainingPlanUseCase";

export class GetAllTrainingPlansController {
	async handle(
		request: Request,
		response: Response,
		next: NextFunction,
	): Promise<Response> {
		if (request.method !== "GET") {
			return response.status(405).json("Method not allowed");
		}

		try {
			const getAllTrainingPLanUseCase = new GetAllTrainingPlansUseCase();
			const listTrainingPlans = await getAllTrainingPLanUseCase.handle();
			return response.status(200).json(listTrainingPlans);
		} catch (e) {
			return response.status(500).json("couldn't get all Training Plans");
		}
	}
}
