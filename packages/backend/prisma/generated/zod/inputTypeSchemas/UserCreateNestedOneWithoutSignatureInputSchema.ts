import type { Prisma } from '@prisma/client';

import { z } from 'zod';
import { UserCreateWithoutSignatureInputSchema } from './UserCreateWithoutSignatureInputSchema';
import { UserUncheckedCreateWithoutSignatureInputSchema } from './UserUncheckedCreateWithoutSignatureInputSchema';
import { UserCreateOrConnectWithoutSignatureInputSchema } from './UserCreateOrConnectWithoutSignatureInputSchema';
import { UserWhereUniqueInputSchema } from './UserWhereUniqueInputSchema';

export const UserCreateNestedOneWithoutSignatureInputSchema: z.ZodType<Prisma.UserCreateNestedOneWithoutSignatureInput> = z.object({
  create: z.union([ z.lazy(() => UserCreateWithoutSignatureInputSchema), z.lazy(() => UserUncheckedCreateWithoutSignatureInputSchema) ]).optional(),
  connectOrCreate: z.lazy(() => UserCreateOrConnectWithoutSignatureInputSchema).optional(),
  connect: z.lazy(() => UserWhereUniqueInputSchema).optional(),
}).strict();

export default UserCreateNestedOneWithoutSignatureInputSchema;
