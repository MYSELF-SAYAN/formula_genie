import { PrismaClient } from "../generated/prisma/client";
import { PrismaPg } from "@prisma/adapter-pg";
import { Pool } from "pg";
import "dotenv/config";

const connectionString = process.env.DATABASE_URL;

if (!connectionString) {
    throw new Error("DATABASE_URL is not defined");
}

const pool = new Pool({ connectionString });
const adapter = new PrismaPg(pool);

declare global {
    var prisma: PrismaClient | undefined;
}

const prisma = globalThis.prisma ?? new PrismaClient({
    adapter,
    log: ["query", "info", "warn", "error"],
});

if (process.env.NODE_ENV !== "production") globalThis.prisma = prisma;

export default prisma;
