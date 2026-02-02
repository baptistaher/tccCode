import pino from 'pino';
import pinoHttp from 'pino-http';

const baseLogger = pino({
  level: process.env.LOG_LEVEL || 'info',
});

const logger = pinoHttp({
  logger: baseLogger,
});

export default logger;