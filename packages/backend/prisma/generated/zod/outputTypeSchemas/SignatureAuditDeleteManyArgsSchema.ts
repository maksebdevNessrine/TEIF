import { z } from 'zod';
import type { Prisma } from '@prisma/client';
import { SignatureAuditWhereInputSchema } from '../inputTypeSchemas/SignatureAuditWhereInputSchema'

export const SignatureAuditDeleteManyArgsSchema: z.ZodType<Prisma.SignatureAuditDeleteManyArgs> = z.object({
  where: SignatureAuditWhereInputSchema.optional(), 
}).strict();

export default SignatureAuditDeleteManyArgsSchema;
