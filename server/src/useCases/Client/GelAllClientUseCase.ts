import { prismaClient } from "../../database/prismaClient";

export class GetAllClientUseCase {
	async handle() {
		const data = await prismaClient.client.findMany({
			select: {
				id: true,
				user: {
					select: {
						name: true,
						email: true,
						// phone: true,
					},
				},
				ctp: {
					select: {
						train: {
							select: {
								name: true,
							},
						},
					},
				},
			},
		});

		const listClients = data.map((item) => {
			return {
				id: item.id,
				name: item.user.name,
				email: item.user.email,
				// phone: item.user.phone,
				trainPlan: item.ctp?.train?.name,
			};
		});

		return listClients;
	}
}
