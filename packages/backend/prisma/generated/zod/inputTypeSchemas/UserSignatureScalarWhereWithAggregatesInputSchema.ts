import type { Prisma } from '@prisma/client';

import { z } from 'zod';
import { StringWithAggregatesFilterSchema } from './StringWithAggregatesFilterSchema';
import { StringNullableWithAggregatesFilterSchema } from './StringNullableWithAggregatesFilterSchema';
import { DateTimeNullableWithAggregatesFilterSchema } from './DateTimeNullableWithAggregatesFilterSchema';
import { DateTimeWithAggregatesFilterSchema } from './DateTimeWithAggregatesFilterSchema';

export const UserSignatureScalarWhereWithAggregatesInputSchema: z.ZodType<Prisma.UserSignatureScalarWhereWithAggregatesInput> = z.object({
  AND: z.union([ z.lazy(() => UserSignatureScalarWhereWithAggregatesInputSchema), z.lazy(() => UserSignatureScalarWhereWithAggregatesInputSchema).array() ]).optional(),
  OR: z.lazy(() => UserSignatureScalarWhereWithAggregatesInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => UserSignatureScalarWhereWithAggregatesInputSchema), z.lazy(() => UserSignatureScalarWhereWithAggregatesInputSchema).array() ]).optional(),
  id: z.union([ z.lazy(() => StringWithAggregatesFilterSchema), z.string() ]).optional(),
  userId: z.union([ z.lazy(() => StringWithAggregatesFilterSchema), z.string() ]).optional(),
  certificateFilename: z.union([ z.lazy(() => StringWithAggregatesFilterSchema), z.string() ]).optional(),
  encryptedContent: z.union([ z.lazy(() => StringWithAggregatesFilterSchema), z.string() ]).optional(),
  signaturePinHash: z.union([ z.lazy(() => StringWithAggregatesFilterSchema), z.string() ]).optional(),
  certificateSubject: z.union([ z.lazy(() => StringNullableWithAggregatesFilterSchema), z.string() ]).optional().nullable(),
  certificateIssuer: z.union([ z.lazy(() => StringNullableWithAggregatesFilterSchema), z.string() ]).optional().nullable(),
  certificateSerialNumber: z.union([ z.lazy(() => StringNullableWithAggregatesFilterSchema), z.string() ]).optional().nullable(),
  certificateValidFrom: z.union([ z.lazy(() => DateTimeNullableWithAggregatesFilterSchema), z.coerce.date() ]).optional().nullable(),
  certificateValidUntil: z.union([ z.lazy(() => DateTimeNullableWithAggregatesFilterSchema), z.coerce.date() ]).optional().nullable(),
  keyAlgorithm: z.union([ z.lazy(() => StringNullableWithAggregatesFilterSchema), z.string() ]).optional().nullable(),
  status: z.union([ z.lazy(() => StringWithAggregatesFilterSchema), z.string() ]).optional(),
  uploadedAt: z.union([ z.lazy(() => DateTimeWithAggregatesFilterSchema), z.coerce.date() ]).optional(),
  lastUsedAt: z.union([ z.lazy(() => DateTimeNullableWithAggregatesFilterSchema), z.coerce.date() ]).optional().nullable(),
  createdAt: z.union([ z.lazy(() => DateTimeWithAggregatesFilterSchema), z.coerce.date() ]).optional(),
  updatedAt: z.union([ z.lazy(() => DateTimeWithAggregatesFilterSchema), z.coerce.date() ]).optional(),
}).strict();

export default UserSignatureScalarWhereWithAggregatesInputSchema;
