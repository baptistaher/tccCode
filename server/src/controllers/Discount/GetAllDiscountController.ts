import { NextFunction, Request, Response } from "express";
import { prismaClient } from "../../database/prismaClient";
import { HttpError } from "../../models/http-error";
import { GetAllDiscountUseCase } from "../../useCases/Discount/GetAllDiscountUSeCase";

export class GetAllDiscountsController {
	async handle(
		request: Request,
		response: Response,
		next: NextFunction,
	): Promise<Response> {
		if (request.method !== "GET") {
			// const error = new HttpError('Method not allowed', 405)
			// return next(error)
			return response.status(405).json("Method not allowed");
		}

		const getAllDiscountUseCase = new GetAllDiscountUseCase();

		try {
			// not done
			const listDiscount = await getAllDiscountUseCase.handle();

			return response.status(200).json(listDiscount);
		} catch (e) {
			return response.status(500).json("couldn't gel all Discount");

			// const error = new HttpError(
			//   "couldn't get all Discount",
			//   500,
			// )
			// return next(error);
		}

		// try {

		//   const discounts = await prismaClient.discount.findMany({
		//     select: {
		//       id: true,
		//       name: true,
		//       value: true

		//     }
		//   })

		//   return response.status(200).json(discounts);

		// } catch (e) {
		//   const error = new HttpError("couldn't get all Discounts", 500);
		//   return error
		// }
	}
}
