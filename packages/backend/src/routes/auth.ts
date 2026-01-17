/**
 * Auth Routes - Using Hono RPC + Zod Validator Middleware
 * 
 * This router demonstrates the new architecture:
 * 1. Hono Zod Validator middleware for request validation
 * 2. Global error handling (no try-catch for validation)
 * 3. Fully typed RPC for frontend
 */

import { Hono } from 'hono';
import { Context } from 'hono';
import { setCookie, getCookie } from 'hono/cookie';
import { zValidator } from '@hono/zod-validator';
import { z } from 'zod';
import { 
  registerSchema, 
  loginSchema,
  AuthResponse,
  LogoutResponse 
} from '@teif/shared';
import * as authService from '../services/auth.service';
import { requireAuth, AuthUser } from '../middleware/auth';

type AuthContext = {
  Variables: {
    user: AuthUser;
  };
};

const authRoutes = new Hono<AuthContext>();


/**
 * POST /api/auth/register
 * Register a new user (local authentication)
 * 
 * Creates user with email verification code
 * User must verify email before full access
 */
authRoutes.post(
  '/register',
  zValidator('json', registerSchema as any),
  async (c: Context) => {
    try {
      const validatedData = (c.req.valid as any)('json');
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
    } catch (error: any) {
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
  }
);


/**
 * POST /api/auth/login
 * Login with email and password (local authentication)
 * 
 * Middleware validates request body against loginSchema
 * Global error handler catches validation/service errors
 */
authRoutes.post(
  '/login',
  zValidator('json', loginSchema as any),
  async (c: Context) => {
    const validatedData = (c.req.valid as any)('json');
    const { email, password } = validatedData;

    // Sign in locally
    const user = await authService.loginUser(email, password);

    // Generate local JWT access token (short-lived)
    const accessToken = authService.generateAccessToken(user.id, user.email);
    
    // Generate and store refresh token
    const refreshToken = authService.generateRefreshTokenJwt(user.id);
    await authService.storeRefreshToken(user.id, refreshToken);

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

    // Return response
    const response: AuthResponse = {
      user,
      token: accessToken,
    };

    return c.json({ success: true, data: response }, 200);
  }
);


/**
 * POST /api/auth/refresh
 * Refresh the access token using refresh token
 * Validates stored refresh token, rotates it, and returns new access token
 */
authRoutes.post('/refresh', async (c: Context) => {
  // Get refresh token from httpOnly cookie or body
  let refreshToken = getCookie(c, 'refreshToken');
  
  if (!refreshToken) {
    const body = await c.req.json().catch(() => ({}));
    refreshToken = (body as any).refreshToken;
  }

  if (!refreshToken) {
    const error = new Error('Refresh token required');
    (error as any).statusCode = 401;
    throw error;
  }

  // Verify the refresh token JWT
  const decoded = authService.verifyToken(refreshToken);
  
  if (decoded.type !== 'refresh') {
    const error = new Error('Invalid token type');
    (error as any).statusCode = 401;
    throw error;
  }

  const userId = decoded.userId;

  // Validate refresh token in database
  const isValid = await authService.validateRefreshToken(userId, refreshToken);
  
  if (!isValid) {
    const error = new Error('Invalid or expired refresh token');
    (error as any).statusCode = 401;
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
authRoutes.post('/logout', requireAuth(), async (c: Context) => {
  const authUser = c.get('user') as AuthUser | undefined;
  
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

  const response: LogoutResponse = {
    message: 'Logged out successfully',
  };
  return c.json({ success: true, data: response }, 200);
});


/**
 * GET /api/auth/me
 * Get current user (requires authentication - validates access token only)
 */
authRoutes.get('/me', requireAuth(), async (c: Context) => {
  const authUser = c.get('user') as AuthUser | undefined;
  
  if (!authUser) {
    const error = new Error('Authentication required');
    (error as any).statusCode = 401;
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
authRoutes.post(
  '/verify-email',
  zValidator('json', z.object({
    email: z.string().email('Invalid email format'),
    code: z.string().regex(/^\d{6}$/, 'Verification code must be 6 digits'),
  })),
  async (c: Context) => {
    try {
      const validatedData = (c.req.valid as any)('json');
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

      const response: AuthResponse = {
        user,
        token: accessToken,
      };

      return c.json({ success: true, data: response }, 200);
    } catch (error: any) {
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
  }
);

/**
 * POST /api/auth/resend-code
 * Resend verification code to email
 */
authRoutes.post(
  '/resend-code',
  zValidator('json', z.object({
    email: z.string().email('Invalid email format'),
  })),
  async (c: Context) => {
    try {
      const validatedData = (c.req.valid as any)('json');
      const { email } = validatedData;

      const result = await authService.resendVerificationCode(email);

      return c.json({ success: true, data: result }, 200);
    } catch (error: any) {
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
  }
);

export default authRoutes;
