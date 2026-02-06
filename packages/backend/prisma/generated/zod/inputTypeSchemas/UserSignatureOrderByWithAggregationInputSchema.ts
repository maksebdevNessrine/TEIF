import type { Prisma } from '@prisma/client';

import { z } from 'zod';
import { SortOrderSchema } from './SortOrderSchema';
import { SortOrderInputSchema } from './SortOrderInputSchema';
import { UserSignatureCountOrderByAggregateInputSchema } from './UserSignatureCountOrderByAggregateInputSchema';
import { UserSignatureMaxOrderByAggregateInputSchema } from './UserSignatureMaxOrderByAggregateInputSchema';
import { UserSignatureMinOrderByAggregateInputSchema } from './UserSignatureMinOrderByAggregateInputSchema';

export const UserSignatureOrderByWithAggregationInputSchema: z.ZodType<Prisma.UserSignatureOrderByWithAggregationInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  userId: z.lazy(() => SortOrderSchema).optional(),
  certificateFilename: z.lazy(() => SortOrderSchema).optional(),
  encryptedContent: z.lazy(() => SortOrderSchema).optional(),
  signaturePinHash: z.lazy(() => SortOrderSchema).optional(),
  certificateSubject: z.union([ z.lazy(() => SortOrderSchema), z.lazy(() => SortOrderInputSchema) ]).optional(),
  certificateIssuer: z.union([ z.lazy(() => SortOrderSchema), z.lazy(() => SortOrderInputSchema) ]).optional(),
  certificateSerialNumber: z.union([ z.lazy(() => SortOrderSchema), z.lazy(() => SortOrderInputSchema) ]).optional(),
  certificateValidFrom: z.union([ z.lazy(() => SortOrderSchema), z.lazy(() => SortOrderInputSchema) ]).optional(),
  certificateValidUntil: z.union([ z.lazy(() => SortOrderSchema), z.lazy(() => SortOrderInputSchema) ]).optional(),
  keyAlgorithm: z.union([ z.lazy(() => SortOrderSchema), z.lazy(() => SortOrderInputSchema) ]).optional(),
  status: z.lazy(() => SortOrderSchema).optional(),
  uploadedAt: z.lazy(() => SortOrderSchema).optional(),
  lastUsedAt: z.union([ z.lazy(() => SortOrderSchema), z.lazy(() => SortOrderInputSchema) ]).optional(),
  createdAt: z.lazy(() => SortOrderSchema).optional(),
  updatedAt: z.lazy(() => SortOrderSchema).optional(),
  _count: z.lazy(() => UserSignatureCountOrderByAggregateInputSchema).optional(),
  _max: z.lazy(() => UserSignatureMaxOrderByAggregateInputSchema).optional(),
  _min: z.lazy(() => UserSignatureMinOrderByAggregateInputSchema).optional(),
}).strict();

export default UserSignatureOrderByWithAggregationInputSchema;
