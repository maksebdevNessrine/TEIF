/**
 * Frontend Error Handler Utility
 * Parses backend error responses and provides user-friendly error messages
 */

export enum AuthErrorCode {
  // Validation Errors
  INVALID_EMAIL = 'INVALID_EMAIL',
  INVALID_PASSWORD = 'INVALID_PASSWORD',
  PASSWORD_TOO_WEAK = 'PASSWORD_TOO_WEAK',
  PASSWORD_MISMATCH = 'PASSWORD_MISMATCH',
  INVALID_NAME = 'INVALID_NAME',
  MISSING_FIELDS = 'MISSING_FIELDS',

  // Authentication Errors
  INVALID_CREDENTIALS = 'INVALID_CREDENTIALS',
  INVALID_TOKEN = 'INVALID_TOKEN',
  TOKEN_EXPIRED = 'TOKEN_EXPIRED',
  TOKEN_NOT_PROVIDED = 'TOKEN_NOT_PROVIDED',
  INSUFFICIENT_PERMISSIONS = 'INSUFFICIENT_PERMISSIONS',

  // User Errors
  USER_NOT_FOUND = 'USER_NOT_FOUND',
  EMAIL_EXISTS = 'EMAIL_EXISTS',
  EMAIL_NOT_VERIFIED = 'EMAIL_NOT_VERIFIED',
  ACCOUNT_DISABLED = 'ACCOUNT_DISABLED',
  ACCOUNT_LOCKED = 'ACCOUNT_LOCKED',

  // Verification Errors
  INVALID_VERIFICATION_CODE = 'INVALID_VERIFICATION_CODE',
  VERIFICATION_CODE_EXPIRED = 'VERIFICATION_CODE_EXPIRED',
  TOO_MANY_VERIFICATION_ATTEMPTS = 'TOO_MANY_VERIFICATION_ATTEMPTS',

  // Rate Limiting
  TOO_MANY_LOGIN_ATTEMPTS = 'TOO_MANY_LOGIN_ATTEMPTS',
  TOO_MANY_REQUESTS = 'TOO_MANY_REQUESTS',
  RATE_LIMITED = 'RATE_LIMITED',

  // Server Errors
  INTERNAL_ERROR = 'INTERNAL_ERROR',
  DATABASE_ERROR = 'DATABASE_ERROR',
  EMAIL_SERVICE_ERROR = 'EMAIL_SERVICE_ERROR',
  TOKEN_GENERATION_FAILED = 'TOKEN_GENERATION_FAILED',

  // Other
  UNKNOWN_ERROR = 'UNKNOWN_ERROR',
  NETWORK_ERROR = 'NETWORK_ERROR',
}

export interface ParsedAuthError {
  code: AuthErrorCode;
  message: string;
  userMessage: string; // User-friendly message
  statusCode: number;
  field?: string; // For field-specific errors
  retryable: boolean;
  retryAfter?: number; // Seconds to wait before retry
  isNetworkError: boolean;
  isValidationError: boolean;
  isAuthError: boolean;
  isServerError: boolean;
  isRateLimited: boolean;
}

/**
 * Parse backend error response and return structured error info
 */
export function parseAuthError(error: any): ParsedAuthError {
  // Network errors
  if (!error.response && error.message) {
    return {
      code: AuthErrorCode.NETWORK_ERROR,
      message: 'Network connection failed',
      userMessage: 'Unable to reach the server. Please check your internet connection and try again.',
      statusCode: 0,
      retryable: true,
      isNetworkError: true,
      isValidationError: false,
      isAuthError: false,
      isServerError: false,
      isRateLimited: false,
    };
  }

  // Extract error from response
  const errorData = error.response?.data || error;
  const statusCode = error.response?.status || errorData.statusCode || 500;
  const code = (errorData.code || errorData.error || AuthErrorCode.UNKNOWN_ERROR) as AuthErrorCode;
  const message = errorData.message || 'An error occurred';
  const retryable = errorData.retryable || false;
  const retryAfter = errorData.retryAfter;

  // Determine error categories
  const isValidationError = statusCode === 400;
  const isAuthError = statusCode === 401;
  const isServerError = statusCode >= 500;
  const isRateLimited = statusCode === 429;

  // Get user-friendly message based on error code
  const userMessage = getErrorMessage(code, message, retryAfter);

  return {
    code,
    message,
    userMessage,
    statusCode,
    retryable: retryable || isRateLimited || code === AuthErrorCode.TOKEN_EXPIRED,
    retryAfter,
    isNetworkError: false,
    isValidationError,
    isAuthError,
    isServerError,
    isRateLimited,
  };
}

/**
 * Get user-friendly error message based on error code
 */
