import { z } from 'zod';
import type { Prisma } from '@prisma/client';
import { UserSignatureCreateManyInputSchema } from '../inputTypeSchemas/UserSignatureCreateManyInputSchema'

export const UserSignatureCreateManyArgsSchema: z.ZodType<Prisma.UserSignatureCreateManyArgs> = z.object({
  data: z.union([ UserSignatureCreateManyInputSchema, UserSignatureCreateManyInputSchema.array() ]),
  skipDuplicates: z.boolean().optional(),
}).strict();

export default UserSignatureCreateManyArgsSchema;
