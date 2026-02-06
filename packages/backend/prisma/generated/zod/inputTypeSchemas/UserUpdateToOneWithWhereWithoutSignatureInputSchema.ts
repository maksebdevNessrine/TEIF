import type { Prisma } from '@prisma/client';

import { z } from 'zod';
import { UserWhereInputSchema } from './UserWhereInputSchema';
import { UserUpdateWithoutSignatureInputSchema } from './UserUpdateWithoutSignatureInputSchema';
import { UserUncheckedUpdateWithoutSignatureInputSchema } from './UserUncheckedUpdateWithoutSignatureInputSchema';

export const UserUpdateToOneWithWhereWithoutSignatureInputSchema: z.ZodType<Prisma.UserUpdateToOneWithWhereWithoutSignatureInput> = z.object({
  where: z.lazy(() => UserWhereInputSchema).optional(),
  data: z.union([ z.lazy(() => UserUpdateWithoutSignatureInputSchema), z.lazy(() => UserUncheckedUpdateWithoutSignatureInputSchema) ]),
}).strict();

export default UserUpdateToOneWithWhereWithoutSignatureInputSchema;
