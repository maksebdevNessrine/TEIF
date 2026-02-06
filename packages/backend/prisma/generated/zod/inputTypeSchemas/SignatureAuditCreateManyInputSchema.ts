import type { Prisma } from '@prisma/client';

import { z } from 'zod';

export const SignatureAuditCreateManyInputSchema: z.ZodType<Prisma.SignatureAuditCreateManyInput> = z.object({
  id: z.cuid().optional(),
  userId: z.string(),
  action: z.string(),
  invoiceId: z.string().optional().nullable(),
  documentNumber: z.string().optional().nullable(),
  status: z.string(),
  errorMessage: z.string().optional().nullable(),
  certificateUsed: z.string().optional().nullable(),
  ipAddress: z.string().optional().nullable(),
  userAgent: z.string().optional().nullable(),
  createdAt: z.coerce.date().optional(),
}).strict();

export default SignatureAuditCreateManyInputSchema;
