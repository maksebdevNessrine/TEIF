/**
 * Type definitions for authentication context
 */
export interface AuthUser {
    userId: string;
    email: string;
}
/**
 * Extended Hono context with auth user
 * Used for type safety in protected routes
 */
export interface AuthContext {
    user: AuthUser;
}
