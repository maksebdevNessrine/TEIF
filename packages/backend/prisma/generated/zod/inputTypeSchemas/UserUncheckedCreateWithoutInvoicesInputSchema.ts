import type { Prisma } from '@prisma/client';

import { z } from 'zod';
import { RefreshTokenUncheckedCreateNestedManyWithoutUserInputSchema } from './RefreshTokenUncheckedCreateNestedManyWithoutUserInputSchema';
import { UserSignatureUncheckedCreateNestedOneWithoutUserInputSchema } from './UserSignatureUncheckedCreateNestedOneWithoutUserInputSchema';

export const UserUncheckedCreateWithoutInvoicesInputSchema: z.ZodType<Prisma.UserUncheckedCreateWithoutInvoicesInput> = z.object({
  id: z.cuid().optional(),
  email: z.string(),
  name: z.string(),
  passwordHash: z.string(),
  emailVerified: z.boolean().optional(),
  verificationCode: z.string().optional().nullable(),
  verificationCodeExpires: z.coerce.date().optional().nullable(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional(),
  refreshTokens: z.lazy(() => RefreshTokenUncheckedCreateNestedManyWithoutUserInputSchema).optional(),
  signature: z.lazy(() => UserSignatureUncheckedCreateNestedOneWithoutUserInputSchema).optional(),
}).strict();

export default UserUncheckedCreateWithoutInvoicesInputSchema;
