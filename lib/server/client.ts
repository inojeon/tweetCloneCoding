import { PrismaClient } from "@prisma/client";

declare global {
  var client: PrismaClient | undefined;
}

const clinet = global.client || new PrismaClient();

if (process.env.NODE_ENV === "development") global.client = clinet;

export default clinet;
