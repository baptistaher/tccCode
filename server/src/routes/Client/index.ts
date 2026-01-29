import { Router } from "express";
import { CreateClientController } from "../../controllers/Client/controllers/CreateClientController";
import { GetAllClientController } from "../../controllers/Client/controllers/GetAllClientController";
import { GetClientByIdController } from "../../controllers/Client/controllers/GetClientByIdController";

const clientRoutes = Router();

const createClient = new CreateClientController();
const getAllClients = new GetAllClientController();
const getClientById = new GetClientByIdController();

clientRoutes.post("/", createClient.handle);

clientRoutes.get("/", getAllClients.handle);
clientRoutes.get("/:id", getClientById.handle);

export { clientRoutes };
