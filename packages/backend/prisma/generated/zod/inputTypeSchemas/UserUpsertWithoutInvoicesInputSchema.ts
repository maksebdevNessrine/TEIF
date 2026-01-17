import type { Prisma } from '@prisma/client';

import { z } from 'zod';
import { UserUpdateWithoutInvoicesInputSchema } from './UserUpdateWithoutInvoicesInputSchema';
import { UserUncheckedUpdateWithoutInvoicesInputSchema } from './UserUncheckedUpdateWithoutInvoicesInputSchema';
import { UserCreateWithoutInvoicesInputSchema } from './UserCreateWithoutInvoicesInputSchema';
import { UserUncheckedCreateWithoutInvoicesInputSchema } from './UserUncheckedCreateWithoutInvoicesInputSchema';
import { UserWhereInputSchema } from './UserWhereInputSchema';

export const UserUpsertWithoutInvoicesInputSchema: z.ZodType<Prisma.UserUpsertWithoutInvoicesInput> = z.object({
  update: z.union([ z.lazy(() => UserUpdateWithoutInvoicesInputSchema), z.lazy(() => UserUncheckedUpdateWithoutInvoicesInputSchema) ]),
  create: z.union([ z.lazy(() => UserCreateWithoutInvoicesInputSchema), z.lazy(() => UserUncheckedCreateWithoutInvoicesInputSchema) ]),
  where: z.lazy(() => UserWhereInputSchema).optional(),
}).strict();

export default UserUpsertWithoutInvoicesInputSchema;
