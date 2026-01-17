import { z } from 'zod';

/////////////////////////////////////////
// ALLOWANCE CHARGE SCHEMA
/////////////////////////////////////////

export const AllowanceChargeSchema = z.object({
  id: z.string().cuid(),
  type: z.string(),
  code: z.string(),
  description: z.string(),
  amount: z.number(),
  basedOn: z.string().nullable(),
  invoiceId: z.string().nullable(),
  lineId: z.string().nullable(),
  createdAt: z.coerce.date(),
  updatedAt: z.coerce.date(),
})

export type AllowanceCharge = z.infer<typeof AllowanceChargeSchema>

export default AllowanceChargeSchema;
