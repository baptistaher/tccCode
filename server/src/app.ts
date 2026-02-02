import bodyParser from "body-parser";
import express from "express";
import "reflect-metadata";
import { router } from "./routes";
import { authRouter } from "./routes/auth";
import logger from "./logger/logger";

const app = express();
app.use(logger);





app.use(express.json());
app.use(bodyParser.json());

app.use((_, res, next) => {
	res.setHeader("Access-Control-Allow-Origin", "*");
	res.setHeader(
		"Access-Control-Allow-Headers",
		"Origin, X-Requested-With, Content-Type, Accept, Authorization",
	);
	res.setHeader("Access-Control-Allow-Methods", "GET, POST, PATCH, DELETE");

	next();
});

// console.log(Config());

app.use("/auth", authRouter);

app.use("/api", router);

// app.use((_: Request, _: Response, _: NextFunction) => {
//   const error = new HttpError("Not found", 404);
//   throw error;
// });



export { app };
