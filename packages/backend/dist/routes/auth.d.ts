/**
 * Auth Routes - Using Hono RPC + Zod Validator Middleware
 *
 * This router demonstrates the new architecture:
 * 1. Hono Zod Validator middleware for request validation
 * 2. Global error handling (no try-catch for validation)
 * 3. Fully typed RPC for frontend
 */
import { Hono } from 'hono';
import { AuthUser } from '../middleware/auth';
type AuthContext = {
    Variables: {
        user: AuthUser;
    };
};
declare const authRoutes: Hono<AuthContext, import("hono/types").BlankSchema, "/">;
export default authRoutes;
