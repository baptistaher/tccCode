import { NextFunction, type Request, type Response } from "express";
import { validationResult } from "express-validator";

import { CreateEmployeeUseCase } from "../../useCases/Employee/CreateEmployeeUseCase";
// import

export class CreateEmployeeController {
	async handle(request: Request, response: Response): Promise<Response> {
		if (request.method !== "POST") {
			return response.status(405).json("Method not allowed");
		}

		const errors = validationResult(request);

		// if (!errors.isEmpty()) {

		//   return response
		//     .status(422)
		//     .json(
		//       'Invalid inputs passed,please check our data.',
		//     )
		// }

		const { name, email, phone, CNI, NIF, birth } = request.body;

		// console.log(request.body);
		// console.log("name: " + name);
		// console.log("email: " + email);
		// console.log("phone:" + phone);
		// console.log("CNI: " +  CNI);
		// console.log("NIF: " + NIF );
		// console.log("birth " + birth);

		const createEmployeeUseCase = new CreateEmployeeUseCase();

		// const newEmployee = await createEmployeeUseCase.handle({
		//   name,
		//   email,
		//   phone,
		//   CNI,
		//   NIF,
		//   birth,
		// })

		try {
			const newEmployee = await createEmployeeUseCase.handle({
				name,
				email,
				phone,
				CNI,
				NIF,
				birth,
			});

			if (Object.keys(newEmployee).length === 0) {
				// const error = new HttpError("Email is already used",500)
				// next(error)
				return response.status(402).json("Email is already used");
			}

			return response.status(201).json(newEmployee);
		} catch (e) {
			// const error = new HttpError("Couldn't register the Employee",500)
			//  next(error)
			return response.status(500).json("Couldn't register the Employee");
		}
	}
}
