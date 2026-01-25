/**
 * Auth Error Classes & Codes
 * Professional error handling with specific error types for frontend
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
  retryable?: boolean; // Can client retry the request
  retryAfter?: number; // Seconds to wait before retry (for rate limiting)
}

/**
 * Custom Auth Error Class
 */
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

/**
 * Error factory functions for common auth errors
 */
export const authErrors = {
  // Validation
  invalidEmail: () =>
    new AuthError(
      AuthErrorCode.INVALID_EMAIL,
      'The email address is invalid',
      400
    ),

  invalidPassword: () =>
    new AuthError(
      AuthErrorCode.INVALID_PASSWORD,
      'The password is invalid',
      400
    ),

  passwordTooWeak: () =>
    new AuthError(
      AuthErrorCode.PASSWORD_TOO_WEAK,
      'Password must be at least 8 characters with uppercase, lowercase, and numbers',
      400
    ),

  passwordMismatch: () =>
    new AuthError(
      AuthErrorCode.PASSWORD_MISMATCH,
      'Passwords do not match',
      400
    ),

  missingFields: (fields: string[]) =>
    new AuthError(
      AuthErrorCode.MISSING_FIELDS,
      `Missing required fields: ${fields.join(', ')}`,
      400,
      { fields }
    ),

  // Authentication
  invalidCredentials: () =>
    new AuthError(
      AuthErrorCode.INVALID_CREDENTIALS,
      'Email or password is incorrect',
      401
    ),

  invalidToken: () =>
    new AuthError(
      AuthErrorCode.INVALID_TOKEN,
      'Authentication token is invalid',
      401
    ),

  tokenExpired: () =>
    new AuthError(
      AuthErrorCode.TOKEN_EXPIRED,
      'Session expired. Please login again',
      401,
      undefined,
      true // Retryable by refreshing
    ),

  tokenNotProvided: () =>
    new AuthError(
      AuthErrorCode.TOKEN_NOT_PROVIDED,
      'Authentication required',
      401
    ),

  insufficientPermissions: () =>
    new AuthError(
      AuthErrorCode.INSUFFICIENT_PERMISSIONS,
      'You do not have permission to perform this action',
      403
    ),

  // User
  userNotFound: () =>
    new AuthError(
      AuthErrorCode.USER_NOT_FOUND,
      'User account not found',
      404
    ),

  emailExists: (email?: string) =>
    new AuthError(
      AuthErrorCode.EMAIL_EXISTS,
      `Email ${email ? `"${email}"` : 'is already registered'}. Please use a different email or login`,
      409,
      { email }
    ),

  emailNotVerified: () =>
    new AuthError(
      AuthErrorCode.EMAIL_NOT_VERIFIED,
      'Email not verified. Check your inbox for verification code',
      401
    ),

  accountDisabled: () =>
    new AuthError(
      AuthErrorCode.ACCOUNT_DISABLED,
      'This account is disabled. Contact support',
      403
    ),

  accountLocked: (retryAfter?: number) =>
    new AuthError(
      AuthErrorCode.ACCOUNT_LOCKED,
      'Account temporarily locked due to too many failed attempts. Try again later',
      403,
      undefined,
      true,
      retryAfter
    ),

  // Verification
  invalidVerificationCode: () =>
    new AuthError(
      AuthErrorCode.INVALID_VERIFICATION_CODE,
      'Verification code is invalid or incorrect',
      400
    ),

  verificationCodeExpired: () =>
    new AuthError(
      AuthErrorCode.VERIFICATION_CODE_EXPIRED,
      'Verification code has expired. Request a new one',
      400,
      undefined,
      true
    ),

  tooManyVerificationAttempts: (retryAfter?: number) =>
    new AuthError(
      AuthErrorCode.TOO_MANY_VERIFICATION_ATTEMPTS,
      'Too many verification attempts. Please try again later',
      429,
      undefined,
      true,
      retryAfter
    ),

  // Rate Limiting
  tooManyLoginAttempts: (retryAfter?: number) =>
    new AuthError(
      AuthErrorCode.TOO_MANY_LOGIN_ATTEMPTS,
      `Too many login attempts. Try again in ${retryAfter || 15} minutes`,
      429,
      { retryAfter },
      true,
      retryAfter
    ),

  tooManyRequests: (retryAfter?: number) =>
    new AuthError(
      AuthErrorCode.TOO_MANY_REQUESTS,
      'Too many requests. Please slow down',
      429,
      undefined,
      true,
      retryAfter
    ),

  rateLimited: (retryAfter?: number) =>
    new AuthError(
      AuthErrorCode.RATE_LIMITED,
      'Request rate limited. Please try again later',
      429,
      undefined,
      true,
      retryAfter
    ),

  // Server Errors
  internalError: () =>
    new AuthError(
      AuthErrorCode.INTERNAL_ERROR,
      'An unexpected error occurred. Please try again later',
      500
    ),

  databaseError: () =>
    new AuthError(
      AuthErrorCode.DATABASE_ERROR,
      'Database error occurred. Please try again later',
      500
    ),

  emailServiceError: () =>
    new AuthError(
      AuthErrorCode.EMAIL_SERVICE_ERROR,
      'Failed to send email. Please try again later',
      500
    ),

  tokenGenerationFailed: () =>
    new AuthError(
      AuthErrorCode.TOKEN_GENERATION_FAILED,
      'Failed to generate authentication token',
      500
    ),

  unknownError: (message?: string) =>
    new AuthError(
      AuthErrorCode.UNKNOWN_ERROR,
      message || 'An unknown error occurred',
      500
    ),
};
