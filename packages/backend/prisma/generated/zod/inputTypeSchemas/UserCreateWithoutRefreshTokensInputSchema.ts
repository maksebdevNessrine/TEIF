import type { Prisma } from '@prisma/client';

import { z } from 'zod';
import { InvoiceCreateNestedManyWithoutUserInputSchema } from './InvoiceCreateNestedManyWithoutUserInputSchema';
import { UserSignatureCreateNestedOneWithoutUserInputSchema } from './UserSignatureCreateNestedOneWithoutUserInputSchema';

export const UserCreateWithoutRefreshTokensInputSchema: z.ZodType<Prisma.UserCreateWithoutRefreshTokensInput> = z.object({
  id: z.cuid().optional(),
  email: z.string(),
  name: z.string(),
  passwordHash: z.string(),
  emailVerified: z.boolean().optional(),
  verificationCode: z.string().optional().nullable(),
  verificationCodeExpires: z.coerce.date().optional().nullable(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional(),
  invoices: z.lazy(() => InvoiceCreateNestedManyWithoutUserInputSchema).optional(),
  signature: z.lazy(() => UserSignatureCreateNestedOneWithoutUserInputSchema).optional(),
}).strict();

export default UserCreateWithoutRefreshTokensInputSchema;
