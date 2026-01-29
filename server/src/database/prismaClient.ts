import 'dotenv/config'
import { PrismaPg } from '@prisma/adapter-pg'
import { PrismaClient } from "@prisma/client";



const connectionString = `${process.env.DATABASE_URL}`


const pgAdapter = new PrismaPg({
  connectionString: connectionString})

const prisma = new PrismaClient({adapter: pgAdapter});

export { prisma };
