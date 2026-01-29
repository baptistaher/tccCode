import { Roles } from "@prisma/client";
import { hash } from "bcryptjs";
import { prisma } from "../src/database/prismaClient";
import { clients } from "./dataTest/client";
import { discounts } from "./dataTest/discount";
import { employees } from "./dataTest/employee";
import { manager } from "./dataTest/manager";
import { personalTrainers } from "./dataTest/personalTrainer";
import { trainingPlans } from "./dataTest/trainingPlan";

// import random

// const prisma = new PrismaClient();

async function runSeed() {
	// Employee

	const hashedPassword = await hash("123456", 12);
	await Promise.all(
		employees.map(async (employee) => {
			await prisma.user.create({
				data: {
					name: employee.name,
					email: employee.email,
					phone: employee.phone,
					password: hashedPassword,
					role: Roles.EMPLOYEE,
					cni: employee.CNI,
					nif: employee.NIF,
					birth: employee.birth_date,
					employee: {
						create: {},
					},
				},
			});
		}),
	);

	// Discount
	await Promise.all(
		discounts.map(async (discount) => {
			await prisma.discount.create({
				data: {
					name: discount.name,
					description: discount.description,
					value: Number(discount.value),
				},
			});
		}),
	);

	// Training plan
	await Promise.all(
		trainingPlans.map(async (trainPlan) => {
			await prisma.training_plan.create({
				data: {
					name: trainPlan.name,
					description: trainPlan.description,
					value: Number(trainPlan.value),
				},
			});
		}),
	);

	// PersonalTrainer
	await Promise.all(
		personalTrainers.map(async (personalTrainer) => {
			await prisma.user.create({
				data: {
					name: personalTrainer.name,
					email: personalTrainer.email,
					password: hashedPassword,
					phone: personalTrainer.phone,
					role: Roles.PERSONALTRAINER,
					birth: personalTrainer.birth,
					cni: personalTrainer.CNI,
					nif: personalTrainer.NIF,
					personal_trainers: {
						create: {
							value: Number(personalTrainer.value),
						},
					},
				},
			});
		}),
	);

	// manager
	// await Promise
	await prisma.user.create({
		data: {
			name: manager.name,
			email: manager.email,
			phone: manager.phone,
			password: hashedPassword,
			birth: manager.birth,
			role: Roles.MANAGER,
			cni: manager.CNI,
			nif: manager.NIF,
			manager: {
				create: {},
			},
		},
	});

	const listTrainingPLans = await prisma.training_plan.findMany({
		select: {
			id: true,
		},
	});

	const listDiscounts = await prisma.discount.findMany({
		select: {
			id: true,
		},
	});

	const listPersonalTrainer = await prisma.personalTrainer.findMany({
		select: {
			id: true,
		},
	});

	await Promise.all(
		clients.map(async (client) => {
			await prisma.user.create({
				data: {
					name: client.name,
					email: client.email,
					phone: client.phone,
					password: client.password,
					role: Roles.CLIENT,
					birth: client.birth,
					client: {
						create: {
							cpt: {
								create: {
									personal_trainer_id:
										listPersonalTrainer[
											Math.floor(Math.random() * listPersonalTrainer.length)
										].id,
								},
							},
							ctp: {
								create: {
									training_plan_id:
										listTrainingPLans[
											Math.floor(Math.random() * listTrainingPLans.length)
										].id,
								},
							},
							cd: {
								create: {
									discount_id:
										listDiscounts[
											Math.floor(Math.random() * listDiscounts.length)
										].id,
								},
							},
						},
					},
				},
			});
		}),
	);
}

runSeed()
	.catch((e) => {
		console.error(`There was an error while seeding: ${e}`);
		process.exit(1);
	})
	.finally(async () => {
		console.log("Successfully seeded database.Closing connection.");
		await prisma.$disconnect();
	});
