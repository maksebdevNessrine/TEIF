import { z } from 'zod';

/////////////////////////////////////////
// PARTNER SCHEMA
/////////////////////////////////////////

export const PartnerSchema = z.object({
  id: z.string().cuid(),
  idType: z.string(),
  idValue: z.string(),
  name: z.string(),
  addressDescription: z.string().nullable(),
  street: z.string(),
  city: z.string(),
  postalCode: z.string(),
  country: z.string(),
  rc: z.string().nullable(),
  capital: z.string().nullable(),
  phone: z.string().nullable(),
  email: z.string().nullable(),
  partnerType: z.string().nullable(),
  createdAt: z.coerce.date(),
  updatedAt: z.coerce.date(),
})

export type Partner = z.infer<typeof PartnerSchema>

export default PartnerSchema;
