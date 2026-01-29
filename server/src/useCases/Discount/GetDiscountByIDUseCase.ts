import { prismaClient } from "../../database/prismaClient";
import type { IGetDiscountByIdDTO } from "./../../repositories/dto/Discount/IGetDiscountByIdDTO";

export class GetDiscountByIdUseCase {
	async handle({ id }: IGetDiscountByIdDTO) {
		const discountExist = await prismaClient.discount.findUnique({
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
