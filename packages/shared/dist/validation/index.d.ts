/**
 * TEIF Invoice Validators
 * Real-time validation for invoice fields per TEIF 1.8.8 specification
 */
export interface ValidationResult {
    isValid: boolean;
    error?: string;
    warning?: string;
}
export { invoiceListQuerySchema, type InvoiceListQueryType, } from './schemas';
export { registerSchema, type RegisterInput, loginSchema, type LoginInput, verifyEmailSchema, type VerifyEmailInput, resendCodeSchema, type ResendCodeInput, userResponseSchema, type UserResponse, authResponseSchema, type AuthResponse, logoutResponseSchema, type LogoutResponse, } from './auth.schemas';
/** Validate RIB (Tunisian Bank Account Number) - MOD 97 checksum */
export declare function validateRib(rib: string): ValidationResult;
/** Validate SIREN (French Business Identifier - 9 digits) */
export declare function validateSiren(siren: string): ValidationResult;
/** Validate Tunisian Tax ID (8-10 digits) */
export declare function validateTaxId(taxId: string): ValidationResult;
/** Validate Date Format YYYY-MM-DD */
export declare function validateDateFormat(date: string): ValidationResult;
/** Validate Signature Date Format DDMMyyHHmm (e.g., 1001261430 = 10/01/26 14:30) */
export declare function validateSignatureDateFormat(date: string): ValidationResult;
/** Validate Email Address */
export declare function validateEmail(email: string): ValidationResult;
/** Validate Phone Number (flexible format, at least 8 digits) */
export declare function validatePhone(phone: string): ValidationResult;
/** Validate Identifier (varies by type) */
export declare function validateIdentifier(value: string, type: string): ValidationResult;
/** Validate Amount (0 to 9999999999.99999 with max 5 decimals) */
export declare function validateAmount(amount: number | string): ValidationResult;
/** Validate Tax Rate (0 to 100%, typically 0, 7, 13, 19) */
export declare function validateTaxRate(rate: number | string): ValidationResult;
/** Validate IRC Withholding Tax Rate (0-10%) */
export declare function validateIrcRate(rate: number | string): ValidationResult;
/** Validate Quantity (positive number) */
export declare function validateQuantity(quantity: number | string): ValidationResult;
/** Validate Invoice Number (alphanumeric, no special chars except -, /) */
export declare function validateInvoiceNumber(number: string): ValidationResult;
/** Validate Company Name */
export declare function validateCompanyName(name: string): ValidationResult;
/** Validate Street Address */
export declare function validateStreetAddress(street: string): ValidationResult;
/** Validate City */
export declare function validateCity(city: string): ValidationResult;
/** Validate Postal Code (alphanumeric, max 10 chars) */
export declare function validatePostalCode(code: string): ValidationResult;
/** Bulk Validation for Partner */
export declare function validatePartner(partner: any): ValidationResult[];
export * from './schemas';
export * from './auth.schemas';
//# sourceMappingURL=index.d.ts.map