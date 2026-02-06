import type { Prisma } from '@prisma/client';

import { z } from 'zod';
import { UserSignatureCreateWithoutUserInputSchema } from './UserSignatureCreateWithoutUserInputSchema';
import { UserSignatureUncheckedCreateWithoutUserInputSchema } from './UserSignatureUncheckedCreateWithoutUserInputSchema';
import { UserSignatureCreateOrConnectWithoutUserInputSchema } from './UserSignatureCreateOrConnectWithoutUserInputSchema';
import { UserSignatureWhereUniqueInputSchema } from './UserSignatureWhereUniqueInputSchema';

export const UserSignatureCreateNestedOneWithoutUserInputSchema: z.ZodType<Prisma.UserSignatureCreateNestedOneWithoutUserInput> = z.object({
  create: z.union([ z.lazy(() => UserSignatureCreateWithoutUserInputSchema), z.lazy(() => UserSignatureUncheckedCreateWithoutUserInputSchema) ]).optional(),
  connectOrCreate: z.lazy(() => UserSignatureCreateOrConnectWithoutUserInputSchema).optional(),
  connect: z.lazy(() => UserSignatureWhereUniqueInputSchema).optional(),
}).strict();

export default UserSignatureCreateNestedOneWithoutUserInputSchema;
