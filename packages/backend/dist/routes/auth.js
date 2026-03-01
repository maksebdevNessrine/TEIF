/**
 * Auth Routes - Using Hono RPC + Zod Validator Middleware
 *
 * This router demonstrates the new architecture:
 * 1. Hono Zod Validator middleware for request validation
 * 2. Global error handling (no try-catch for validation)
 * 3. Fully typed RPC for frontend
 */
import { Hono } from 'hono';
import { setCookie, getCookie } from 'hono/cookie';
import { zValidator } from '@hono/zod-validator';
import { z } from 'zod';
import { registerSchema, loginSchema } from '@teif/shared';
import * as authService from '../services/auth.service';
import { requireAuth } from '../middleware/auth';
import { AuthError, authErrors } from '../utils/auth-errors';
const authRoutes = new Hono();
/**
 * POST /api/auth/register
 * Register a new user (local authentication)
 *
 * Creates user with email verification code
 * User must verify email before full access
 */
authRoutes.post('/register', zValidator('json', registerSchema), async (c) => {
    try {
        const validatedData = c.req.valid('json');
        const { name, email, password } = validatedData;
        // Create user with verification code
        const user = await authService.createUserWithVerification(name, email, password);
        // Return response with user data (email NOT verified yet)
        return c.json({
            success: true,
            data: {
                user,
                message: 'Registration successful. Check your email for verification code.',
                emailVerified: false,
            }
        }, 201);
    }
    catch (error) {
        // Handle duplicate email
        if (error.message === 'Email already exists') {
            return c.json({
                success: false,
                error: 'Email already exists',
                code: 'EMAIL_EXISTS'
            }, 409);
        }
        // Re-throw other errors for global handler
        throw error;
    }
});
/**
 * POST /api/auth/login
 * Login with email and password (local authentication)
 *
 * Comprehensive error handling:
 * - Invalid credentials
 * - User not found
 * - Account locked/disabled
 * - Rate limiting
 * - Token generation failures
 */
authRoutes.post('/login', zValidator('json', loginSchema), async (c) => {
    try {
        const validatedData = c.req.valid('json');
        const { email, password } = validatedData;
        // Validate email format (extra validation)
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            throw authErrors.invalidEmail();
        }
        // Sign in locally
        let user;
        try {
            user = await authService.loginUser(email, password);
        }
        catch (error) {
            // Handle specific auth service errors
            if (error.code === 'USER_NOT_FOUND' || error.message === 'User not found') {
                // Don't reveal whether email exists (security best practice)
                throw authErrors.invalidCredentials();
            }
            if (error.message === 'Invalid credentials' || error.message === 'Invalid password') {
                throw authErrors.invalidCredentials();
            }
            if (error.code === 'ACCOUNT_LOCKED') {
                throw authErrors.accountLocked(error.retryAfter);
            }
            if (error.code === 'ACCOUNT_DISABLED') {
                throw authErrors.accountDisabled();
            }
            // Re-throw as is if already an AuthError
            if (error instanceof AuthError)
                throw error;
            // Unknown error from service
            throw authErrors.internalError();
        }
        // Generate local JWT access token (short-lived)
        let accessToken;
        try {
            accessToken = authService.generateAccessToken(user.id, user.email);
        }
        catch (error) {
            console.error('Access token generation failed:', error);
            throw authErrors.tokenGenerationFailed();
        }
        // Generate and store refresh token
        let refreshToken;
        try {
            refreshToken = authService.generateRefreshTokenJwt(user.id);
            await authService.storeRefreshToken(user.id, refreshToken);
        }
        catch (error) {
            console.error('Refresh token generation failed:', error);
            throw authErrors.tokenGenerationFailed();
        }
        // Set access token as httpOnly cookie (short-lived, for API requests)
        setCookie(c, 'accessToken', accessToken, {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            sameSite: 'Strict',
            maxAge: 15 * 60, // 15 minutes
        });
        // Set refresh token as httpOnly cookie (long-lived, for token refresh)
        setCookie(c, 'refreshToken', refreshToken, {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            sameSite: 'Strict',
            maxAge: 7 * 24 * 60 * 60, // 7 days
        });
        // Return success response
        const response = {
            user,
            token: accessToken,
        };
        return c.json({ success: true, data: response }, 200);
    }
    catch (error) {
        // Handle AuthError instances
        if (error instanceof AuthError) {
            const response = error.toResponse();
            return c.json(response, error.statusCode);
        }
        // Handle unexpected errors
        console.error('Unexpected login error:', error);
        const unknownError = authErrors.unknownError(error?.message);
        const response = unknownError.toResponse();
        return c.json(response, 500);
    }
});
/**
 * POST /api/auth/refresh
 * Refresh the access token using refresh token
 * Validates stored refresh token, rotates it, and returns new access token
 */
