// TypeScript shim for @teif/shared packages that ship only JS
// These are intentionally loose typings to unblock TS compilation.

declare module '@teif/shared' {
  // Auth
  export const registerSchema: any;
  export const loginSchema: any;
  export type AuthResponse = any;
  export type LogoutResponse = any;

  // Shared types
  export * from '@teif/shared/types';
  // Utility functions
  export * from '@teif/shared/utils';
  // Validation helpers
  export * from '@teif/shared/validation';
}

declare module '@teif/shared/types' {
  export type Partner = any;
  export type InvoiceResponse = any;
  export type InvoiceData = any;
  export type InvoiceLine = any;
  export type AllowanceCharge = any;
  export type DocTypeCode = any;
  export type PaymentMeansCode = any;
  export type OperationNature = any;
  export type IdType = any;
}

declare module '@teif/shared/utils' {
  export function calculateLineAmount(...args: any[]): any;
  export function calculateTaxAmount(...args: any[]): any;
  export function generateTeifXml(...args: any[]): any;
  export function amountToWords(...args: any[]): any;
}

declare module '@teif/shared/validation' {
  export const validateInvoice: any;
}
