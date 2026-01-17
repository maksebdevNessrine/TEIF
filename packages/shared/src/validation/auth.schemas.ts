import { z } from 'zod';

/**
 * Registration validation schema
 * Validates name (min 2 chars), email (valid format), password (min 8 chars)
 */
export const registerSchema = z.object({
  name: z.string()
    .min(2, 'Name must be at least 2 characters')
    .max(100, 'Name must be at most 100 characters'),
  email: z.string()
    .email('Invalid email format'),
  password: z.string()
    .min(8, 'Password must be at least 8 characters')
    .max(128, 'Password must be at most 128 characters'),
});

export type RegisterInput = z.infer<typeof registerSchema>;

/**
 * Login validation schema
 * Validates email and password (min 6 chars for flexibility)
 */
export const loginSchema = z.object({
  email: z.string()
    .email('Invalid email format'),
  password: z.string()
    .min(6, 'Password must be at least 6 characters'),
});

export type LoginInput = z.infer<typeof loginSchema>;

/**
 * Email verification schema
 * Validates email and 6-digit code
 */
export const verifyEmailSchema = z.object({
  email: z.string()
    .email('Invalid email format'),
  code: z.string()
    .regex(/^\d{6}$/, 'Verification code must be 6 digits'),
});

export type VerifyEmailInput = z.infer<typeof verifyEmailSchema>;

/**
 * Resend verification code schema
 */
export const resendCodeSchema = z.object({
  email: z.string()
    .email('Invalid email format'),
});

export type ResendCodeInput = z.infer<typeof resendCodeSchema>;

/**
 * User response type (without sensitive data)
 */
export const userResponseSchema = z.object({
  id: z.string(),
  email: z.string(),
  name: z.string(),
  emailVerified: z.boolean().optional(),
});

export type UserResponse = z.infer<typeof userResponseSchema>;

/**
 * Authentication response type (includes token)
 */
export const authResponseSchema = z.object({
  user: userResponseSchema,
  token: z.string(),
});

export type AuthResponse = z.infer<typeof authResponseSchema>;

/**
 * Logout response
 */
export const logoutResponseSchema = z.object({
  message: z.string(),
});

export type LogoutResponse = z.infer<typeof logoutResponseSchema>;
