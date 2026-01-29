import { Router } from "express";
import { CreateTrainingPlanController } from "../../controllers/trainingPlan/CreateTrainingPlan";
import { GetAllTrainingPlansController } from "../../controllers/trainingPlan/GetAllTrainingPlan";
import { GetTrainingPlanByIdController } from "../../controllers/trainingPlan/GetTrainingPlanByIdController";

const trainingPlanRoutes = Router();

const createTraining = new CreateTrainingPlanController();
const getAllTrainingPlans = new GetAllTrainingPlansController();
const getTrainingPlanById = new GetTrainingPlanByIdController();

trainingPlanRoutes.post("/", createTraining.handle);
trainingPlanRoutes.get("/", getAllTrainingPlans.handle);
trainingPlanRoutes.get("/:id", getTrainingPlanById.handle);

export { trainingPlanRoutes };
