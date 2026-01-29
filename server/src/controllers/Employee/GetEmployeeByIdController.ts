import { NextFunction, type Request, type Response } from "express";

import { prismaClient } from "../../database/prismaClient";
import { HttpError } from "../../models/http-error";
import { GetEmployeeByIdUseCase } from "../../useCases/Employee/GetEmployeeByIdUSeCase";

export class GetEmployeeByIdController {
	async handle(
		request: Request,
		response: Response,
		// next: NextFunction,
	) {
		if (request.method !== "GET") {
			return response.status(405).json("Method not allowed");
		}

		const { id } = request.params;

		const getEmployeeByIdUseCase = new GetEmployeeByIdUseCase();

		try {
			const selectedEmployee = await getEmployeeByIdUseCase.handle({ id });

			return response.status(201).json(selectedEmployee);
		} catch (e) {
			return response.status(500).json("Fail to Find Employee by Id");
		}
	}
}
