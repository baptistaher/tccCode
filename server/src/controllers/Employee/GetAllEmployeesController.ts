import { Employee, prisma, Roles, Status } from "@prisma/client";

import { NextFunction, Request, Response } from "express";
import { prismaClient } from "../../database/prismaClient";
import { HttpError } from "../../models/http-error";
import { GetAllEmployeesUseCase } from "../../useCases/Employee/GetAllEmployeeUseCase";

export class GetAllEmployeesController {
	async handle(request: Request, response: Response, next: NextFunction) {
		if (request.method !== "GET") {
			const error = new HttpError("Method not allowed", 405);
			return next(error);
		}

		const getAllEmployeeUseCase = new GetAllEmployeesUseCase();

		try {
			const listEmployee = await getAllEmployeeUseCase.handle();

			return response.status(200).json(listEmployee);
		} catch (e) {
			return response.status(400).json("Fail to get all employee");
		}

		// try {
		//   const data = await prismaClient.employee.findMany({
		//     select: {
		//       id: true,
		//       status: true,
		//       user: {
		//         select: {
		//           name: true,
		//           email: true,
		//         },
		//       },
		//     },
		//   })

		//   const employee = data.map((item) => {
		//     return {
		//       id : item.id,
		//       status: item.status,
		//       name: item.user.name,
		//       email: item.user.email
		//     }
		//   })
		//   // const employees = await prismaClient.user.findMany({
		//   //   select: {
		//   //     id: true,
		//   //     name: true,
		//   //     email: true,
		//   //     employee: {
		//   //       select: {
		//   //         status: true
		//   //       }
		//   //     }
		//   //   },
		//   //   where: {
		//   //     role: Roles.EMPLOYEE
		//   //   },
		//   // });

		//   return response.json(employee)
		// } catch (e) {
		//   return response
		//     .status(400)
		//     .json({ error: 'Unknown error' })
		// }
	}
}
