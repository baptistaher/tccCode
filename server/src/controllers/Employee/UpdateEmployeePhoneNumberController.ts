import type { Request, Response } from "express";
import { prisma } from "../../database/prismaClient";

export class UpdateEmployeePhoneNumBerController {
	async handle(request: Request, response: Response): Promise<Response> {
		const { phone } = request.body;
		const employeeId = request.params.id;

		// let employee;
		// try {
		const employee = await prisma.user.findUnique({
			where: {
				id: Array.isArray(employeeId) ? employeeId[0] : employeeId,
			},
		});
		// } catch (err) {
		//   // const error = new HttpError("Something went wrong, could not get employee by id ", 500);
		//   // return next(error);

		//   return response
		//     .status(500)
		//     .json("Something went wrong,could not get employee by id");
		// }

		try {
			const updatedPhone = await prisma.user.update({
				where: {
					id: employee?.id,
				},
				data: {
					phone: phone,
				},
			});
			return response.status(200).json(updatedPhone);
		} catch (err) {
			console.log(err);
			// const error = new HttpError("Something went wrong, could not update place.", 500);
			// return next(error);
			return response
				.status(500)
				.json("Something went wrong,could not update the place");
		}
	}
}
