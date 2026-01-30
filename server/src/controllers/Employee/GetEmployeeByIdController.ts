import type { Request, Response } from "express";

import { GetEmployeeByIdUseCase } from "../../useCases/Employee/GetEmployeeByIdUSeCase";

export class GetEmployeeByIdController {
	async handle(request: Request, response: Response) {
		if (request.method !== "GET") {
			return response.status(405).json("Method not allowed");
		}

		const { id } = request.params;

		const getEmployeeByIdUseCase = new GetEmployeeByIdUseCase();

		try {
			const selectedEmployee = await getEmployeeByIdUseCase.handle({
				id: String(id),
			});

			return response.status(201).json(selectedEmployee);
		} catch (e) {
			console.error(e);
			return response.status(500).json("Fail to Find Employee by Id");
		}
	}
}
