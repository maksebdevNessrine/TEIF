import { z } from 'zod';

export const InvoiceLineScalarFieldEnumSchema = z.enum(['id','invoiceId','itemCode','description','quantity','unit','unitPrice','discountRate','taxRate','fodec','exemptionReason','lineAmount','taxAmount','totalAmount','createdAt','updatedAt']);

export default InvoiceLineScalarFieldEnumSchema;
