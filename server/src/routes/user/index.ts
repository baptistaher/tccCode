import express from "express";
import { GetUserByIdController } from "../../controllers/User/GetUserbyIdController";

const userRouter = express.Router();

const getUserById = new GetUserByIdController();

// const login = new LoginController()

// const refreshToken = new RefreshTokenUserController()

// const getUserByIdInfo = new GetUserByIdController()

// userRouter.post('/login', login.handle)

// userRouter.post('/refreshToken',refreshToken.handle)

// userRouter.post('/:id',getUserByIdInfo.handle)

userRouter.get("/:id", getUserById.handle);

export { userRouter };