authRoutes.post('/refresh', async (c) => {
    // Get refresh token from httpOnly cookie or body
    let refreshToken = getCookie(c, 'refreshToken');
    if (!refreshToken) {
        const body = await c.req.json().catch(() => ({}));
        refreshToken = body.refreshToken;
    }
    if (!refreshToken) {
        const error = new Error('Refresh token required');
        error.statusCode = 401;
        throw error;
    }
    // Verify the refresh token JWT
    const decoded = authService.verifyToken(refreshToken);
    if (decoded.type !== 'refresh') {
        const error = new Error('Invalid token type');
        error.statusCode = 401;
        throw error;
    }
    const userId = decoded.userId;
    // Validate refresh token in database
    const isValid = await authService.validateRefreshToken(userId, refreshToken);
    if (!isValid) {
        const error = new Error('Invalid or expired refresh token');
        error.statusCode = 401;
        throw error;
    }
    // Rotate refresh token
    const newRefreshToken = await authService.rotateRefreshToken(userId, refreshToken);
    // Get user info
    const user = await authService.findUserById(userId);
    // Generate new access token
    const newAccessToken = authService.generateAccessToken(user.id, user.email);
    // Set new refresh token as httpOnly cookie
    setCookie(c, 'refreshToken', newRefreshToken, {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        sameSite: 'Strict',
        maxAge: 7 * 24 * 60 * 60, // 7 days
    });
    return c.json({
        success: true,
        data: {
            token: newAccessToken,
            refreshToken: newRefreshToken,
        }
    }, 200);
});
/**
 * POST /api/auth/logout
 * Logout user - revokes refresh tokens
 */
authRoutes.post('/logout', requireAuth(), async (c) => {
    const authUser = c.get('user');
    if (authUser) {
        // Revoke all refresh tokens for this user
        const { prisma } = await import('../lib/prisma');
        await prisma.refreshToken.updateMany({
            where: { userId: authUser.userId, revokedAt: null },
            data: { revokedAt: new Date() },
        });
    }
    // Sign out from Supabase (if applicable)
    const cookie = getCookie(c, 'refreshToken');
    if (cookie) {
        await authService.signOutWithSupabase(cookie);
    }
    // Clear refresh token cookie
    setCookie(c, 'refreshToken', '', { maxAge: 0 });
    const response = {
        message: 'Logged out successfully',
    };
    return c.json({ success: true, data: response }, 200);
});
/**
 * GET /api/auth/me
 * Get current user (requires authentication - validates access token only)
 */
authRoutes.get('/me', requireAuth(), async (c) => {
    const authUser = c.get('user');
    if (!authUser) {
        const error = new Error('Authentication required');
        error.statusCode = 401;
        throw error;
    }
    // Fetch fresh user data
    const user = await authService.findUserById(authUser.userId);
    const response = {
        user,
    };
    return c.json({ success: true, data: response }, 200);
});
/**
 * POST /api/auth/verify-email
 * Verify email with 6-digit code
 */
authRoutes.post('/verify-email', zValidator('json', z.object({
    email: z.string().email('Invalid email format'),
    code: z.string().regex(/^\d{6}$/, 'Verification code must be 6 digits'),
})), async (c) => {
    try {
        const validatedData = c.req.valid('json');
        const { email, code } = validatedData;
        // Verify the code
        const user = await authService.verifyEmailCode(email, code);
        // Now generate tokens for verified user
        const accessToken = authService.generateAccessToken(user.id, user.email);
        const refreshToken = authService.generateRefreshTokenJwt(user.id);
        await authService.storeRefreshToken(user.id, refreshToken);
        // Set refresh token as httpOnly cookie
        setCookie(c, 'refreshToken', refreshToken, {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            sameSite: 'Strict',
            maxAge: 7 * 24 * 60 * 60, // 7 days
        });
        const response = {
            user,
            token: accessToken,
        };
        return c.json({ success: true, data: response }, 200);
    }
    catch (error) {
        // Handle invalid verification code
        if (error.message === 'Invalid or expired verification code') {
            return c.json({
                success: false,
                error: 'Invalid or expired verification code',
                code: 'INVALID_CODE'
            }, 400);
        }
        if (error.message === 'User not found') {
            return c.json({
                success: false,
                error: 'User not found',
                code: 'USER_NOT_FOUND'
            }, 404);
        }
        // Re-throw other errors for global handler
        throw error;
    }
});
/**
 * POST /api/auth/resend-code
 * Resend verification code to email
 */
authRoutes.post('/resend-code', zValidator('json', z.object({
    email: z.string().email('Invalid email format'),
})), async (c) => {
    try {
        const validatedData = c.req.valid('json');
        const { email } = validatedData;
        const result = await authService.resendVerificationCode(email);
        return c.json({ success: true, data: result }, 200);
    }
    catch (error) {
        // Handle user not found
        if (error.message === 'User not found') {
            return c.json({
                success: false,
                error: 'User not found',
                code: 'USER_NOT_FOUND'
            }, 404);
        }
        // Re-throw other errors for global handler
        throw error;
    }
});
export default authRoutes;
