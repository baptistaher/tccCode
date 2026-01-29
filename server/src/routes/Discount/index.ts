import { Router } from "express";
import { CreateDiscountController } from "../../controllers/Discount/CreateDiscountController";
import { GetAllDiscountsController } from "../../controllers/Discount/GetAllDiscountController";
import { GetDiscountByIdController } from "./../../controllers/Discount/GetDiscountByIdController";

const discountRoutes = Router();

const createDiscount = new CreateDiscountController();
const getAllDiscount = new GetAllDiscountsController();
const getDiscountById = new GetDiscountByIdController();

discountRoutes.post("/", createDiscount.handle);
discountRoutes.get("/", getAllDiscount.handle);
discountRoutes.get("/:id", getDiscountById.handle);

export { discountRoutes };
