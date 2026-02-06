import { z } from 'zod';
import type { Prisma } from '@prisma/client';
import { UserArgsSchema } from "../outputTypeSchemas/UserArgsSchema"

export const UserSignatureSelectSchema: z.ZodType<Prisma.UserSignatureSelect> = z.object({
  id: z.boolean().optional(),
  userId: z.boolean().optional(),
  certificateFilename: z.boolean().optional(),
  encryptedContent: z.boolean().optional(),
  signaturePinHash: z.boolean().optional(),
  certificateSubject: z.boolean().optional(),
  certificateIssuer: z.boolean().optional(),
  certificateSerialNumber: z.boolean().optional(),
  certificateValidFrom: z.boolean().optional(),
  certificateValidUntil: z.boolean().optional(),
  keyAlgorithm: z.boolean().optional(),
  status: z.boolean().optional(),
  uploadedAt: z.boolean().optional(),
  lastUsedAt: z.boolean().optional(),
  createdAt: z.boolean().optional(),
  updatedAt: z.boolean().optional(),
  user: z.union([z.boolean(),z.lazy(() => UserArgsSchema)]).optional(),
}).strict()

export default UserSignatureSelectSchema;
