import type { Prisma } from '@prisma/client';

import { z } from 'zod';
import { UserWhereUniqueInputSchema } from './UserWhereUniqueInputSchema';
import { UserCreateWithoutSignatureInputSchema } from './UserCreateWithoutSignatureInputSchema';
import { UserUncheckedCreateWithoutSignatureInputSchema } from './UserUncheckedCreateWithoutSignatureInputSchema';

export const UserCreateOrConnectWithoutSignatureInputSchema: z.ZodType<Prisma.UserCreateOrConnectWithoutSignatureInput> = z.object({
  where: z.lazy(() => UserWhereUniqueInputSchema),
  create: z.union([ z.lazy(() => UserCreateWithoutSignatureInputSchema), z.lazy(() => UserUncheckedCreateWithoutSignatureInputSchema) ]),
}).strict();

export default UserCreateOrConnectWithoutSignatureInputSchema;
