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
import type { Context } from 'hono';
interface ApiError {
    success: false;
    error: string;
    message: string;
    details?: any;
    code?: string;
    statusCode: number;
}
/**
 * Handle Zod validation errors
 */
export declare function handleZodError(error: ZodError): ApiError;
/**
 * Handle Prisma database errors
 */
export declare function handlePrismaError(error: Prisma.PrismaClientKnownRequestError): ApiError;
/**
 * Handle Prisma client initialization errors
 */
export declare function handlePrismaClientError(error: Prisma.PrismaClientInitializationError): ApiError;
/**
 * Handle runtime validation errors (custom)
 */
export declare function handleValidationError(message: string, details?: any): ApiError;
/**
 * Handle authentication errors
 */
export declare function handleAuthError(message?: string): ApiError;
/**
 * Handle authorization errors
 */
export declare function handleForbiddenError(message?: string): ApiError;
/**
 * Handle generic errors
 */
export declare function handleUnknownError(error: unknown): ApiError;
/**
 * Global error response sender
 */
export declare function sendErrorResponse(c: Context, apiError: ApiError): Response;
export {};
