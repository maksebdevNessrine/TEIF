import { z } from 'zod';
import type { Prisma } from '@prisma/client';
import { UserSignatureIncludeSchema } from '../inputTypeSchemas/UserSignatureIncludeSchema'
import { UserSignatureWhereInputSchema } from '../inputTypeSchemas/UserSignatureWhereInputSchema'
import { UserSignatureOrderByWithRelationInputSchema } from '../inputTypeSchemas/UserSignatureOrderByWithRelationInputSchema'
import { UserSignatureWhereUniqueInputSchema } from '../inputTypeSchemas/UserSignatureWhereUniqueInputSchema'
import { UserSignatureScalarFieldEnumSchema } from '../inputTypeSchemas/UserSignatureScalarFieldEnumSchema'
import { UserArgsSchema } from "../outputTypeSchemas/UserArgsSchema"
// Select schema needs to be in file to prevent circular imports
//------------------------------------------------------

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

export const UserSignatureFindFirstOrThrowArgsSchema: z.ZodType<Prisma.UserSignatureFindFirstOrThrowArgs> = z.object({
  select: UserSignatureSelectSchema.optional(),
  include: z.lazy(() => UserSignatureIncludeSchema).optional(),
  where: UserSignatureWhereInputSchema.optional(), 
  orderBy: z.union([ UserSignatureOrderByWithRelationInputSchema.array(), UserSignatureOrderByWithRelationInputSchema ]).optional(),
  cursor: UserSignatureWhereUniqueInputSchema.optional(), 
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: z.union([ UserSignatureScalarFieldEnumSchema, UserSignatureScalarFieldEnumSchema.array() ]).optional(),
}).strict();

export default UserSignatureFindFirstOrThrowArgsSchema;
