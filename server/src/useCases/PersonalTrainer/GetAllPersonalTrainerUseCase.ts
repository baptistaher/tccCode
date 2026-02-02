import { prisma } from "../../database/prismaClient";

export class GetAllPersonalTrainerUseCase {
	async handle() {
		const data = await prisma.personalTrainer.findMany({
			select: {
				id: true,
				value: true,
				user: {
					select: {
						name: true,
						email: true,
					},
				},
			},
		});

		if (!data) {
			throw new Error("listPersonalTrainer empty.");
		}

		const listPersonalTrainer = data.map((item) => {
			return {
				id: item.id,
				name: item.user.name,
				email: item.user.email,
				value: item.value,
			};
		});

		return listPersonalTrainer;
	}
}
