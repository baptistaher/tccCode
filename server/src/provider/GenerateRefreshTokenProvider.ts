import dayjs from "dayjs";
import { prismaClient } from "../database/prismaClient";
import { HttpError } from "../models/http-error";

export class GenerateRefreshTokenProvider {
	async execute(userId: string) {
		const expiresIn = dayjs().add(1, "day").unix();

		let generateRefreshToken;
		try {
			generateRefreshToken = await prismaClient.refreshToken.create({
				data: {
					userId,
					expiresIn,
				},
			});

			return generateRefreshToken;
		} catch (e) {
			// throw new Error("Can create the Refresh Token")
			const error = new HttpError("Can't create the Refresh Token", 500);
			return error;
		}

		return generateRefreshToken;
	}
}
