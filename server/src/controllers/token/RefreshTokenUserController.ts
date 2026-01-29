import type { Request, Response } from "express";
import { RefreshTokenUseCase } from "./../../useCases/refreshTokenUser/refreshTokenUseCase";

export class RefreshTokenUserController {
	async handle(request: Request, response: Response): Promise<Response> {
		const { refreshToken } = request.body;

		const refreshTokenUse = new RefreshTokenUseCase();

		try {
			const token = await refreshTokenUse.handle(refreshToken);
			return response.status(200).json({ token });
		} catch (e) {
			return response.status(401).json("Problem with Refresh token");
		}
	}
}
