import { z } from 'zod';
import type { Prisma } from '@prisma/client';
import { SignatureAuditUpdateManyMutationInputSchema } from '../inputTypeSchemas/SignatureAuditUpdateManyMutationInputSchema'
import { SignatureAuditUncheckedUpdateManyInputSchema } from '../inputTypeSchemas/SignatureAuditUncheckedUpdateManyInputSchema'
import { SignatureAuditWhereInputSchema } from '../inputTypeSchemas/SignatureAuditWhereInputSchema'

export const SignatureAuditUpdateManyArgsSchema: z.ZodType<Prisma.SignatureAuditUpdateManyArgs> = z.object({
  data: z.union([ SignatureAuditUpdateManyMutationInputSchema, SignatureAuditUncheckedUpdateManyInputSchema ]),
  where: SignatureAuditWhereInputSchema.optional(), 
}).strict();

export default SignatureAuditUpdateManyArgsSchema;
