import { compare } from "bcryptjs";
import { prismaClient } from "../../database/prismaClient";
import { HttpError } from "../../models/http-error";
import { GenerateRefreshTokenProvider } from "../../provider/GenerateRefreshTokenProvider";
import { GenerateTokenProvider } from "../../provider/GenerateTokenProvider";

interface IRequest {
	email: string;
	password: string;
}

export class LoginUseCase {
	async execute({ email, password }: IRequest) {
		// not finish
		let existingUser;
		try {
			existingUser = await prismaClient.user.findUnique({
				where: {
					email,
				},
			});
		} catch (e) {
			throw new Error("Logging in failed please try again later. ");
		}

		// console.log(existingUser)

		if (existingUser === null) {
			// const error = new HttpError(
			//   'Invalid credential, could not log you in.',
			//   403,
			// )
			// return error
			throw new Error("Invalid credential, could log you in.");
		}

		// let isValidPassword = false

		// console.log(password)
		// console.log(existingUser.password)

		// try {
		const isValidPassword = await compare(password, existingUser.password);
		// } catch (e) {
		//   const error = new HttpError(
		//     'Could not log you in, please check your credentials and try again',
		//     500,
		//   )
		//   return error
		// }

		console.log(isValidPassword);

		if (!isValidPassword) {
			// const error = new HttpError(
			//   'Invalid credentials, could not log you in.',
			//   403,
			// )
			// return error
			throw new Error("Invalid password, could not log you in.");
		}

		let token;
		let refreshToken;

		const generateTokenProvider = new GenerateTokenProvider();

		const generateRefreshTokenProvider = new GenerateRefreshTokenProvider();

		// try {
		token = await generateTokenProvider.execute(existingUser.id);

		await prismaClient.refreshToken.deleteMany({
			where: {
				userId: existingUser.id,
			},
		});
		// } catch (e) {
		//   const error = new HttpError(
		//     'Login in failed, please try again later.',
		//     500,
		//   )
		//   return error
		// }

		// try {
		refreshToken = await generateRefreshTokenProvider.execute(existingUser.id);

		return { token, refreshToken, userId: existingUser.id };
	}
}
