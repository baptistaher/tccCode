import { IEmailAlreadyExist } from "./../IEmailAlreadyExist";
import { User } from "@prisma/client";
import { prismaClient } from "../../database/prismaClient";

export class EmailAlreadyExist implements IEmailAlreadyExist {
	async handle(email: string): Promise<User | null> {
		const user = await prismaClient.user.findFirst({
			where: { email },
		});

		return user;
	}
}
