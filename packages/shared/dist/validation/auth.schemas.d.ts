import { z } from 'zod';
/**
 * Registration validation schema
 * Validates name (min 2 chars), email (valid format), password (min 8 chars)
 */
export declare const registerSchema: z.ZodObject<{
    name: z.ZodString;
    email: z.ZodString;
    password: z.ZodString;
}, "strip", z.ZodTypeAny, {
    name: string;
    email: string;
    password: string;
}, {
    name: string;
    email: string;
    password: string;
}>;
export type RegisterInput = z.infer<typeof registerSchema>;
/**
 * Login validation schema
 * Validates email and password (min 6 chars for flexibility)
 */
export declare const loginSchema: z.ZodObject<{
    email: z.ZodString;
    password: z.ZodString;
}, "strip", z.ZodTypeAny, {
    email: string;
    password: string;
}, {
    email: string;
    password: string;
}>;
export type LoginInput = z.infer<typeof loginSchema>;
/**
 * Email verification schema
 * Validates email and 6-digit code
 */
export declare const verifyEmailSchema: z.ZodObject<{
    email: z.ZodString;
    code: z.ZodString;
}, "strip", z.ZodTypeAny, {
    code: string;
    email: string;
}, {
    code: string;
    email: string;
}>;
export type VerifyEmailInput = z.infer<typeof verifyEmailSchema>;
/**
 * Resend verification code schema
 */
export declare const resendCodeSchema: z.ZodObject<{
    email: z.ZodString;
}, "strip", z.ZodTypeAny, {
    email: string;
}, {
    email: string;
}>;
export type ResendCodeInput = z.infer<typeof resendCodeSchema>;
/**
 * User response type (without sensitive data)
 */
export declare const userResponseSchema: z.ZodObject<{
    id: z.ZodString;
    email: z.ZodString;
    name: z.ZodString;
    emailVerified: z.ZodOptional<z.ZodBoolean>;
}, "strip", z.ZodTypeAny, {
    name: string;
    email: string;
    id: string;
    emailVerified?: boolean | undefined;
}, {
    name: string;
    email: string;
    id: string;
    emailVerified?: boolean | undefined;
}>;
export type UserResponse = z.infer<typeof userResponseSchema>;
/**
 * Authentication response type (includes token)
 */
export declare const authResponseSchema: z.ZodObject<{
    user: z.ZodObject<{
        id: z.ZodString;
        email: z.ZodString;
        name: z.ZodString;
        emailVerified: z.ZodOptional<z.ZodBoolean>;
    }, "strip", z.ZodTypeAny, {
        name: string;
        email: string;
        id: string;
        emailVerified?: boolean | undefined;
    }, {
        name: string;
        email: string;
        id: string;
        emailVerified?: boolean | undefined;
    }>;
    token: z.ZodString;
}, "strip", z.ZodTypeAny, {
    user: {
        name: string;
        email: string;
        id: string;
        emailVerified?: boolean | undefined;
    };
    token: string;
}, {
    user: {
        name: string;
        email: string;
        id: string;
        emailVerified?: boolean | undefined;
    };
    token: string;
}>;
export type AuthResponse = z.infer<typeof authResponseSchema>;
/**
 * Logout response
 */
export declare const logoutResponseSchema: z.ZodObject<{
    message: z.ZodString;
}, "strip", z.ZodTypeAny, {
    message: string;
}, {
    message: string;
}>;
export type LogoutResponse = z.infer<typeof logoutResponseSchema>;
//# sourceMappingURL=auth.schemas.d.ts.map