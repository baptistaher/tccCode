import { Roles } from "@prisma/client";
import { hash } from "bcryptjs";
import { prismaClient } from "../../database/prismaClient";
import { ICreateManagerDTO } from "../../repositories/dto/Manager/ICreateManagerDTO";
import { EmailAlreadyExist } from "../../repositories/implementations/EmailAlreadyExist";

export class CreateManagerUseCase {
	async handle({ name, email, phone, cni, nif, birth }: ICreateManagerDTO) {
		const emailAlreadyExist = new EmailAlreadyExist();

		const emailIsUsed = await emailAlreadyExist.handle(email);

		if (emailIsUsed) {
			throw new Error("The email have been used.");
		}

		const hashedPassword = await hash("123456", 12);

		const manager = await prismaClient.user.create({
			data: {
				name,
				email,
				password: hashedPassword,
				phone,
				role: Roles.MANAGER,
				cni,
				nif,
				birth: new Date(birth),
				manager: {
					create: {},
				},
			},
		});

		return manager;
	}
}
