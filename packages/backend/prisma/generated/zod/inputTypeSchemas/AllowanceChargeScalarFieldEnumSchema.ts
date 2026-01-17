import { z } from 'zod';

export const AllowanceChargeScalarFieldEnumSchema = z.enum(['id','type','code','description','amount','basedOn','invoiceId','lineId','createdAt','updatedAt']);

export default AllowanceChargeScalarFieldEnumSchema;
