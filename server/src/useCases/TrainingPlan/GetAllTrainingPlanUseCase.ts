import { prismaClient } from "../../database/prismaClient";

export class GetAllTrainingPlansUseCase {
	async handle() {
		const listTrainingPlans = await prismaClient.training_plan.findMany({
			select: {
				id: true,
				name: true,
				value: true,
			},
		});

		if (!listTrainingPlans) {
			throw new Error("TrainingPlan empty.");
		}

		return listTrainingPlans;
	}
}
