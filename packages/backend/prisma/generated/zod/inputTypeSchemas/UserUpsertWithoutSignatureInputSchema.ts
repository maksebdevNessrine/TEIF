import type { Prisma } from '@prisma/client';

import { z } from 'zod';
import { UserUpdateWithoutSignatureInputSchema } from './UserUpdateWithoutSignatureInputSchema';
import { UserUncheckedUpdateWithoutSignatureInputSchema } from './UserUncheckedUpdateWithoutSignatureInputSchema';
import { UserCreateWithoutSignatureInputSchema } from './UserCreateWithoutSignatureInputSchema';
import { UserUncheckedCreateWithoutSignatureInputSchema } from './UserUncheckedCreateWithoutSignatureInputSchema';
import { UserWhereInputSchema } from './UserWhereInputSchema';

export const UserUpsertWithoutSignatureInputSchema: z.ZodType<Prisma.UserUpsertWithoutSignatureInput> = z.object({
  update: z.union([ z.lazy(() => UserUpdateWithoutSignatureInputSchema), z.lazy(() => UserUncheckedUpdateWithoutSignatureInputSchema) ]),
  create: z.union([ z.lazy(() => UserCreateWithoutSignatureInputSchema), z.lazy(() => UserUncheckedCreateWithoutSignatureInputSchema) ]),
  where: z.lazy(() => UserWhereInputSchema).optional(),
}).strict();

export default UserUpsertWithoutSignatureInputSchema;
