import type { Prisma } from '@prisma/client';

import { z } from 'zod';
import { UserWhereUniqueInputSchema } from './UserWhereUniqueInputSchema';
import { UserCreateWithoutInvoicesInputSchema } from './UserCreateWithoutInvoicesInputSchema';
import { UserUncheckedCreateWithoutInvoicesInputSchema } from './UserUncheckedCreateWithoutInvoicesInputSchema';

export const UserCreateOrConnectWithoutInvoicesInputSchema: z.ZodType<Prisma.UserCreateOrConnectWithoutInvoicesInput> = z.object({
  where: z.lazy(() => UserWhereUniqueInputSchema),
  create: z.union([ z.lazy(() => UserCreateWithoutInvoicesInputSchema), z.lazy(() => UserUncheckedCreateWithoutInvoicesInputSchema) ]),
}).strict();

export default UserCreateOrConnectWithoutInvoicesInputSchema;
