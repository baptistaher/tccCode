import { Router } from "express";
import { CreateManagerController } from "../../controllers/Manager/CreateManagerController";

const managerRoutes = Router();

const createManager = new CreateManagerController();

managerRoutes.post("/", createManager.handle);

export { managerRoutes };
