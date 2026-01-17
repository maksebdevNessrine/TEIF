import type { Prisma } from '@prisma/client';

import { z } from 'zod';
import { UserWhereInputSchema } from './UserWhereInputSchema';
import { UserUpdateWithoutInvoicesInputSchema } from './UserUpdateWithoutInvoicesInputSchema';
import { UserUncheckedUpdateWithoutInvoicesInputSchema } from './UserUncheckedUpdateWithoutInvoicesInputSchema';

export const UserUpdateToOneWithWhereWithoutInvoicesInputSchema: z.ZodType<Prisma.UserUpdateToOneWithWhereWithoutInvoicesInput> = z.object({
  where: z.lazy(() => UserWhereInputSchema).optional(),
  data: z.union([ z.lazy(() => UserUpdateWithoutInvoicesInputSchema), z.lazy(() => UserUncheckedUpdateWithoutInvoicesInputSchema) ]),
}).strict();

export default UserUpdateToOneWithWhereWithoutInvoicesInputSchema;
