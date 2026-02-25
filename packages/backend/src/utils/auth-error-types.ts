/**
 * Auth Error Types - Enum, Class, and Interfaces
 * Extracted for better compilation isolation
 */

export enum AuthErrorCode {
  // Validation Errors (400)
  INVALID_EMAIL = 'INVALID_EMAIL',
  INVALID_PASSWORD = 'INVALID_PASSWORD',
  PASSWORD_TOO_WEAK = 'PASSWORD_TOO_WEAK',
  PASSWORD_MISMATCH = 'PASSWORD_MISMATCH',
  INVALID_NAME = 'INVALID_NAME',
  MISSING_FIELDS = 'MISSING_FIELDS',

  // Authentication Errors (401)
  INVALID_CREDENTIALS = 'INVALID_CREDENTIALS',
  INVALID_TOKEN = 'INVALID_TOKEN',
  TOKEN_EXPIRED = 'TOKEN_EXPIRED',
  TOKEN_NOT_PROVIDED = 'TOKEN_NOT_PROVIDED',
  INSUFFICIENT_PERMISSIONS = 'INSUFFICIENT_PERMISSIONS',

  // User Errors (404/409)
  USER_NOT_FOUND = 'USER_NOT_FOUND',
  EMAIL_EXISTS = 'EMAIL_EXISTS',
  EMAIL_NOT_VERIFIED = 'EMAIL_NOT_VERIFIED',
  ACCOUNT_DISABLED = 'ACCOUNT_DISABLED',
  ACCOUNT_LOCKED = 'ACCOUNT_LOCKED',

  // Verification Errors
  INVALID_VERIFICATION_CODE = 'INVALID_VERIFICATION_CODE',
  VERIFICATION_CODE_EXPIRED = 'VERIFICATION_CODE_EXPIRED',
  TOO_MANY_VERIFICATION_ATTEMPTS = 'TOO_MANY_VERIFICATION_ATTEMPTS',

  // Rate Limiting (429)
  TOO_MANY_LOGIN_ATTEMPTS = 'TOO_MANY_LOGIN_ATTEMPTS',
  TOO_MANY_REQUESTS = 'TOO_MANY_REQUESTS',
  RATE_LIMITED = 'RATE_LIMITED',

  // Server Errors (500)
  INTERNAL_ERROR = 'INTERNAL_ERROR',
  DATABASE_ERROR = 'DATABASE_ERROR',
  EMAIL_SERVICE_ERROR = 'EMAIL_SERVICE_ERROR',
  TOKEN_GENERATION_FAILED = 'TOKEN_GENERATION_FAILED',

  // Other
  UNKNOWN_ERROR = 'UNKNOWN_ERROR',
}

export interface AuthErrorResponse {
  success: false;
  error: string;
  message: string;
  code: AuthErrorCode;
  statusCode: number;
  details?: Record<string, any>;
  retryable?: boolean;
  retryAfter?: number;
}

export class AuthError extends Error {
  constructor(
    public code: AuthErrorCode,
    public message: string,
    public statusCode: number = 400,
    public details?: Record<string, any>,
    public retryable: boolean = false,
    public retryAfter?: number
  ) {
    super(message);
    this.name = 'AuthError';
  }

  toResponse(): AuthErrorResponse {
    return {
      success: false,
      error: this.code,
      message: this.message,
      code: this.code,
      statusCode: this.statusCode,
      details: this.details,
      retryable: this.retryable,
      retryAfter: this.retryAfter,
    };
  }
}
