import { prisma } from "../../database/prismaClient";
import type { IGetUserByIdDTO } from "./../../repositories/dto/User/IGetUserByIdDTO";

export class GetUserbyIdUseCase {
	async handle({ id }: IGetUserByIdDTO) {
		const existingUser = await prisma.user.findUnique({
			where: {
				id,
			},
		});

		if (!existingUser) {
			throw new Error("Invalid credential, could log you in.");
		}

		return existingUser;
	}
}
