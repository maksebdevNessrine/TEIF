import type { Prisma } from '@prisma/client';

import { z } from 'zod';
import { SortOrderSchema } from './SortOrderSchema';

export const UserSignatureMaxOrderByAggregateInputSchema: z.ZodType<Prisma.UserSignatureMaxOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  userId: z.lazy(() => SortOrderSchema).optional(),
  certificateFilename: z.lazy(() => SortOrderSchema).optional(),
  encryptedContent: z.lazy(() => SortOrderSchema).optional(),
  signaturePinHash: z.lazy(() => SortOrderSchema).optional(),
  certificateSubject: z.lazy(() => SortOrderSchema).optional(),
  certificateIssuer: z.lazy(() => SortOrderSchema).optional(),
  certificateSerialNumber: z.lazy(() => SortOrderSchema).optional(),
  certificateValidFrom: z.lazy(() => SortOrderSchema).optional(),
  certificateValidUntil: z.lazy(() => SortOrderSchema).optional(),
  keyAlgorithm: z.lazy(() => SortOrderSchema).optional(),
  status: z.lazy(() => SortOrderSchema).optional(),
  uploadedAt: z.lazy(() => SortOrderSchema).optional(),
  lastUsedAt: z.lazy(() => SortOrderSchema).optional(),
  createdAt: z.lazy(() => SortOrderSchema).optional(),
  updatedAt: z.lazy(() => SortOrderSchema).optional(),
}).strict();

export default UserSignatureMaxOrderByAggregateInputSchema;
