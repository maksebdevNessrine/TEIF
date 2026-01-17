import { z } from 'zod';

export const PartnerScalarFieldEnumSchema = z.enum(['id','idType','idValue','name','addressDescription','street','city','postalCode','country','rc','capital','phone','email','partnerType','createdAt','updatedAt']);

export default PartnerScalarFieldEnumSchema;
