import { Roles } from "@prisma/client";
import { hash } from "bcryptjs";
import { prisma } from "../../database/prismaClient";
import type { ICreateEmployeeDTO } from "./../../repositories/dto/Employee/ICreateEmployeeDTO";

export class CreateEmployeeUseCase {
	async handle({ name, email, phone, CNI, NIF, birth }: ICreateEmployeeDTO) {
		// const userAlreadyExist = new EmailAlreadyExist()

		// const emailIsUsed = await userAlreadyExist.handle(email)

		// if (emailIsUsed) {
		//  throw new Error('The email have been used ')
		// }

		const hashedPassword = await hash("123456", 12);

		const newEmployee = await prisma.user.create({
			data: {
				name,
				email,
				password: hashedPassword,
				phone,
				role: Roles.EMPLOYEE,
				cni: CNI,
				nif: NIF,
				birth: new Date(birth),
				employee: {
					create: {},
				},
			},
		});

		return newEmployee;
	}
}
