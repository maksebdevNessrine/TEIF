import { z } from 'zod';
import type { Prisma } from '@prisma/client';
import { PartnerUpdateManyMutationInputSchema } from '../inputTypeSchemas/PartnerUpdateManyMutationInputSchema'
import { PartnerUncheckedUpdateManyInputSchema } from '../inputTypeSchemas/PartnerUncheckedUpdateManyInputSchema'
import { PartnerWhereInputSchema } from '../inputTypeSchemas/PartnerWhereInputSchema'

export const PartnerUpdateManyArgsSchema: z.ZodType<Prisma.PartnerUpdateManyArgs> = z.object({
  data: z.union([ PartnerUpdateManyMutationInputSchema, PartnerUncheckedUpdateManyInputSchema ]),
  where: PartnerWhereInputSchema.optional(), 
}).strict();

export default PartnerUpdateManyArgsSchema;
