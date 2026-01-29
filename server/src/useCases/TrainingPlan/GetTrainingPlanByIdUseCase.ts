import { prismaClient } from "../../database/prismaClient";
import type { IGetTrainingPlanByIdDTO } from "./../../repositories/dto/TrainingPlan/IGetTrainingPlanByIDTO";

export class GetTrainingPlanByIdUseCase {
	async handle({ id }: IGetTrainingPlanByIdDTO) {
		const trainingPlanExist = await prismaClient.training_plan.findUnique({
			where: {
				id,
			},
		});

		if (!trainingPlanExist) {
			throw Error("Training don't exist");
		}

		return trainingPlanExist;
	}
}
