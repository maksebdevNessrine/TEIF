import type { Prisma } from '@prisma/client';

import { z } from 'zod';
import { UserCreateWithoutInvoicesInputSchema } from './UserCreateWithoutInvoicesInputSchema';
import { UserUncheckedCreateWithoutInvoicesInputSchema } from './UserUncheckedCreateWithoutInvoicesInputSchema';
import { UserCreateOrConnectWithoutInvoicesInputSchema } from './UserCreateOrConnectWithoutInvoicesInputSchema';
import { UserUpsertWithoutInvoicesInputSchema } from './UserUpsertWithoutInvoicesInputSchema';
import { UserWhereUniqueInputSchema } from './UserWhereUniqueInputSchema';
import { UserUpdateToOneWithWhereWithoutInvoicesInputSchema } from './UserUpdateToOneWithWhereWithoutInvoicesInputSchema';
import { UserUpdateWithoutInvoicesInputSchema } from './UserUpdateWithoutInvoicesInputSchema';
import { UserUncheckedUpdateWithoutInvoicesInputSchema } from './UserUncheckedUpdateWithoutInvoicesInputSchema';

export const UserUpdateOneRequiredWithoutInvoicesNestedInputSchema: z.ZodType<Prisma.UserUpdateOneRequiredWithoutInvoicesNestedInput> = z.object({
  create: z.union([ z.lazy(() => UserCreateWithoutInvoicesInputSchema), z.lazy(() => UserUncheckedCreateWithoutInvoicesInputSchema) ]).optional(),
  connectOrCreate: z.lazy(() => UserCreateOrConnectWithoutInvoicesInputSchema).optional(),
  upsert: z.lazy(() => UserUpsertWithoutInvoicesInputSchema).optional(),
  connect: z.lazy(() => UserWhereUniqueInputSchema).optional(),
  update: z.union([ z.lazy(() => UserUpdateToOneWithWhereWithoutInvoicesInputSchema), z.lazy(() => UserUpdateWithoutInvoicesInputSchema), z.lazy(() => UserUncheckedUpdateWithoutInvoicesInputSchema) ]).optional(),
}).strict();

export default UserUpdateOneRequiredWithoutInvoicesNestedInputSchema;
