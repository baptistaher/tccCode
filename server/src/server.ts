import { app } from "./app";
import { Config } from "./config/config";

app.listen(Config.api.API_PORT, () =>
	console.log(`server is running on port ${Config.api.API_PORT}`),
);
