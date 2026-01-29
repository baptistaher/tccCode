import "reflect-metadata";
import express, { Request, Response, NextFunction } from "express";

import { HttpError } from "./models/http-error";
import bodyParser from "body-parser";
// import { router } from '../../Routes'
// import { userRouter } from '../../Routes/user'
import { router } from "./routes";
import { authRouter } from "./routes/auth";

const app = express();

// app.disable('x-powered-by')
// app.use(express.urlencoded({extended:true}))

app.use(express.json());
app.use(bodyParser.json());

app.use((req, res, next) => {
	res.setHeader("Access-Control-Allow-Origin", "*");
	res.setHeader(
		"Access-Control-Allow-Headers",
		"Origin, X-Requested-With, Content-Type, Accept, Authorization",
	);
	res.setHeader("Access-Control-Allow-Methods", "GET, POST, PATCH, DELETE");

	next();
});

app.use("/auth", authRouter);

app.use("/api", router);

app.use((req: Request, res: Response, next: NextFunction) => {
	const error = new HttpError("Not found", 404);
	throw error;
});

export { app };
