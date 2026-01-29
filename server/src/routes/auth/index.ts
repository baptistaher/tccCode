import { RefreshTokenUserController } from "./../../controllers/token/RefreshTokenUserController";
import express from "express";
import { LoginController } from "../../controllers/User/LoginController";

const authRouter = express.Router();

const login = new LoginController();

const refreshToken = new RefreshTokenUserController();

// const getUserByIdInfo = new GetUserByIdController()

authRouter.post("/login", login.handle);

authRouter.post("/refreshToken", refreshToken.handle);

// userRouter.post('/:id',getUserByIdInfo.handle)

export { authRouter };
