import { z } from 'zod';
import type { Prisma } from '@prisma/client';
import { PartnerCreateManyInputSchema } from '../inputTypeSchemas/PartnerCreateManyInputSchema'

export const PartnerCreateManyArgsSchema: z.ZodType<Prisma.PartnerCreateManyArgs> = z.object({
  data: z.union([ PartnerCreateManyInputSchema, PartnerCreateManyInputSchema.array() ]),
  skipDuplicates: z.boolean().optional(),
}).strict();

export default PartnerCreateManyArgsSchema;
