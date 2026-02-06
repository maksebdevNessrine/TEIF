import { z } from 'zod';
import type { Prisma } from '@prisma/client';
import { SignatureAuditCreateManyInputSchema } from '../inputTypeSchemas/SignatureAuditCreateManyInputSchema'

export const SignatureAuditCreateManyAndReturnArgsSchema: z.ZodType<Prisma.SignatureAuditCreateManyAndReturnArgs> = z.object({
  data: z.union([ SignatureAuditCreateManyInputSchema, SignatureAuditCreateManyInputSchema.array() ]),
  skipDuplicates: z.boolean().optional(),
}).strict();

export default SignatureAuditCreateManyAndReturnArgsSchema;
