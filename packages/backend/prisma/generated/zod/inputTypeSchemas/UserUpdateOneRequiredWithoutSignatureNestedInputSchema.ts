import type { Prisma } from '@prisma/client';

import { z } from 'zod';
import { UserCreateWithoutSignatureInputSchema } from './UserCreateWithoutSignatureInputSchema';
import { UserUncheckedCreateWithoutSignatureInputSchema } from './UserUncheckedCreateWithoutSignatureInputSchema';
import { UserCreateOrConnectWithoutSignatureInputSchema } from './UserCreateOrConnectWithoutSignatureInputSchema';
import { UserUpsertWithoutSignatureInputSchema } from './UserUpsertWithoutSignatureInputSchema';
import { UserWhereUniqueInputSchema } from './UserWhereUniqueInputSchema';
import { UserUpdateToOneWithWhereWithoutSignatureInputSchema } from './UserUpdateToOneWithWhereWithoutSignatureInputSchema';
import { UserUpdateWithoutSignatureInputSchema } from './UserUpdateWithoutSignatureInputSchema';
import { UserUncheckedUpdateWithoutSignatureInputSchema } from './UserUncheckedUpdateWithoutSignatureInputSchema';

export const UserUpdateOneRequiredWithoutSignatureNestedInputSchema: z.ZodType<Prisma.UserUpdateOneRequiredWithoutSignatureNestedInput> = z.object({
  create: z.union([ z.lazy(() => UserCreateWithoutSignatureInputSchema), z.lazy(() => UserUncheckedCreateWithoutSignatureInputSchema) ]).optional(),
  connectOrCreate: z.lazy(() => UserCreateOrConnectWithoutSignatureInputSchema).optional(),
  upsert: z.lazy(() => UserUpsertWithoutSignatureInputSchema).optional(),
  connect: z.lazy(() => UserWhereUniqueInputSchema).optional(),
  update: z.union([ z.lazy(() => UserUpdateToOneWithWhereWithoutSignatureInputSchema), z.lazy(() => UserUpdateWithoutSignatureInputSchema), z.lazy(() => UserUncheckedUpdateWithoutSignatureInputSchema) ]).optional(),
}).strict();

export default UserUpdateOneRequiredWithoutSignatureNestedInputSchema;
