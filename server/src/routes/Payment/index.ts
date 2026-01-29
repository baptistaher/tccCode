import { Router } from "express";
import { CreatePaymentController } from "../../controllers/payment/CreatePaymentController";
import { GetPaymentByIdController } from "../../controllers/payment/GetPaymentByIdController";

const paymentRoutes = Router();

const createPayment = new CreatePaymentController();
const getPaymentById = new GetPaymentByIdController();

paymentRoutes.post("/", createPayment.handle);
paymentRoutes.get("/:id", getPaymentById.handle);

export { paymentRoutes };
