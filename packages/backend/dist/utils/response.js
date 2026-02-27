/**
 * Format a successful API response
 */
export function successResponse(data, statusCode = 200) {
    return {
        status: statusCode >= 400 ? 'error' : 'success',
        data,
        statusCode,
    };
}
/**
 * Format an error API response
 */
export function errorResponse(message, statusCode = 500, details) {
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
export function validationErrorResponse(zodError) {
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
