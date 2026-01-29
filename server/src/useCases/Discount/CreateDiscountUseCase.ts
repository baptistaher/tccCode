import { ICreateDiscountDTO } from "./../../repositories/dto/Discount/ICreateDiscountDTO";
import { prismaClient } from "../../database/prismaClient";

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
