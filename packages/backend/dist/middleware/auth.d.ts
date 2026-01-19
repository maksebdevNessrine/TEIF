import { Context, Next } from 'hono';
export interface AuthUser {
    userId: string;
    email: string;
}
/**
 * JWT authentication middleware
 * Extracts token from Authorization header or httpOnly cookie and validates it
 * Attaches user data to context if valid
 */
export declare function authMiddleware(c: Context, next: Next): Promise<(Response & import("hono").TypedResponse<{
    error: string;
}, 401, "json">) | undefined>;
/**
 * Helper function to require authentication
 * Returns the middleware for use in protected routes
 */
export declare function requireAuth(): typeof authMiddleware;
