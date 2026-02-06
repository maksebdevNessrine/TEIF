import { z } from 'zod';
import type { Prisma } from '@prisma/client';
import { SignatureAuditCreateInputSchema } from '../inputTypeSchemas/SignatureAuditCreateInputSchema'
import { SignatureAuditUncheckedCreateInputSchema } from '../inputTypeSchemas/SignatureAuditUncheckedCreateInputSchema'
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

export const SignatureAuditCreateArgsSchema: z.ZodType<Prisma.SignatureAuditCreateArgs> = z.object({
  select: SignatureAuditSelectSchema.optional(),
  data: z.union([ SignatureAuditCreateInputSchema, SignatureAuditUncheckedCreateInputSchema ]),
}).strict();

export default SignatureAuditCreateArgsSchema;
