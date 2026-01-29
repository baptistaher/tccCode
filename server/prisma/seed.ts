import { employees } from "./dataTest/employee";
import { PrismaClient, Roles } from "@prisma/client";
import { prismaClient } from "../src/database/prismaClient";
import { discounts } from "./dataTest/discount";
import { trainingPlans } from "./dataTest/trainingPlan";
import { personalTrainers } from "./dataTest/personalTrainer";
import { manager } from "./dataTest/manager";
import { clients } from "./dataTest/client";
import { hash } from "bcryptjs";
// import random

const prisma = new PrismaClient();

async function runSeed() {
	// Employee

	const hashedPassword = await hash("123456", 12);
	await Promise.all(
		employees.map(async (employee) => {
			await prismaClient.user.create({
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
			await prismaClient.discount.create({
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
			await prismaClient.training_plan.create({
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
			await prismaClient.user.create({
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
	await prismaClient.user.create({
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

	const listTrainingPLans = await prismaClient.training_plan.findMany({
		select: {
			id: true,
		},
	});

	const listDiscounts = await prismaClient.discount.findMany({
		select: {
			id: true,
		},
	});

	const listPersonalTrainer = await prismaClient.personalTrainer.findMany({
		select: {
			id: true,
		},
	});

	await Promise.all(
		clients.map(async (client) => {
			await prismaClient.user.create({
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
