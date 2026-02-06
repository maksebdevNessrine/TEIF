import type { Prisma } from '@prisma/client';

import { z } from 'zod';
import { SignatureAuditWhereInputSchema } from './SignatureAuditWhereInputSchema';
import { StringFilterSchema } from './StringFilterSchema';
import { StringNullableFilterSchema } from './StringNullableFilterSchema';
import { DateTimeFilterSchema } from './DateTimeFilterSchema';

export const SignatureAuditWhereUniqueInputSchema: z.ZodType<Prisma.SignatureAuditWhereUniqueInput> = z.object({
  id: z.cuid(),
})
.and(z.object({
  id: z.cuid().optional(),
  AND: z.union([ z.lazy(() => SignatureAuditWhereInputSchema), z.lazy(() => SignatureAuditWhereInputSchema).array() ]).optional(),
  OR: z.lazy(() => SignatureAuditWhereInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => SignatureAuditWhereInputSchema), z.lazy(() => SignatureAuditWhereInputSchema).array() ]).optional(),
  userId: z.union([ z.lazy(() => StringFilterSchema), z.string() ]).optional(),
  action: z.union([ z.lazy(() => StringFilterSchema), z.string() ]).optional(),
  invoiceId: z.union([ z.lazy(() => StringNullableFilterSchema), z.string() ]).optional().nullable(),
  documentNumber: z.union([ z.lazy(() => StringNullableFilterSchema), z.string() ]).optional().nullable(),
  status: z.union([ z.lazy(() => StringFilterSchema), z.string() ]).optional(),
  errorMessage: z.union([ z.lazy(() => StringNullableFilterSchema), z.string() ]).optional().nullable(),
  certificateUsed: z.union([ z.lazy(() => StringNullableFilterSchema), z.string() ]).optional().nullable(),
  ipAddress: z.union([ z.lazy(() => StringNullableFilterSchema), z.string() ]).optional().nullable(),
  userAgent: z.union([ z.lazy(() => StringNullableFilterSchema), z.string() ]).optional().nullable(),
  createdAt: z.union([ z.lazy(() => DateTimeFilterSchema), z.coerce.date() ]).optional(),
}).strict());

export default SignatureAuditWhereUniqueInputSchema;
