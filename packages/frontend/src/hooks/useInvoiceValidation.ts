/**
 * @deprecated This hook is no longer used.
 * 
 * MIGRATION COMPLETE: Validation has been moved to the backend.
 * 
 * The backend now validates all input using middleware with auto-generated Zod schemas
 * from the Prisma schema. Frontend no longer needs pre-submission validation.
 * 
 * Benefits of backend validation:
 * ✅ Single source of truth (Prisma schema)
 * ✅ Consistent validation across all clients
 * ✅ Security: Cannot be bypassed by malicious clients
 * ✅ Reduced frontend bundle size
 * ✅ Less frontend state management
 * 
 * Error handling:
 * - Backend returns { success: false, error, details, code, statusCode }
 * - Global error handler in backend catches all ZodError
 * - Frontend receives standardized error responses
 * 
 * See: src/lib/api-client.ts - All API calls throw errors with messages
 * See: packages/backend/src/utils/error-handler.ts - Centralized error handling
 * 
 * To delete:
 * git rm packages/frontend/src/hooks/useInvoiceValidation.ts
 * git commit -m "refactor: remove deprecated frontend validation hook"
 */

export function useInvoiceValidation() {
  console.warn(
    '[DEPRECATED] useInvoiceValidation is no longer used. ' +
    'Validation has been moved to the backend. ' +
    'See PHASE_3_CLEANUP_GUIDE.md for details.'
  );
  
  return {
    errors: {},
    fieldError: () => undefined,
    validateField: () => true,
    validateForm: () => ({ isValid: true, errors: {}, fieldErrors: [] }),
    validatePartner: () => ({ isValid: true, errors: {}, fieldErrors: [] }),
    validateLine: () => ({ isValid: true, errors: {}, fieldErrors: [] }),
    clearErrors: () => {},
    clearFieldError: () => {},
  };
}

export default useInvoiceValidation;
