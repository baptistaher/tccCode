import { hash } from "bcryptjs";
import { prismaClient } from "../../database/prismaClient";
import { ICreatePersonalTrainerDTO } from "./../../repositories/dto/PersonalTrainer/ICreatePersonalTrainerDTO";

export class CreatePersonalTrainerUseCase {
	async handle({
		name,
		email,
		phone,
		CNI,
		NIF,
		birth,
		value,
	}: ICreatePersonalTrainerDTO) {
		const emailAlreadyExists = await prismaClient.user.findFirst({
			where: {
				email,
			},
		});

		if (emailAlreadyExists) {
			throw new Error("email is already used");
		}

		const hashedPassword = await hash("123456", 12);

		const personalTrainer = await prismaClient.user.create({
			data: {
				name,
				email,
				password: hashedPassword,
				phone,
				role: "PERSONALTRAINER",
				cni: CNI,
				nif: NIF,
				birth: birth,
				personal_trainers: {
					create: {
						value,
					},
				},
			},
		});

		return personalTrainer;
	}
}
