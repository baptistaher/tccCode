import { prismaClient } from "../../database/prismaClient";
import { ICreateTrainingPlanDTO } from "../../repositories/dto/TrainingPlan/ICreateTrainingPlanDTO";

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
