import { z } from 'zod';

export const SignatureAuditScalarFieldEnumSchema = z.enum(['id','userId','action','invoiceId','documentNumber','status','errorMessage','certificateUsed','ipAddress','userAgent','createdAt']);

export default SignatureAuditScalarFieldEnumSchema;
