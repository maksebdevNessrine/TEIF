import { Context, Next } from 'hono';
/**
 * Global error handler middleware
 * Catches and formats errors from route handlers
 */
export declare function errorMiddleware(c: Context, next: Next): Promise<(Response & import("hono").TypedResponse<{
    statusCode: number;
    details?: {
        [x: string]: any;
    } | undefined;
    status: string;
    error: string;
}, any, "json">) | undefined>;
