"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.authMiddleware = authMiddleware;
exports.requireAuth = requireAuth;
const cookie_1 = require("hono/cookie");
const auth_service_1 = require("../services/auth.service");
/**
 * JWT authentication middleware
 * Extracts token from Authorization header or httpOnly cookie and validates it
 * Attaches user data to context if valid
 */
async function authMiddleware(c, next) {
    try {
        // Try to get token from Authorization header first (for API calls)
        let token = '';
        const authHeader = c.req.header('Authorization');
        if (authHeader) {
            // Extract token from "Bearer <token>" format
            const parts = authHeader.split(' ');
            if (parts.length === 2 && parts[0] === 'Bearer') {
                token = parts[1];
            }
            else {
                return c.json({ error: 'Invalid authorization format. Use: Bearer <token>' }, 401);
            }
        }
        else {
            // Try to get token from httpOnly cookie (for browser requests)
            token = (0, cookie_1.getCookie)(c, 'accessToken') || '';
        }
        if (!token) {
            return c.json({ error: 'Authentication required' }, 401);
        }
        // Verify token
        const decoded = (0, auth_service_1.verifyToken)(token);
        // Attach user to context
        c.set('user', decoded);
        await next();
    }
    catch (error) {
        const message = error instanceof Error ? error.message : 'Token verification failed';
        return c.json({ error: message }, 401);
    }
}
/**
 * Helper function to require authentication
 * Returns the middleware for use in protected routes
 */
function requireAuth() {
    return authMiddleware;
}
