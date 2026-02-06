import type { Prisma } from '@prisma/client';

import { z } from 'zod';

export const UserSignatureCreateManyInputSchema: z.ZodType<Prisma.UserSignatureCreateManyInput> = z.object({
  id: z.cuid().optional(),
  userId: z.string(),
  certificateFilename: z.string(),
  encryptedContent: z.string(),
  signaturePinHash: z.string(),
  certificateSubject: z.string().optional().nullable(),
  certificateIssuer: z.string().optional().nullable(),
  certificateSerialNumber: z.string().optional().nullable(),
  certificateValidFrom: z.coerce.date().optional().nullable(),
  certificateValidUntil: z.coerce.date().optional().nullable(),
  keyAlgorithm: z.string().optional().nullable(),
  status: z.string().optional(),
  uploadedAt: z.coerce.date().optional(),
  lastUsedAt: z.coerce.date().optional().nullable(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional(),
}).strict();

export default UserSignatureCreateManyInputSchema;
