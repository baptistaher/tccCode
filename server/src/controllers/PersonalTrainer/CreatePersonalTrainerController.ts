import { Request, Response, NextFunction } from "express";
import { validationResult } from "express-validator";
import { HttpError } from "../../models/http-error";
import { CreatePersonalTrainerUseCase } from "../../useCases/PersonalTrainer/CreatePersonalTrainerUseCase";

export class CreatePersonalTrainerController {
	async handle(
		request: Request,
		response: Response,
		next: NextFunction,
	): Promise<Response> {
		if (request.method !== "POST") {
			// const error = new HttpError('Method not allowed', 405)
			// return next(error)
			return response.status(405).json("Method not allowed");
		}

		const errors = validationResult(request);

		if (!errors.isEmpty()) {
			return response
				.status(422)
				.json("Invalid inputs passed, please check your data.");
		}

		const { name, email, phone, CNI, NIF, birth, value } = request.body;

		const createPersonalTrainerUseCase = new CreatePersonalTrainerUseCase();

		try {
			const newPersonalTrainer = await createPersonalTrainerUseCase.handle({
				name,
				email,
				phone,
				CNI,
				NIF,
				birth: new Date(birth),
				value: Number(value),
			});

			return response.status(201).json(newPersonalTrainer);
		} catch (e) {
			return response.status(400).json("Fail to Create Personal Trainer");
		}
	}
}
