import type { Prisma } from '@prisma/client';

import { z } from 'zod';
import { UserCreateWithoutInvoicesInputSchema } from './UserCreateWithoutInvoicesInputSchema';
import { UserUncheckedCreateWithoutInvoicesInputSchema } from './UserUncheckedCreateWithoutInvoicesInputSchema';
import { UserCreateOrConnectWithoutInvoicesInputSchema } from './UserCreateOrConnectWithoutInvoicesInputSchema';
import { UserWhereUniqueInputSchema } from './UserWhereUniqueInputSchema';

export const UserCreateNestedOneWithoutInvoicesInputSchema: z.ZodType<Prisma.UserCreateNestedOneWithoutInvoicesInput> = z.object({
  create: z.union([ z.lazy(() => UserCreateWithoutInvoicesInputSchema), z.lazy(() => UserUncheckedCreateWithoutInvoicesInputSchema) ]).optional(),
  connectOrCreate: z.lazy(() => UserCreateOrConnectWithoutInvoicesInputSchema).optional(),
  connect: z.lazy(() => UserWhereUniqueInputSchema).optional(),
}).strict();

export default UserCreateNestedOneWithoutInvoicesInputSchema;
