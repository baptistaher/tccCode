import { prismaClient } from "../../database/prismaClient";
import type { ICreateDiscountDTO } from "./../../repositories/dto/Discount/ICreateDiscountDTO";

export class CreateDiscountUseCase {
	async handle({ name, description, value }: ICreateDiscountDTO) {
		const newDiscount = await prismaClient.discount.create({
			data: {
				name,
				description,
				value,
			},
		});

		return newDiscount;
	}
}
