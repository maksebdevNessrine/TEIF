import type { Prisma } from '@prisma/client';

import { z } from 'zod';

export const PartnerIdTypeIdValueCompoundUniqueInputSchema: z.ZodType<Prisma.PartnerIdTypeIdValueCompoundUniqueInput> = z.object({
  idType: z.string(),
  idValue: z.string(),
}).strict();

export default PartnerIdTypeIdValueCompoundUniqueInputSchema;
