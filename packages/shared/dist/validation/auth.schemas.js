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
/**
 * Resend verification code schema
 */
export const resendCodeSchema = z.object({
    email: z.string()
        .email('Invalid email format'),
});
/**
 * User response type (without sensitive data)
 */
export const userResponseSchema = z.object({
    id: z.string(),
    email: z.string(),
    name: z.string(),
    emailVerified: z.boolean().optional(),
});
/**
 * Authentication response type (includes token)
 */
export const authResponseSchema = z.object({
    user: userResponseSchema,
    token: z.string(),
});
/**
 * Logout response
 */
export const logoutResponseSchema = z.object({
    message: z.string(),
});
