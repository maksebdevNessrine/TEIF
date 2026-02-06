import type { Prisma } from '@prisma/client';

import { z } from 'zod';
import { UserSignatureCreateWithoutUserInputSchema } from './UserSignatureCreateWithoutUserInputSchema';
import { UserSignatureUncheckedCreateWithoutUserInputSchema } from './UserSignatureUncheckedCreateWithoutUserInputSchema';
import { UserSignatureCreateOrConnectWithoutUserInputSchema } from './UserSignatureCreateOrConnectWithoutUserInputSchema';
import { UserSignatureWhereUniqueInputSchema } from './UserSignatureWhereUniqueInputSchema';

export const UserSignatureUncheckedCreateNestedOneWithoutUserInputSchema: z.ZodType<Prisma.UserSignatureUncheckedCreateNestedOneWithoutUserInput> = z.object({
  create: z.union([ z.lazy(() => UserSignatureCreateWithoutUserInputSchema), z.lazy(() => UserSignatureUncheckedCreateWithoutUserInputSchema) ]).optional(),
  connectOrCreate: z.lazy(() => UserSignatureCreateOrConnectWithoutUserInputSchema).optional(),
  connect: z.lazy(() => UserSignatureWhereUniqueInputSchema).optional(),
}).strict();

export default UserSignatureUncheckedCreateNestedOneWithoutUserInputSchema;
