/**
 * @deprecated This file is no longer used.
 * 
 * MIGRATION COMPLETE: All API calls have been migrated to use the Hono RPC client.
 * 
 * See: src/lib/api-client.ts for the new RPC client implementation
 * See: PHASE_3_CLEANUP_GUIDE.md for migration details
 * 
 * This file can be safely deleted after verification:
 * ✅ grep -r "from '@/lib/api'" packages/frontend/src/ (returns 0 results)
 * ✅ All components use hooks (useInvoices, useAuth)
 * ✅ All hooks use RPC client functions
 * 
 * To delete:
 * git rm packages/frontend/src/lib/api.ts
 * git commit -m "refactor: remove deprecated axios API client"
 * 
 * @see src/lib/api-client.ts - New RPC client
 * @see src/hooks/useInvoices.ts - Invoice hooks using RPC
 * @see src/contexts/AuthContext.tsx - Auth context using RPC
 */

// This file is intentionally left as a deprecation notice
// Do not add new code here - use api-client.ts instead

export const api = {
  invoices: {
    deprecated: true,
    message: 'Use listInvoices, getInvoice, createInvoice, updateInvoice, deleteInvoice, getInvoicePdf from api-client.ts',
  },
  auth: {
    deprecated: true,
    message: 'Use loginUser, registerUser, logoutUser, refreshTokenUser, getCurrentUser from api-client.ts',
  },
} as any;

export default api;
