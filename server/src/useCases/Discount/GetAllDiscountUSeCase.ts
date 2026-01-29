import { prismaClient } from "../../database/prismaClient";

export class GetAllDiscountUseCase {
	async handle() {
		const listDiscount = await prismaClient.discount.findMany({
			select: {
				id: true,
				name: true,
				value: true,
			},
		});

		return listDiscount;
	}
}
