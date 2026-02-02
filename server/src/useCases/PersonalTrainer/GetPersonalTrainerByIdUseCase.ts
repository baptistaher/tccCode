import { prisma } from "../../database/prismaClient";
import type { IGetPersonalTrainerByIdDTO } from "./../../repositories/dto/PersonalTrainer/IGetPersonalTrainerByIdDTO";

export class GetPersonalTrainerByIdUseCase {
	async handle({ id }: IGetPersonalTrainerByIdDTO) {
		const personalTrainerData = await prisma.personalTrainer.findUnique({
			where: {
				id,
			},
			select: {
				user: {
					select: {
						name: true,
						email: true,
						birth: true,
						cni: true,
						nif: true,
					},
				},
				value: true,
			},
		});

		if (!personalTrainerData) {
			throw new Error("Personal Trainer list is empty");
		}

		const personalTrainer = {
			name: personalTrainerData.user.name,
			email: personalTrainerData.user.email,
			birth: personalTrainerData.user.birth.toISOString().slice(0, 10),
			cni: personalTrainerData.user.cni,
			nif: personalTrainerData.user.nif,
			value: personalTrainerData.value,
		};

		return personalTrainer;
	}
}
