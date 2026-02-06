import type { Prisma } from '@prisma/client';

import { z } from 'zod';
import { UserSignatureWhereInputSchema } from './UserSignatureWhereInputSchema';
import { UserSignatureUpdateWithoutUserInputSchema } from './UserSignatureUpdateWithoutUserInputSchema';
import { UserSignatureUncheckedUpdateWithoutUserInputSchema } from './UserSignatureUncheckedUpdateWithoutUserInputSchema';

export const UserSignatureUpdateToOneWithWhereWithoutUserInputSchema: z.ZodType<Prisma.UserSignatureUpdateToOneWithWhereWithoutUserInput> = z.object({
  where: z.lazy(() => UserSignatureWhereInputSchema).optional(),
  data: z.union([ z.lazy(() => UserSignatureUpdateWithoutUserInputSchema), z.lazy(() => UserSignatureUncheckedUpdateWithoutUserInputSchema) ]),
}).strict();

export default UserSignatureUpdateToOneWithWhereWithoutUserInputSchema;
