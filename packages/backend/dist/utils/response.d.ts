import { z } from 'zod';
/**
 * Format a successful API response
 */
export declare function successResponse<T>(data: T, statusCode?: number): {
    status: string;
    data: T;
    statusCode: number;
};
/**
 * Format an error API response
 */
export declare function errorResponse(message: string, statusCode?: number, details?: Record<string, any>): {
    statusCode: number;
    details?: Record<string, any> | undefined;
    status: string;
    error: string;
};
/**
 * Format Zod validation errors into a readable format
 */
export declare function validationErrorResponse(zodError: z.ZodError): {
    status: string;
    error: string;
    details: Record<string, string[]>;
    statusCode: number;
};
