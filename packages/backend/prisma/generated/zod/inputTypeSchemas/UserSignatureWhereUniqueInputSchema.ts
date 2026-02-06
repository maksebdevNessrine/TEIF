import type { Prisma } from '@prisma/client';

import { z } from 'zod';
import { UserSignatureWhereInputSchema } from './UserSignatureWhereInputSchema';
import { StringFilterSchema } from './StringFilterSchema';
import { StringNullableFilterSchema } from './StringNullableFilterSchema';
import { DateTimeNullableFilterSchema } from './DateTimeNullableFilterSchema';
import { DateTimeFilterSchema } from './DateTimeFilterSchema';
import { UserRelationFilterSchema } from './UserRelationFilterSchema';
import { UserWhereInputSchema } from './UserWhereInputSchema';

export const UserSignatureWhereUniqueInputSchema: z.ZodType<Prisma.UserSignatureWhereUniqueInput> = z.union([
  z.object({
    id: z.cuid(),
    userId: z.string(),
  }),
  z.object({
    id: z.cuid(),
  }),
  z.object({
    userId: z.string(),
  }),
])
.and(z.object({
  id: z.cuid().optional(),
  userId: z.string().optional(),
  AND: z.union([ z.lazy(() => UserSignatureWhereInputSchema), z.lazy(() => UserSignatureWhereInputSchema).array() ]).optional(),
  OR: z.lazy(() => UserSignatureWhereInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => UserSignatureWhereInputSchema), z.lazy(() => UserSignatureWhereInputSchema).array() ]).optional(),
  certificateFilename: z.union([ z.lazy(() => StringFilterSchema), z.string() ]).optional(),
  encryptedContent: z.union([ z.lazy(() => StringFilterSchema), z.string() ]).optional(),
  signaturePinHash: z.union([ z.lazy(() => StringFilterSchema), z.string() ]).optional(),
  certificateSubject: z.union([ z.lazy(() => StringNullableFilterSchema), z.string() ]).optional().nullable(),
  certificateIssuer: z.union([ z.lazy(() => StringNullableFilterSchema), z.string() ]).optional().nullable(),
  certificateSerialNumber: z.union([ z.lazy(() => StringNullableFilterSchema), z.string() ]).optional().nullable(),
  certificateValidFrom: z.union([ z.lazy(() => DateTimeNullableFilterSchema), z.coerce.date() ]).optional().nullable(),
  certificateValidUntil: z.union([ z.lazy(() => DateTimeNullableFilterSchema), z.coerce.date() ]).optional().nullable(),
  keyAlgorithm: z.union([ z.lazy(() => StringNullableFilterSchema), z.string() ]).optional().nullable(),
  status: z.union([ z.lazy(() => StringFilterSchema), z.string() ]).optional(),
  uploadedAt: z.union([ z.lazy(() => DateTimeFilterSchema), z.coerce.date() ]).optional(),
  lastUsedAt: z.union([ z.lazy(() => DateTimeNullableFilterSchema), z.coerce.date() ]).optional().nullable(),
  createdAt: z.union([ z.lazy(() => DateTimeFilterSchema), z.coerce.date() ]).optional(),
  updatedAt: z.union([ z.lazy(() => DateTimeFilterSchema), z.coerce.date() ]).optional(),
  user: z.union([ z.lazy(() => UserRelationFilterSchema), z.lazy(() => UserWhereInputSchema) ]).optional(),
}).strict());

export default UserSignatureWhereUniqueInputSchema;
