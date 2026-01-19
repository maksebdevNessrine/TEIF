"use strict";
/**
 * Global Zod Error Handler Middleware
 * Catches Zod validation errors from @hono/zod-validator
 * Transforms them into user-friendly API responses
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.zodErrorHandler = zodErrorHandler;
const zod_1 = require("zod");
async function zodErrorHandler(c, next) {
    try {
        await next();
    }
    catch (error) {
        if (error instanceof zod_1.ZodError) {
            // Format Zod validation errors
            const details = error.errors.map((err) => ({
                field: err.path.join('.'),
                message: err.message,
                code: err.code,
                type: 'type' in err ? err.type : err.code,
            }));
            return c.json({
                success: false,
                error: 'Validation Failed',
                details,
                count: error.errors.length,
            }, 400);
        }
        // Re-throw for other error handlers
        throw error;
    }
}
