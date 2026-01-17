import { z } from 'zod';
import type { Prisma } from '@prisma/client';
import { PartnerWhereInputSchema } from '../inputTypeSchemas/PartnerWhereInputSchema'

export const PartnerDeleteManyArgsSchema: z.ZodType<Prisma.PartnerDeleteManyArgs> = z.object({
  where: PartnerWhereInputSchema.optional(), 
}).strict();

export default PartnerDeleteManyArgsSchema;
