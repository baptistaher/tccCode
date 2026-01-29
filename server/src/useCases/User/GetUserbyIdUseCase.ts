import { prismaClient } from "../../database/prismaClient";
import { IGetUserByIdDTO } from "./../../repositories/dto/User/IGetUserByIdDTO";

export class GetUserbyIdUseCase {
	async handle({ id }: IGetUserByIdDTO) {
		const existingUser = await prismaClient.user.findUnique({
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
