/**
 * Global Error Handler
 * Centralized error handling for all error types:
 * - Zod validation errors
 * - Prisma database errors
 * - Authentication errors
 * - Application errors
 */
import { ZodError } from 'zod';
import { Prisma } from '@prisma/client';
/**
 * Handle Zod validation errors
 */
export function handleZodError(error) {
    const details = error.errors.map((err) => ({
        field: err.path.join('.') || 'root',
        message: err.message,
        code: err.code,
        type: 'type' in err ? err.type : err.code,
    }));
    return {
        success: false,
        error: 'Validation Failed',
        message: `${error.errors.length} validation error(s)`,
        details,
        code: 'VALIDATION_ERROR',
        statusCode: 400,
    };
}
/**
 * Handle Prisma database errors
 */
export function handlePrismaError(error) {
    switch (error.code) {
        case 'P2002':
            // Unique constraint violation
            const field = error.meta?.target?.[0] || 'field';
            return {
                success: false,
                error: 'Conflict',
                message: `A record with this ${field} already exists`,
                code: 'DUPLICATE_FIELD',
                statusCode: 409,
            };
        case 'P2025':
            // Record not found
            return {
                success: false,
                error: 'Not Found',
                message: 'The requested record does not exist',
                code: 'NOT_FOUND',
                statusCode: 404,
            };
        case 'P2003':
            // Foreign key constraint failed
            return {
                success: false,
                error: 'Invalid Reference',
                message: 'The referenced record does not exist',
                code: 'INVALID_REFERENCE',
                statusCode: 400,
            };
        case 'P2014':
            // Required relation violation
            return {
                success: false,
                error: 'Invalid Data',
                message: 'Missing required relationship',
                code: 'MISSING_RELATION',
                statusCode: 400,
            };
        default:
            return {
                success: false,
                error: 'Database Error',
                message: 'An error occurred while accessing the database',
                code: error.code,
                statusCode: 500,
            };
    }
}
/**
 * Handle Prisma client initialization errors
 */
export function handlePrismaClientError(error) {
    return {
        success: false,
        error: 'Service Unavailable',
        message: 'Database connection failed',
        code: 'DB_UNAVAILABLE',
        statusCode: 503,
    };
}
/**
 * Handle runtime validation errors (custom)
 */
export function handleValidationError(message, details) {
    return {
        success: false,
        error: 'Validation Error',
        message,
        details,
        code: 'VALIDATION_ERROR',
        statusCode: 400,
    };
}
/**
 * Handle authentication errors
 */
export function handleAuthError(message = 'Unauthorized') {
    return {
        success: false,
        error: 'Authentication Failed',
        message,
        code: 'AUTH_ERROR',
        statusCode: 401,
    };
}
/**
 * Handle authorization errors
 */
export function handleForbiddenError(message = 'Forbidden') {
    return {
        success: false,
        error: 'Access Denied',
        message,
        code: 'FORBIDDEN',
        statusCode: 403,
    };
}
/**
 * Handle generic errors
 */
export function handleUnknownError(error) {
    if (error instanceof ZodError) {
        return handleZodError(error);
    }
    if (error instanceof Prisma.PrismaClientKnownRequestError) {
        return handlePrismaError(error);
    }
    if (error instanceof Prisma.PrismaClientInitializationError) {
        return handlePrismaClientError(error);
    }
    if (error instanceof Error) {
        return {
            success: false,
            error: 'Application Error',
            message: error.message,
            code: 'UNKNOWN_ERROR',
            statusCode: 500,
        };
    }
    return {
        success: false,
        error: 'Internal Server Error',
        message: 'An unexpected error occurred',
        code: 'UNKNOWN_ERROR',
        statusCode: 500,
    };
}
/**
 * Global error response sender
 */
export function sendErrorResponse(c, apiError) {
    return c.json(apiError, apiError.statusCode);
}
