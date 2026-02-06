import type { Prisma } from '@prisma/client';

import { z } from 'zod';
import { UserSignatureUpdateWithoutUserInputSchema } from './UserSignatureUpdateWithoutUserInputSchema';
import { UserSignatureUncheckedUpdateWithoutUserInputSchema } from './UserSignatureUncheckedUpdateWithoutUserInputSchema';
import { UserSignatureCreateWithoutUserInputSchema } from './UserSignatureCreateWithoutUserInputSchema';
import { UserSignatureUncheckedCreateWithoutUserInputSchema } from './UserSignatureUncheckedCreateWithoutUserInputSchema';
import { UserSignatureWhereInputSchema } from './UserSignatureWhereInputSchema';

export const UserSignatureUpsertWithoutUserInputSchema: z.ZodType<Prisma.UserSignatureUpsertWithoutUserInput> = z.object({
  update: z.union([ z.lazy(() => UserSignatureUpdateWithoutUserInputSchema), z.lazy(() => UserSignatureUncheckedUpdateWithoutUserInputSchema) ]),
  create: z.union([ z.lazy(() => UserSignatureCreateWithoutUserInputSchema), z.lazy(() => UserSignatureUncheckedCreateWithoutUserInputSchema) ]),
  where: z.lazy(() => UserSignatureWhereInputSchema).optional(),
}).strict();

export default UserSignatureUpsertWithoutUserInputSchema;
