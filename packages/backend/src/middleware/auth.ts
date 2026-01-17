import { Context, Next } from 'hono';
import { getCookie } from 'hono/cookie';
import { verifyToken } from '../services/auth.service';

export interface AuthUser {
  userId: string;
  email: string;
}

/**
 * JWT authentication middleware
 * Extracts token from Authorization header or httpOnly cookie and validates it
 * Attaches user data to context if valid
 */
export async function authMiddleware(c: Context, next: Next) {
  try {
    // Try to get token from Authorization header first (for API calls)
    let token = '';
    const authHeader = c.req.header('Authorization');
    
    if (authHeader) {
      // Extract token from "Bearer <token>" format
      const parts = authHeader.split(' ');
      if (parts.length === 2 && parts[0] === 'Bearer') {
        token = parts[1];
      } else {
        return c.json(
          { error: 'Invalid authorization format. Use: Bearer <token>' },
          401
        );
      }
    } else {
      // Try to get token from httpOnly cookie (for browser requests)
      token = getCookie(c, 'accessToken') || '';
    }

    if (!token) {
      return c.json(
        { error: 'Authentication required' },
        401
      );
    }

    // Verify token
    const decoded = verifyToken(token);

    // Attach user to context
    c.set('user', decoded as AuthUser);

    await next();
  } catch (error) {
    const message = error instanceof Error ? error.message : 'Token verification failed';
    return c.json(
      { error: message },
      401
    );
  }
}

/**
 * Helper function to require authentication
 * Returns the middleware for use in protected routes
 */
export function requireAuth() {
  return authMiddleware;
}
