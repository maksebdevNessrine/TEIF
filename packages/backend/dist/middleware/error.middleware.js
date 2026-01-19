import { z } from 'zod';
import { validationErrorResponse, errorResponse } from '../utils/response';
/**
 * Global error handler middleware
 * Catches and formats errors from route handlers
 */
export async function errorMiddleware(c, next) {
    try {
        await next();
    }
    catch (error) {
        console.error('Error:', error);
        // Handle Zod validation errors
        if (error instanceof z.ZodError) {
            const response = validationErrorResponse(error);
            return c.json(response, 400);
        }
        // Handle custom errors with statusCode
        if (error instanceof Error && error.statusCode) {
            const response = errorResponse(error.message, error.statusCode);
            return c.json(response, error.statusCode);
        }
        // Handle JWT errors
        if (error instanceof Error && error.message.includes('Token')) {
            return c.json(errorResponse(error.message, 401), 401);
        }
        // Handle generic errors
        if (error instanceof Error) {
            // Check for Prisma unique constraint errors
            if (error.code === 'P2002') {
                return c.json(errorResponse('Email already exists', 409), 409);
            }
            // Check for Prisma not found errors
            if (error.code === 'P2025') {
                return c.json(errorResponse('Resource not found', 404), 404);
            }
            // In production, don't leak error details
            const message = process.env.NODE_ENV === 'production'
                ? 'Internal server error'
                : error.message;
            return c.json(errorResponse(message, 500), 500);
        }
        // Handle unknown errors
        return c.json(errorResponse('Internal server error', 500), 500);
    }
}
