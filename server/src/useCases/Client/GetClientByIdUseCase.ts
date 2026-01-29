import { prismaClient } from "../../database/prismaClient";
import type { IGetClientByIdDTO } from "../../repositories/dto/Client/IGetClientByIdDTO";

export class GetClientByIdUseCase {
	async handle({ id }: IGetClientByIdDTO) {
		const clientExist = await prismaClient.client.findUnique({
			where: {
				id,
			},

			select: {
				user: {
					select: {
						name: true,
						email: true,
						birth: true,
					},
				},
				cpt: {
					select: {
						// id: true,
						personal_trainer_id: true,
						personalTrainer: {
							select: {
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
						// id: true,
						training_plan_id: true,
						train: {
							select: {
								name: true,
							},
						},
					},
				},
				cd: {
					select: {
						// id: true,
						discount_id: true,
						discount: {
							select: {
								name: true,
							},
						},
					},
				},
			},
		});

		if (!clientExist) {
			throw Error("client don't exist");
		}

		const clientInfo = {
			name: clientExist.user.name,
			// name: clientExist.
			email: clientExist.user.email,
			birth: clientExist.user.birth.toISOString().slice(0, 10),
			personalTrainerID: clientExist.cpt?.personal_trainer_id,
			personalTrainerName: clientExist.cpt?.personalTrainer?.user.name,
			trainingPlanID: clientExist.ctp?.training_plan_id,
			trainingPlanName: clientExist.ctp?.train?.name,
			discountID: clientExist.cd?.discount_id,
			discountName: clientExist.cd?.discount?.name,
		};

		return clientInfo;
	}
}
