import { prismaClient } from "../../database/prismaClient";
import type { ICreateTrainingPlanDTO } from "../../repositories/dto/TrainingPlan/ICreateTrainingPlanDTO";

export class CreateTrainingPlanUseCase {
	async handle({ name, description, value }: ICreateTrainingPlanDTO) {
		const createTraining = await prismaClient.training_plan.create({
			data: {
				name,
				description,
				value,
			},
		});

		return createTraining;
	}
}
