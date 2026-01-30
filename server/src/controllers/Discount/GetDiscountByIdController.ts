import type { Request, Response } from "express";
import { GetDiscountByIdUseCase } from "../../useCases/Discount/GetDiscountByIDUseCase";

export class GetDiscountByIdController {
	async handle(request: Request, response: Response): Promise<Response> {
		if (request.method !== "GET") {
			return response.status(405).json("Method not allowed");
		}

		const { id } = request.params;

		const getDiscountByIdUseCase = new GetDiscountByIdUseCase();

		try {
			const discountInfo = await getDiscountByIdUseCase.handle({
				id: Array.isArray(id) ? id[0] : id,
			});

			if (Object.keys(discountInfo).length === 0) {
				return response.status(500).json("Discount don't Exist");
			}

			return response.status(200).json(discountInfo);
		} catch (error) {
			console.error(error);
			return response.status(500).json("Fail to Find discount by id");
		}
	}
}
