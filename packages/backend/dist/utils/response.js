"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.successResponse = successResponse;
exports.errorResponse = errorResponse;
exports.validationErrorResponse = validationErrorResponse;
/**
 * Format a successful API response
 */
function successResponse(data, statusCode = 200) {
    return {
        status: statusCode >= 400 ? 'error' : 'success',
        data,
        statusCode,
    };
}
/**
 * Format an error API response
 */
function errorResponse(message, statusCode = 500, details) {
    return {
        status: 'error',
        error: message,
        ...(details && { details }),
        statusCode,
    };
}
/**
 * Format Zod validation errors into a readable format
 */
function validationErrorResponse(zodError) {
    const errors = {};
    zodError.errors.forEach((error) => {
        const path = error.path.join('.');
        if (!errors[path]) {
            errors[path] = [];
        }
        errors[path].push(error.message);
    });
    return {
        status: 'error',
        error: 'Validation failed',
        details: errors,
        statusCode: 400,
    };
}
