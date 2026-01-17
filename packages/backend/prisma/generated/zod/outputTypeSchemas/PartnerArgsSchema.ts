import { z } from 'zod';
import type { Prisma } from '@prisma/client';
import { PartnerSelectSchema } from '../inputTypeSchemas/PartnerSelectSchema';
import { PartnerIncludeSchema } from '../inputTypeSchemas/PartnerIncludeSchema';

export const PartnerArgsSchema: z.ZodType<Prisma.PartnerDefaultArgs> = z.object({
  select: z.lazy(() => PartnerSelectSchema).optional(),
  include: z.lazy(() => PartnerIncludeSchema).optional(),
}).strict();

export default PartnerArgsSchema;
