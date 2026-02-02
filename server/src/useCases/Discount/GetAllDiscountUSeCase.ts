import { prisma } from "../../database/prismaClient";

export class GetAllDiscountUseCase {
	async handle() {
		const listDiscount = await prisma.discount.findMany({
			select: {
				id: true,
				name: true,
				value: true,
			},
		});

		return listDiscount;
	}
}
