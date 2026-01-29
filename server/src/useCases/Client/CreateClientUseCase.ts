import { ICreateClientDTO } from "./../../repositories/dto/Client/ICreateClientDTO";
import { prismaClient } from "../../database/prismaClient";
import { EmailAlreadyExist } from "../../repositories/implementations/EmailAlreadyExist";
import { hash } from "bcryptjs";
import { Roles } from "@prisma/client";

export class CreateClientUseCase {
	async handle({
		name,
		email,
		phone,
		birth,
		trainingplanId,
		personalTrainerId,
		discountId,
	}: ICreateClientDTO) {
		const emailAlreadyExist = new EmailAlreadyExist();

		const emailIsUsed = await emailAlreadyExist.handle(email);

		if (emailIsUsed) {
			throw new Error("The email have been used");
		}

		const hashedPassword = await hash("123456", 12);

		const newClient = await prismaClient.user.create({
			data: {
				name,
				email,
				password: hashedPassword,
				phone,
				role: Roles.CLIENT,
				birth: birth,
				client: {
					create: {
						cpt: {
							create: {
								personal_trainer_id: personalTrainerId,
							},
						},
						ctp: {
							create: {
								training_plan_id: trainingplanId,
							},
						},
						cd: {
							create: {
								discount_id: discountId,
							},
						},
					},
				},
			},
		});

		return newClient;

		// const newClient = new prismaClient.user.create({
		//   data:{
		//   }
		// })
	}
}
