// import "dotenv/config";
import { PrismaPg } from "@prisma/adapter-pg";
import { PrismaClient } from "@prisma/client";
import { Config } from "../config/config";

// const connectionString = `${process.env.DATABASE_URL}`;

const pgAdapter = new PrismaPg({
	connectionString: Config.prisma.DATABASE_URL,
});

const prisma = new PrismaClient({ adapter: pgAdapter });

export { prisma };
