import { prismaClient } from "../../database/prismaClient";

export class GetPaymentByIdUseCase {
	async handle({ userId }: { userId: string }) {
		const payment = await prismaClient.client.findUnique({
			where: {
				id: userId,
			},

			select: {
				cpt: {
					select: {
						personal_trainer_id: true,
						personalTrainer: {
							select: {
								value: true,
								user: {
									select: {
										name: true,
									},
								},
							},
						},
					},
				},
				ctp: {
					select: {
						training_plan_id: true,
						train: {
							select: {
								name: true,
								value: true,
							},
						},
					},
				},

				cd: {
					select: {
						discount_id: true,
						discount: {
							select: {
								name: true,
								value: true,
							},
						},
					},
				},
			},
		});

		const paymentInfo = {
			personalTrainerId: payment?.cpt?.personal_trainer_id,
			personalTrainerName: payment?.cpt?.personalTrainer?.user.name,
			persontalTrainerValue: payment?.cpt?.personalTrainer?.value,
			trainingPlanId: payment?.ctp?.training_plan_id,
			trainingPlanName: payment?.ctp?.train?.name,
			trainingPlanValue: payment?.ctp?.train?.value,
			discountPlanId: payment?.cd?.discount_id,
			discountName: payment?.cd?.discount?.name,
			discountValue: payment?.cd?.discount?.value,
		};

		return paymentInfo;
	}
}
