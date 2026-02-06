import type { Prisma } from '@prisma/client';

import { z } from 'zod';
import { RefreshTokenCreateNestedManyWithoutUserInputSchema } from './RefreshTokenCreateNestedManyWithoutUserInputSchema';
import { UserSignatureCreateNestedOneWithoutUserInputSchema } from './UserSignatureCreateNestedOneWithoutUserInputSchema';

export const UserCreateWithoutInvoicesInputSchema: z.ZodType<Prisma.UserCreateWithoutInvoicesInput> = z.object({
  id: z.cuid().optional(),
  email: z.string(),
  name: z.string(),
  passwordHash: z.string(),
  emailVerified: z.boolean().optional(),
  verificationCode: z.string().optional().nullable(),
  verificationCodeExpires: z.coerce.date().optional().nullable(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional(),
  refreshTokens: z.lazy(() => RefreshTokenCreateNestedManyWithoutUserInputSchema).optional(),
  signature: z.lazy(() => UserSignatureCreateNestedOneWithoutUserInputSchema).optional(),
}).strict();

export default UserCreateWithoutInvoicesInputSchema;
