import { Router } from "express";
// import { check } from 'express-validator'
import { clientRoutes } from "./Client";
import { discountRoutes } from "./Discount";
import { employeeRoutes } from "./Employee";
import { managerRoutes } from "./manager";
import { paymentRoutes } from "./Payment";
import { personalTrainerRoutes } from "./PersonalTrainer";
import { trainingPlanRoutes } from "./TrainingPlan";
import { userRouter } from "./user";

const router = Router();

router.use("/client", clientRoutes);
router.use("/discount", discountRoutes);
router.use("/employee", employeeRoutes);
router.use("/payment", paymentRoutes);
router.use("/personalTrainer", personalTrainerRoutes);
router.use("/trainingPlan", trainingPlanRoutes);
router.use("/user", userRouter);
router.use("/manager", managerRoutes);

// /
// router.post(
//   '/employee/add',
//   [
//     check('name').not().isEmpty(),
//     check('email').not().isEmpty().isEmail(),
//     check('phone').not().isEmpty(),
//     check('CNI').not().isEmpty(),
//     check('NIF').not().isEmpty(),
//   ],
//   createEmployee.handle,
// )

export { router };
