import type { Prisma } from '@prisma/client';

import { z } from 'zod';
import { StringFieldUpdateOperationsInputSchema } from './StringFieldUpdateOperationsInputSchema';
import { BoolFieldUpdateOperationsInputSchema } from './BoolFieldUpdateOperationsInputSchema';
import { NullableStringFieldUpdateOperationsInputSchema } from './NullableStringFieldUpdateOperationsInputSchema';
import { NullableDateTimeFieldUpdateOperationsInputSchema } from './NullableDateTimeFieldUpdateOperationsInputSchema';
import { DateTimeFieldUpdateOperationsInputSchema } from './DateTimeFieldUpdateOperationsInputSchema';
import { RefreshTokenUncheckedUpdateManyWithoutUserNestedInputSchema } from './RefreshTokenUncheckedUpdateManyWithoutUserNestedInputSchema';
import { UserSignatureUncheckedUpdateOneWithoutUserNestedInputSchema } from './UserSignatureUncheckedUpdateOneWithoutUserNestedInputSchema';

export const UserUncheckedUpdateWithoutInvoicesInputSchema: z.ZodType<Prisma.UserUncheckedUpdateWithoutInvoicesInput> = z.object({
  id: z.union([ z.cuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  email: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  name: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  passwordHash: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  emailVerified: z.union([ z.boolean(),z.lazy(() => BoolFieldUpdateOperationsInputSchema) ]).optional(),
  verificationCode: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  verificationCodeExpires: z.union([ z.coerce.date(),z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  refreshTokens: z.lazy(() => RefreshTokenUncheckedUpdateManyWithoutUserNestedInputSchema).optional(),
  signature: z.lazy(() => UserSignatureUncheckedUpdateOneWithoutUserNestedInputSchema).optional(),
}).strict();

export default UserUncheckedUpdateWithoutInvoicesInputSchema;
