import { PrismaClient, Roles } from "@prisma/client";
import { prismaClient } from "../src/database/prismaClient";
import { clients } from "./dataTest/client";

const prisma = new PrismaClient();

async function runSeed() {
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
	});
}

runSeed()
	.catch((e) => {
		console.log(`There was an error while seeding: ${e}`);
		process.exit(1);
	})
	.finally(async () => {
		console.log("Successfully seed2 database. Closing connection.");

		await prisma.$disconnect();
	});
