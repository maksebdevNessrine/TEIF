import { z } from 'zod';
import type { Prisma } from '@prisma/client';
import { SignatureAuditUpdateInputSchema } from '../inputTypeSchemas/SignatureAuditUpdateInputSchema'
import { SignatureAuditUncheckedUpdateInputSchema } from '../inputTypeSchemas/SignatureAuditUncheckedUpdateInputSchema'
import { SignatureAuditWhereUniqueInputSchema } from '../inputTypeSchemas/SignatureAuditWhereUniqueInputSchema'
// Select schema needs to be in file to prevent circular imports
//------------------------------------------------------

export const SignatureAuditSelectSchema: z.ZodType<Prisma.SignatureAuditSelect> = z.object({
  id: z.boolean().optional(),
  userId: z.boolean().optional(),
  action: z.boolean().optional(),
  invoiceId: z.boolean().optional(),
  documentNumber: z.boolean().optional(),
  status: z.boolean().optional(),
  errorMessage: z.boolean().optional(),
  certificateUsed: z.boolean().optional(),
  ipAddress: z.boolean().optional(),
  userAgent: z.boolean().optional(),
  createdAt: z.boolean().optional(),
}).strict()

export const SignatureAuditUpdateArgsSchema: z.ZodType<Prisma.SignatureAuditUpdateArgs> = z.object({
  select: SignatureAuditSelectSchema.optional(),
  data: z.union([ SignatureAuditUpdateInputSchema, SignatureAuditUncheckedUpdateInputSchema ]),
  where: SignatureAuditWhereUniqueInputSchema, 
}).strict();

export default SignatureAuditUpdateArgsSchema;
