/**
 * Global Zod Error Handler Middleware
 * Catches Zod validation errors from @hono/zod-validator
 * Transforms them into user-friendly API responses
 */

import { ZodError } from 'zod';
import type { Context, Next } from 'hono';

export async function zodErrorHandler(c: Context, next: Next) {
  try {
    await next();
  } catch (error) {
    if (error instanceof ZodError) {
      // Format Zod validation errors
      const details = error.errors.map((err) => ({
        field: err.path.join('.'),
        message: err.message,
        code: err.code,
        type: 'type' in err ? err.type : err.code,
      }));

      return c.json(
        {
          success: false,
          error: 'Validation Failed',
          details,
          count: error.errors.length,
        },
        400
      );
    }

    // Re-throw for other error handlers
    throw error;
  }
}
