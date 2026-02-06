import { z } from 'zod';

/////////////////////////////////////////
// SIGNATURE AUDIT SCHEMA
/////////////////////////////////////////

export const SignatureAuditSchema = z.object({
  id: z.string().cuid(),
  userId: z.string(),
  action: z.string(),
  invoiceId: z.string().nullable(),
  documentNumber: z.string().nullable(),
  status: z.string(),
  errorMessage: z.string().nullable(),
  certificateUsed: z.string().nullable(),
  ipAddress: z.string().nullable(),
  userAgent: z.string().nullable(),
  createdAt: z.coerce.date(),
})

export type SignatureAudit = z.infer<typeof SignatureAuditSchema>

export default SignatureAuditSchema;
