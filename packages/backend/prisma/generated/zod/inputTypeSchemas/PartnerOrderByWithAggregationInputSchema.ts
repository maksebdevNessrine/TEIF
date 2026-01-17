import type { Prisma } from '@prisma/client';

import { z } from 'zod';
import { SortOrderSchema } from './SortOrderSchema';
import { SortOrderInputSchema } from './SortOrderInputSchema';
import { PartnerCountOrderByAggregateInputSchema } from './PartnerCountOrderByAggregateInputSchema';
import { PartnerMaxOrderByAggregateInputSchema } from './PartnerMaxOrderByAggregateInputSchema';
import { PartnerMinOrderByAggregateInputSchema } from './PartnerMinOrderByAggregateInputSchema';

export const PartnerOrderByWithAggregationInputSchema: z.ZodType<Prisma.PartnerOrderByWithAggregationInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  idType: z.lazy(() => SortOrderSchema).optional(),
  idValue: z.lazy(() => SortOrderSchema).optional(),
  name: z.lazy(() => SortOrderSchema).optional(),
  addressDescription: z.union([ z.lazy(() => SortOrderSchema), z.lazy(() => SortOrderInputSchema) ]).optional(),
  street: z.lazy(() => SortOrderSchema).optional(),
  city: z.lazy(() => SortOrderSchema).optional(),
  postalCode: z.lazy(() => SortOrderSchema).optional(),
  country: z.lazy(() => SortOrderSchema).optional(),
  rc: z.union([ z.lazy(() => SortOrderSchema), z.lazy(() => SortOrderInputSchema) ]).optional(),
  capital: z.union([ z.lazy(() => SortOrderSchema), z.lazy(() => SortOrderInputSchema) ]).optional(),
  phone: z.union([ z.lazy(() => SortOrderSchema), z.lazy(() => SortOrderInputSchema) ]).optional(),
  email: z.union([ z.lazy(() => SortOrderSchema), z.lazy(() => SortOrderInputSchema) ]).optional(),
  partnerType: z.union([ z.lazy(() => SortOrderSchema), z.lazy(() => SortOrderInputSchema) ]).optional(),
  createdAt: z.lazy(() => SortOrderSchema).optional(),
  updatedAt: z.lazy(() => SortOrderSchema).optional(),
  _count: z.lazy(() => PartnerCountOrderByAggregateInputSchema).optional(),
  _max: z.lazy(() => PartnerMaxOrderByAggregateInputSchema).optional(),
  _min: z.lazy(() => PartnerMinOrderByAggregateInputSchema).optional(),
}).strict();

export default PartnerOrderByWithAggregationInputSchema;
