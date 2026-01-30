import type { NextFunction, Request, Response } from "express";
import { validationResult } from "express-validator";
import { prisma } from "../../database/prismaClient";
import { HttpError } from "../../models/http-error";

export class CreatePaymentController {
	async handle(request: Request, response: Response, next: NextFunction) {
		// let existingClient;
		// let clientInfo
		// let existingTrainingPlan;
		// let existingDiscount;
		// let existingPersonalTrainer;

		if (request.method !== "POST") {
			const error = new HttpError("Method not allowed", 405);
			return next(error);
		}

		const errors = validationResult(request);
		if (!errors.isEmpty()) {
			return next(
				new HttpError("invalid inputs passed, please check you data.", 422),
			);
		}

		const { clientId, trainingPlanId, discountId, personalTrainerId } =
			request.body;

		// Client
		// try {
		const existingClient = await prisma.client.findUnique({
			where: {
				id: clientId,
			},
		});
		// } catch (e) {
		// const error = new HttpError("Couldn't find the Client", 500);

		// }
		if (!existingClient) {
			const error = new HttpError("Client doesn't exist", 404);
			return next(error);
		}

		// training plan
		// try {
		const existingTrainingPlan = await prisma.training_plan.findUnique({
			where: {
				id: trainingPlanId,
			},
			select: {
				value: true,
				name: true,
			},
		});
		// } catch (e) {
		//   const error = new HttpError("Couldn't find the Training Plan", 500);
		//   return next(error);
		// }

		if (!existingTrainingPlan) {
			const error = new HttpError("Training Plan doesn't exist", 404);
			return next(error);
		}

		// Discount

		// try {
		const existingDiscount = await prisma.discount.findUnique({
			where: {
				id: discountId,
			},
			select: {
				name: true,
				value: true,
			},
		});
		// } catch (e) {
		//   const error = new HttpError("Couldn't find Discount", 500);
		//   return next(error);
		// }

		if (!existingDiscount) {
			const error = new HttpError("Discount doesn't exist", 404);
			return next(error);
		}

		// PersonalTrainer

		// try {
		const existingPersonalTrainer = await prisma.personalTrainer.findUnique({
			where: {
				id: personalTrainerId,
			},
			select: {
				value: true,
				user: {
					select: {
						name: true,
					},
				},
			},
		});
		// } catch (e) {
		//   const error = new HttpError("Couldn't find PersonalTrainer.", 500);

		//   return next(error);
		// }

		if (!existingPersonalTrainer) {
			const error = new HttpError("Personal Trainer doesn't exist", 404);
			return next(error);
		}

		// let createPayment;

		// try {
		const createPayment = await prisma.payment.create({
			data: {
				client_id: existingClient.id,
				training_plan_name: existingTrainingPlan.name,
				training_plan_value: existingTrainingPlan.value,
				discount_name: existingDiscount.name,
				discount_value: existingDiscount.value,
				personal_trainer_name: existingPersonalTrainer.user.name,
				personal_trainer_value: existingPersonalTrainer.value,
			},
		});
		// } catch (e) {
		//   const error = new HttpError("Fail to add payment", 500);
		//   return next(error);
		// }

		return response.status(201).json(createPayment);
	}
}
