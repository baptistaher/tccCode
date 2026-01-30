import { join } from "node:path";
import dotenv from "dotenv";

import { object, string } from "zod";

const nodeEnv = process.env.NODE_ENV;

dotenv.config({
	path: join(process.cwd(), "envs", `.env.${nodeEnv}`),
});

dotenv.config({
	path: join(process.cwd(), "envs", ".env"),
});

const CONFIG_API_SCHEMA = object({
	API_PORT: string().nonempty("API Port is required"),
});

const CONFIG_PRISMA_SCHEMA = object({
	DATABASE_URL: string().nonempty("Database URL is required"),
});

export const Config = {
	prisma: CONFIG_PRISMA_SCHEMA.parse({
		DATABASE_URL: process.env.DATABASE_URL,
	}),
	api: CONFIG_API_SCHEMA.parse({
		API_PORT: process.env.API_PORT,
	}),
};
