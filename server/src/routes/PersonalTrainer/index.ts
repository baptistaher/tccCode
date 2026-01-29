import { Router } from "express";
import { CreatePersonalTrainerController } from "../../controllers/PersonalTrainer/CreatePersonalTrainerController";
import { GetAllPersonalTrainersController } from "../../controllers/PersonalTrainer/GetAllPersonalTrainerController";
import { GetPersonalTrainerByIdController } from "../../controllers/PersonalTrainer/GetPersonalTrainerByIdController";

const personalTrainerRoutes = Router();

const createPersonalTrainer = new CreatePersonalTrainerController();
const getAllPersonalTrainers = new GetAllPersonalTrainersController();
const getPersonalTrainerById = new GetPersonalTrainerByIdController();

personalTrainerRoutes.post("/", createPersonalTrainer.handle);
personalTrainerRoutes.get("/", getAllPersonalTrainers.handle);
personalTrainerRoutes.get("/:id", getPersonalTrainerById.handle);

export { personalTrainerRoutes };
