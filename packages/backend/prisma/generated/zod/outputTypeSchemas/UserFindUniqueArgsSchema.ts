import { z } from 'zod';
import type { Prisma } from '@prisma/client';
import { UserIncludeSchema } from '../inputTypeSchemas/UserIncludeSchema'
import { UserWhereUniqueInputSchema } from '../inputTypeSchemas/UserWhereUniqueInputSchema'
import { InvoiceFindManyArgsSchema } from "../outputTypeSchemas/InvoiceFindManyArgsSchema"
import { RefreshTokenFindManyArgsSchema } from "../outputTypeSchemas/RefreshTokenFindManyArgsSchema"
import { UserSignatureArgsSchema } from "../outputTypeSchemas/UserSignatureArgsSchema"
import { UserCountOutputTypeArgsSchema } from "../outputTypeSchemas/UserCountOutputTypeArgsSchema"
// Select schema needs to be in file to prevent circular imports
//------------------------------------------------------

export const UserSelectSchema: z.ZodType<Prisma.UserSelect> = z.object({
  id: z.boolean().optional(),
  email: z.boolean().optional(),
  name: z.boolean().optional(),
  passwordHash: z.boolean().optional(),
  emailVerified: z.boolean().optional(),
  verificationCode: z.boolean().optional(),
  verificationCodeExpires: z.boolean().optional(),
  createdAt: z.boolean().optional(),
  updatedAt: z.boolean().optional(),
  invoices: z.union([z.boolean(),z.lazy(() => InvoiceFindManyArgsSchema)]).optional(),
  refreshTokens: z.union([z.boolean(),z.lazy(() => RefreshTokenFindManyArgsSchema)]).optional(),
  signature: z.union([z.boolean(),z.lazy(() => UserSignatureArgsSchema)]).optional(),
  _count: z.union([z.boolean(),z.lazy(() => UserCountOutputTypeArgsSchema)]).optional(),
}).strict()

export const UserFindUniqueArgsSchema: z.ZodType<Prisma.UserFindUniqueArgs> = z.object({
  select: UserSelectSchema.optional(),
  include: z.lazy(() => UserIncludeSchema).optional(),
  where: UserWhereUniqueInputSchema, 
}).strict();

export default UserFindUniqueArgsSchema;
