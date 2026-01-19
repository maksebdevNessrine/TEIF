import { PrismaClient, Prisma } from '@prisma/client';
export declare const prisma: PrismaClient<Prisma.PrismaClientOptions, never, import("@prisma/client/runtime/library").DefaultArgs>;
export declare function connectDatabase(): Promise<void>;
export declare function disconnectDatabase(): Promise<void>;
export { Prisma };
