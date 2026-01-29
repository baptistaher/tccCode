import { prismaClient } from "../../database/prismaClient";
import type { IGetEmployeeByIdDTO } from "./../../repositories/dto/Employee/IGetEmployeeByIdDTO";

export class GetEmployeeByIdUseCase {
	async handle({ id }: IGetEmployeeByIdDTO) {
		const employeeData = await prismaClient.employee.findUnique({
			where: {
				id,
			},
			select: {
				user: {
					select: {
						name: true,
						email: true,
						birth: true,
						phone: true,
						cni: true,
						nif: true,
					},
				},
			},
		});

		if (!employeeData) {
			throw new Error("Employee ID not found");
		}

		const employee = {
			name: employeeData.user.name,
			email: employeeData.user.email,
			birth: employeeData.user.birth.toISOString().slice(0, 10),
			phone: employeeData.user.phone,
			CNI: employeeData.user.cni,
			NIF: employeeData.user.nif,
		};

		return employee;
	}
}
