import type { Prisma } from '@prisma/client';

import { z } from 'zod';
import { PartnerWhereInputSchema } from './PartnerWhereInputSchema';

export const PartnerRelationFilterSchema: z.ZodType<Prisma.PartnerRelationFilter> = z.object({
  is: z.lazy(() => PartnerWhereInputSchema).optional(),
  isNot: z.lazy(() => PartnerWhereInputSchema).optional(),
}).strict();

export default PartnerRelationFilterSchema;
