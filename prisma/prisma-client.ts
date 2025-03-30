/* eslint-disable no-var */
import { dbClient } from '@/src/shared/lib/db';


const prismaClientSingleton = () => {
  return dbClient
};

declare global {
  var prismaGlobal: undefined | ReturnType<typeof prismaClientSingleton>;
}

export const prisma = globalThis.prismaGlobal ?? prismaClientSingleton();

if (process.env.NODE_ENV !== 'production') globalThis.prismaGlobal = prisma;