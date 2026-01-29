import { Request, Response, NextFunction } from "express";
import { prismaClient } from "../../database/prismaClient";
import { HttpError } from "../../models/http-error";

export class UpdateEmployeePhoneNumBerController {
	async handle(
		request: Request,
		response: Response,
		next: NextFunction,
	): Promise<Response> {
		const { phone } = request.body;
		const employeeId = request.params.id;

		let employee;
		try {
			employee = await prismaClient.user.findUnique({
				where: {
					id: employeeId,
				},
			});
		} catch (err) {
			// const error = new HttpError("Something went wrong, could not get employee by id ", 500);
			// return next(error);

			return response
				.status(500)
				.json("Something went wrong,could not get employee by id");
		}

		try {
			const updatedPhone = await prismaClient.user.update({
				where: {
					id: employee?.id,
				},
				data: {
					phone: phone,
				},
			});
			return response.status(200).json(updatedPhone);
		} catch (err) {
			// const error = new HttpError("Something went wrong, could not update place.", 500);
			// return next(error);
			return response
				.status(500)
				.json("Something went wrong,could not update the place");
		}
	}
}
