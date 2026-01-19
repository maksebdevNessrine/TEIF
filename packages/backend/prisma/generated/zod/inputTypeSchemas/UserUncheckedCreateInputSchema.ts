import type { Prisma } from '@prisma/client';

import { z } from 'zod';
import { InvoiceUncheckedCreateNestedManyWithoutUserInputSchema } from './InvoiceUncheckedCreateNestedManyWithoutUserInputSchema';
import { RefreshTokenUncheckedCreateNestedManyWithoutUserInputSchema } from './RefreshTokenUncheckedCreateNestedManyWithoutUserInputSchema';

export const UserUncheckedCreateInputSchema: z.ZodType<Prisma.UserUncheckedCreateInput> = z.object({
  id: z.string().cuid().optional(),
  email: z.string(),
  name: z.string(),
  passwordHash: z.string(),
  emailVerified: z.boolean().optional(),
  verificationCode: z.string().optional().nullable(),
  verificationCodeExpires: z.coerce.date().optional().nullable(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional(),
  invoices: z.lazy(() => InvoiceUncheckedCreateNestedManyWithoutUserInputSchema).optional(),
  refreshTokens: z.lazy(() => RefreshTokenUncheckedCreateNestedManyWithoutUserInputSchema).optional(),
}).strict();

export default UserUncheckedCreateInputSchema;
