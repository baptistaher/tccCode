import "reflect-metadata";
import bodyParser from "body-parser";
import express, {
	type NextFunction,
	type Request,
	type Response,
} from "express";
import { HttpError } from "./models/http-error";
import { router } from "./routes";
import { authRouter } from "./routes/auth";

const app = express();

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

// console.log(Config());

app.use("/auth", authRouter);

app.use("/api", router);

app.use((req: Request, res: Response, next: NextFunction) => {
	const error = new HttpError("Not found", 404);
	throw error;
});

export { app };
