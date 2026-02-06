import { z } from 'zod';
import type { Prisma } from '@prisma/client';
import { SignatureAuditWhereUniqueInputSchema } from '../inputTypeSchemas/SignatureAuditWhereUniqueInputSchema'
import { SignatureAuditCreateInputSchema } from '../inputTypeSchemas/SignatureAuditCreateInputSchema'
import { SignatureAuditUncheckedCreateInputSchema } from '../inputTypeSchemas/SignatureAuditUncheckedCreateInputSchema'
import { SignatureAuditUpdateInputSchema } from '../inputTypeSchemas/SignatureAuditUpdateInputSchema'
import { SignatureAuditUncheckedUpdateInputSchema } from '../inputTypeSchemas/SignatureAuditUncheckedUpdateInputSchema'
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

export const SignatureAuditUpsertArgsSchema: z.ZodType<Prisma.SignatureAuditUpsertArgs> = z.object({
  select: SignatureAuditSelectSchema.optional(),
  where: SignatureAuditWhereUniqueInputSchema, 
  create: z.union([ SignatureAuditCreateInputSchema, SignatureAuditUncheckedCreateInputSchema ]),
  update: z.union([ SignatureAuditUpdateInputSchema, SignatureAuditUncheckedUpdateInputSchema ]),
}).strict();

export default SignatureAuditUpsertArgsSchema;
