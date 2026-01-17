import { z } from 'zod';
import type { Prisma } from '@prisma/client';
import { PartnerCountOutputTypeSelectSchema } from './PartnerCountOutputTypeSelectSchema';

export const PartnerCountOutputTypeArgsSchema: z.ZodType<Prisma.PartnerCountOutputTypeDefaultArgs> = z.object({
  select: z.lazy(() => PartnerCountOutputTypeSelectSchema).nullish(),
}).strict();

export default PartnerCountOutputTypeSelectSchema;
