import { PrismaClient, Prisma } from "@prisma/client";

// export { Role } from "@prisma/client";

const prisma = new PrismaClient();

export { prisma, Prisma };

