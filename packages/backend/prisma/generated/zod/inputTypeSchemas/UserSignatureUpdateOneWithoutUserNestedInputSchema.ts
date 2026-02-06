import type { Prisma } from '@prisma/client';

import { z } from 'zod';
import { UserSignatureCreateWithoutUserInputSchema } from './UserSignatureCreateWithoutUserInputSchema';
import { UserSignatureUncheckedCreateWithoutUserInputSchema } from './UserSignatureUncheckedCreateWithoutUserInputSchema';
import { UserSignatureCreateOrConnectWithoutUserInputSchema } from './UserSignatureCreateOrConnectWithoutUserInputSchema';
import { UserSignatureUpsertWithoutUserInputSchema } from './UserSignatureUpsertWithoutUserInputSchema';
import { UserSignatureWhereInputSchema } from './UserSignatureWhereInputSchema';
import { UserSignatureWhereUniqueInputSchema } from './UserSignatureWhereUniqueInputSchema';
import { UserSignatureUpdateToOneWithWhereWithoutUserInputSchema } from './UserSignatureUpdateToOneWithWhereWithoutUserInputSchema';
import { UserSignatureUpdateWithoutUserInputSchema } from './UserSignatureUpdateWithoutUserInputSchema';
import { UserSignatureUncheckedUpdateWithoutUserInputSchema } from './UserSignatureUncheckedUpdateWithoutUserInputSchema';

export const UserSignatureUpdateOneWithoutUserNestedInputSchema: z.ZodType<Prisma.UserSignatureUpdateOneWithoutUserNestedInput> = z.object({
  create: z.union([ z.lazy(() => UserSignatureCreateWithoutUserInputSchema), z.lazy(() => UserSignatureUncheckedCreateWithoutUserInputSchema) ]).optional(),
  connectOrCreate: z.lazy(() => UserSignatureCreateOrConnectWithoutUserInputSchema).optional(),
  upsert: z.lazy(() => UserSignatureUpsertWithoutUserInputSchema).optional(),
  disconnect: z.union([ z.boolean(),z.lazy(() => UserSignatureWhereInputSchema) ]).optional(),
  delete: z.union([ z.boolean(),z.lazy(() => UserSignatureWhereInputSchema) ]).optional(),
  connect: z.lazy(() => UserSignatureWhereUniqueInputSchema).optional(),
  update: z.union([ z.lazy(() => UserSignatureUpdateToOneWithWhereWithoutUserInputSchema), z.lazy(() => UserSignatureUpdateWithoutUserInputSchema), z.lazy(() => UserSignatureUncheckedUpdateWithoutUserInputSchema) ]).optional(),
}).strict();

export default UserSignatureUpdateOneWithoutUserNestedInputSchema;
