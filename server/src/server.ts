import { app } from "./app";
import { Config } from "./config/config";
import logger from "./logger/logger";


app.listen(Config.api.API_PORT, () => {
  logger.logger.info(
    `server is running on port ${Config.api.API_PORT}`
  );
});