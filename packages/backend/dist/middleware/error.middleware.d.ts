import { Context, Next } from 'hono';
/**
 * Global error handler middleware
 * Catches and formats errors from route handlers
 */
export declare function errorMiddleware(c: Context, next: Next): Promise<(Response & import("hono").TypedResponse<any, any, "json">) | undefined>;
