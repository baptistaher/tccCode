import { Request, Response } from "express";
import { GetUserbyIdUseCase } from "../../useCases/User/GetUserbyIdUseCase";

export class GetUserByIdController {
	async handle(request: Request, response: Response) {
		if (request.method !== "GET") {
			return response.status(405).json("Method not allowed");
		}

		const { id } = request.params;

		const getUserByIdUseCase = new GetUserbyIdUseCase();

		try {
			const getUserInfo = await getUserByIdUseCase.handle({
				id,
			});

			if (Object.keys(getUserInfo).length === 0) {
				return response.status(500).json("Client don't Exist");
			}

			return response.status(200).json(getUserInfo);
		} catch (e) {
			return response.status(500).json("Fail to get User info");
		}
	}
}
