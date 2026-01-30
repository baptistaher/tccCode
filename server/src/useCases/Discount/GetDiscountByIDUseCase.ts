import { prisma } from "../../database/prismaClient";
import type { IGetDiscountByIdDTO } from "./../../repositories/dto/Discount/IGetDiscountByIdDTO";

export class GetDiscountByIdUseCase {
	async handle({ id }: IGetDiscountByIdDTO) {
		const discountExist = await prisma.discount.findUnique({
			where: {
				id,
			},
		});

		if (!discountExist) {
			throw Error("Discount don't exist");
		}

		return discountExist;
	}
}
