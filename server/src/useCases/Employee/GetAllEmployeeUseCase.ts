import { prisma } from "../../database/prismaClient";

export class GetAllEmployeesUseCase {
	async handle() {
		const data = await prisma.employee.findMany({
			select: {
				id: true,
				status: true,
				user: {
					select: {
						name: true,
						email: true,
						phone: true,
					},
				},
			},
		});

		const employee = data.map((item) => {
			return {
				id: item.id,
				status: item.status,
				name: item.user.name,
				email: item.user.email,
				phone: item.user.phone,
			};
		});

		return employee;
	}
}
