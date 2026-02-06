import type { Prisma } from '@prisma/client';

import { z } from 'zod';
import { SortOrderSchema } from './SortOrderSchema';
import { SortOrderInputSchema } from './SortOrderInputSchema';
import { SignatureAuditCountOrderByAggregateInputSchema } from './SignatureAuditCountOrderByAggregateInputSchema';
import { SignatureAuditMaxOrderByAggregateInputSchema } from './SignatureAuditMaxOrderByAggregateInputSchema';
import { SignatureAuditMinOrderByAggregateInputSchema } from './SignatureAuditMinOrderByAggregateInputSchema';

export const SignatureAuditOrderByWithAggregationInputSchema: z.ZodType<Prisma.SignatureAuditOrderByWithAggregationInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  userId: z.lazy(() => SortOrderSchema).optional(),
  action: z.lazy(() => SortOrderSchema).optional(),
  invoiceId: z.union([ z.lazy(() => SortOrderSchema), z.lazy(() => SortOrderInputSchema) ]).optional(),
  documentNumber: z.union([ z.lazy(() => SortOrderSchema), z.lazy(() => SortOrderInputSchema) ]).optional(),
  status: z.lazy(() => SortOrderSchema).optional(),
  errorMessage: z.union([ z.lazy(() => SortOrderSchema), z.lazy(() => SortOrderInputSchema) ]).optional(),
  certificateUsed: z.union([ z.lazy(() => SortOrderSchema), z.lazy(() => SortOrderInputSchema) ]).optional(),
  ipAddress: z.union([ z.lazy(() => SortOrderSchema), z.lazy(() => SortOrderInputSchema) ]).optional(),
  userAgent: z.union([ z.lazy(() => SortOrderSchema), z.lazy(() => SortOrderInputSchema) ]).optional(),
  createdAt: z.lazy(() => SortOrderSchema).optional(),
  _count: z.lazy(() => SignatureAuditCountOrderByAggregateInputSchema).optional(),
  _max: z.lazy(() => SignatureAuditMaxOrderByAggregateInputSchema).optional(),
  _min: z.lazy(() => SignatureAuditMinOrderByAggregateInputSchema).optional(),
}).strict();

export default SignatureAuditOrderByWithAggregationInputSchema;
