import type { User } from "@prisma/client";
import { prisma } from "../../database/prismaClient";
import type { IEmailAlreadyExist } from "./../IEmailAlreadyExist";

export class EmailAlreadyExist implements IEmailAlreadyExist {
	async handle(email: string): Promise<User | null> {
		const user = await prisma.user.findFirst({
			where: { email },
		});

		return user;
	}
}
