import { Response, Request } from "express";
import { GetPaymentByIdUseCase } from "../../useCases/Payment/GetPaymentByIdUseCase";

export class GetPaymentByIdController {
	async handle(request: Request, response: Response) {
		if (request.method !== "GET") {
			return response.status(405).json({ Error: "Method not allowed" });
		}

		const { id } = request.params;

		const getPaymentByIdUseCase = new GetPaymentByIdUseCase();
		try {
			const selectPayment = await getPaymentByIdUseCase.handle({ userId: id });

			return response.status(201).json(selectPayment);
		} catch (e) {
			return response.status(500).json({ Error: "FAil to get Payment" });
		}
	}
}
