"use strict";
/**
 * Auth Routes - Using Hono RPC + Zod Validator Middleware
 *
 * This router demonstrates the new architecture:
 * 1. Hono Zod Validator middleware for request validation
 * 2. Global error handling (no try-catch for validation)
 * 3. Fully typed RPC for frontend
 */
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
const hono_1 = require("hono");
const cookie_1 = require("hono/cookie");
const zod_validator_1 = require("@hono/zod-validator");
const zod_1 = require("zod");
const shared_1 = require("@teif/shared");
const authService = __importStar(require("../services/auth.service"));
const auth_1 = require("../middleware/auth");
const authRoutes = new hono_1.Hono();
/**
 * POST /api/auth/register
 * Register a new user (local authentication)
 *
 * Creates user with email verification code
 * User must verify email before full access
 */
authRoutes.post('/register', (0, zod_validator_1.zValidator)('json', shared_1.registerSchema), async (c) => {
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
 * Middleware validates request body against loginSchema
 * Global error handler catches validation/service errors
 */
authRoutes.post('/login', (0, zod_validator_1.zValidator)('json', shared_1.loginSchema), async (c) => {
    const validatedData = c.req.valid('json');
    const { email, password } = validatedData;
    // Sign in locally
    const user = await authService.loginUser(email, password);
    // Generate local JWT access token (short-lived)
    const accessToken = authService.generateAccessToken(user.id, user.email);
    // Generate and store refresh token
    const refreshToken = authService.generateRefreshTokenJwt(user.id);
    await authService.storeRefreshToken(user.id, refreshToken);
    // Set access token as httpOnly cookie (short-lived, for API requests)
    (0, cookie_1.setCookie)(c, 'accessToken', accessToken, {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        sameSite: 'Strict',
        maxAge: 15 * 60, // 15 minutes
    });
    // Set refresh token as httpOnly cookie (long-lived, for token refresh)
    (0, cookie_1.setCookie)(c, 'refreshToken', refreshToken, {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        sameSite: 'Strict',
        maxAge: 7 * 24 * 60 * 60, // 7 days
    });
    // Return response
    const response = {
        user,
        token: accessToken,
    };
    return c.json({ success: true, data: response }, 200);
});
/**
 * POST /api/auth/refresh
 * Refresh the access token using refresh token
 * Validates stored refresh token, rotates it, and returns new access token
 */
authRoutes.post('/refresh', async (c) => {
    // Get refresh token from httpOnly cookie or body
    let refreshToken = (0, cookie_1.getCookie)(c, 'refreshToken');
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
    (0, cookie_1.setCookie)(c, 'refreshToken', newRefreshToken, {
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
authRoutes.post('/logout', (0, auth_1.requireAuth)(), async (c) => {
    const authUser = c.get('user');
    if (authUser) {
        // Revoke all refresh tokens for this user
        const { prisma } = await Promise.resolve().then(() => __importStar(require('../lib/prisma')));
        await prisma.refreshToken.updateMany({
            where: { userId: authUser.userId, revokedAt: null },
            data: { revokedAt: new Date() },
        });
    }
    // Sign out from Supabase (if applicable)
    const cookie = (0, cookie_1.getCookie)(c, 'refreshToken');
    if (cookie) {
        await authService.signOutWithSupabase(cookie);
    }
    // Clear refresh token cookie
    (0, cookie_1.setCookie)(c, 'refreshToken', '', { maxAge: 0 });
    const response = {
        message: 'Logged out successfully',
    };
    return c.json({ success: true, data: response }, 200);
});
/**
 * GET /api/auth/me
 * Get current user (requires authentication - validates access token only)
 */
authRoutes.get('/me', (0, auth_1.requireAuth)(), async (c) => {
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
authRoutes.post('/verify-email', (0, zod_validator_1.zValidator)('json', zod_1.z.object({
    email: zod_1.z.string().email('Invalid email format'),
    code: zod_1.z.string().regex(/^\d{6}$/, 'Verification code must be 6 digits'),
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
        (0, cookie_1.setCookie)(c, 'refreshToken', refreshToken, {
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
authRoutes.post('/resend-code', (0, zod_validator_1.zValidator)('json', zod_1.z.object({
    email: zod_1.z.string().email('Invalid email format'),
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
exports.default = authRoutes;