export function getErrorMessage(
  code: AuthErrorCode,
  fallback?: string,
  retryAfter?: number
): string {
  const messages: Record<AuthErrorCode, string | ((retryAfter?: number) => string)> = {
    // Validation
    [AuthErrorCode.INVALID_EMAIL]: 'Please enter a valid email address',
    [AuthErrorCode.INVALID_PASSWORD]: 'Password is invalid',
    [AuthErrorCode.PASSWORD_TOO_WEAK]:
      'Password must be at least 8 characters with uppercase, lowercase, and numbers',
    [AuthErrorCode.PASSWORD_MISMATCH]: 'Passwords do not match',
    [AuthErrorCode.INVALID_NAME]: 'Please enter a valid name',
    [AuthErrorCode.MISSING_FIELDS]: 'Please fill in all required fields',

    // Authentication
    [AuthErrorCode.INVALID_CREDENTIALS]: 'Email or password is incorrect',
    [AuthErrorCode.INVALID_TOKEN]: 'Your session is invalid. Please login again',
    [AuthErrorCode.TOKEN_EXPIRED]: 'Your session has expired. Please login again',
    [AuthErrorCode.TOKEN_NOT_PROVIDED]: 'Authentication required',
    [AuthErrorCode.INSUFFICIENT_PERMISSIONS]: 'You do not have permission to do this',

    // User
    [AuthErrorCode.USER_NOT_FOUND]: 'Account not found. Please check your email or sign up',
    [AuthErrorCode.EMAIL_EXISTS]:
      'Email already registered. Please login or use a different email',
    [AuthErrorCode.EMAIL_NOT_VERIFIED]:
      'Email not verified. Check your inbox for verification code',
    [AuthErrorCode.ACCOUNT_DISABLED]:
      'This account is disabled. Please contact support',
    [AuthErrorCode.ACCOUNT_LOCKED]:
      (retryAfter) =>
        `Account locked due to too many failed attempts. Try again in ${retryAfter || 15} minutes`,

    // Verification
    [AuthErrorCode.INVALID_VERIFICATION_CODE]: 'Verification code is incorrect',
    [AuthErrorCode.VERIFICATION_CODE_EXPIRED]:
      'Verification code expired. Request a new one',
    [AuthErrorCode.TOO_MANY_VERIFICATION_ATTEMPTS]:
      (retryAfter) =>
        `Too many verification attempts. Try again in ${retryAfter || 15} minutes`,

    // Rate Limiting
    [AuthErrorCode.TOO_MANY_LOGIN_ATTEMPTS]:
      (retryAfter) =>
        `Too many login attempts. Try again in ${retryAfter || 15} minutes`,
    [AuthErrorCode.TOO_MANY_REQUESTS]: 'Too many requests. Please slow down',
    [AuthErrorCode.RATE_LIMITED]:
      (retryAfter) =>
        `Rate limited. Please try again in ${retryAfter || 60} seconds`,

    // Server
    [AuthErrorCode.INTERNAL_ERROR]:
      'An unexpected error occurred. Please try again later',
    [AuthErrorCode.DATABASE_ERROR]:
      'Database error. Please try again later',
    [AuthErrorCode.EMAIL_SERVICE_ERROR]:
      'Failed to send email. Please try again later',
    [AuthErrorCode.TOKEN_GENERATION_FAILED]:
      'Failed to generate session. Please try again',

    // Other
    [AuthErrorCode.UNKNOWN_ERROR]: 'An error occurred. Please try again',
    [AuthErrorCode.NETWORK_ERROR]:
      'Network connection failed. Please check your internet',
  };

  const msg = messages[code];

  if (typeof msg === 'function') {
    return msg(retryAfter);
  }

  return msg || fallback || 'An error occurred';
}

/**
 * Parse error response from fetch/axios
 * Handles different error formats
 */
export function parseErrorResponse(error: any): ParsedAuthError {
  try {
    return parseAuthError(error);
  } catch {
    // Fallback for completely unexpected errors
    return {
      code: AuthErrorCode.UNKNOWN_ERROR,
      message: String(error?.message || 'Unknown error'),
      userMessage: 'An unexpected error occurred. Please try again',
      statusCode: 500,
      retryable: false,
      isNetworkError: false,
      isValidationError: false,
      isAuthError: false,
      isServerError: true,
      isRateLimited: false,
    };
  }
}

/**
 * Check if error is specific error type
 */
export function isErrorCode(error: ParsedAuthError, code: AuthErrorCode): boolean {
  return error.code === code;
}

export function isNetworkError(error: ParsedAuthError): boolean {
  return error.isNetworkError;
}

export function isServerError(error: ParsedAuthError): boolean {
  return error.isServerError;
}

export function isRateLimited(error: ParsedAuthError): boolean {
  return error.isRateLimited;
}

export function isValidationError(error: ParsedAuthError): boolean {
  return error.isValidationError;
}

export function isAuthError(error: ParsedAuthError): boolean {
  return error.isAuthError;
}

/**
 * Get retry delay in seconds
 */
export function getRetryDelay(error: ParsedAuthError): number {
  if (error.retryAfter) {
    return error.retryAfter;
  }

  // Default retry delays by error type
  if (error.isRateLimited) {
    return 60;
  }

  if (error.isNetworkError) {
    return 5;
  }

  if (error.isServerError) {
    return 10;
  }

  return 0; // No retry
}
