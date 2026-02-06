import type { Prisma } from '@prisma/client';

import { z } from 'zod';
import { UserSignatureWhereUniqueInputSchema } from './UserSignatureWhereUniqueInputSchema';
import { UserSignatureCreateWithoutUserInputSchema } from './UserSignatureCreateWithoutUserInputSchema';
import { UserSignatureUncheckedCreateWithoutUserInputSchema } from './UserSignatureUncheckedCreateWithoutUserInputSchema';

export const UserSignatureCreateOrConnectWithoutUserInputSchema: z.ZodType<Prisma.UserSignatureCreateOrConnectWithoutUserInput> = z.object({
  where: z.lazy(() => UserSignatureWhereUniqueInputSchema),
  create: z.union([ z.lazy(() => UserSignatureCreateWithoutUserInputSchema), z.lazy(() => UserSignatureUncheckedCreateWithoutUserInputSchema) ]),
}).strict();

export default UserSignatureCreateOrConnectWithoutUserInputSchema;
