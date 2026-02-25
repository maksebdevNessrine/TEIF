import { ZodError } from "zod";
import { Prisma } from "@prisma/client";
function handleZodError(error) {
  const details = error.errors.map((err) => ({
    field: err.path.join(".") || "root",
    message: err.message,
    code: err.code,
    type: "type" in err ? err.type : err.code
  }));
  return {
    success: false,
    error: "Validation Failed",
    message: `${error.errors.length} validation error(s)`,
    details,
    code: "VALIDATION_ERROR",
    statusCode: 400
  };
}
function handlePrismaError(error) {
  switch (error.code) {
    case "P2002":
      const field = error.meta?.target?.[0] || "field";
      return {
        success: false,
        error: "Conflict",
        message: `A record with this ${field} already exists`,
        code: "DUPLICATE_FIELD",
        statusCode: 409
      };
    case "P2025":
      return {
        success: false,
        error: "Not Found",
        message: "The requested record does not exist",
        code: "NOT_FOUND",
        statusCode: 404
      };
    case "P2003":
      return {
        success: false,
        error: "Invalid Reference",
        message: "The referenced record does not exist",
        code: "INVALID_REFERENCE",
        statusCode: 400
      };
    case "P2014":
      return {
        success: false,
        error: "Invalid Data",
        message: "Missing required relationship",
        code: "MISSING_RELATION",
        statusCode: 400
      };
    default:
      return {
        success: false,
        error: "Database Error",
        message: "An error occurred while accessing the database",
        code: error.code,
        statusCode: 500
      };
  }
}
function handlePrismaClientError(error) {
  return {
    success: false,
    error: "Service Unavailable",
    message: "Database connection failed",
    code: "DB_UNAVAILABLE",
    statusCode: 503
  };
}
function handleValidationError(message, details) {
  return {
    success: false,
    error: "Validation Error",
    message,
    details,
    code: "VALIDATION_ERROR",
    statusCode: 400
  };
}
function handleAuthError(message = "Unauthorized") {
  return {
    success: false,
    error: "Authentication Failed",
    message,
    code: "AUTH_ERROR",
    statusCode: 401
  };
}
function handleForbiddenError(message = "Forbidden") {
  return {
    success: false,
    error: "Access Denied",
    message,
    code: "FORBIDDEN",
    statusCode: 403
  };
}
function handleUnknownError(error) {
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
    const customStatusCode = error.statusCode;
    const statusCode = customStatusCode && customStatusCode >= 400 && customStatusCode < 600 ? customStatusCode : 500;
    let errorType = "Application Error";
    if (statusCode === 401) {
      errorType = "Unauthorized";
    } else if (statusCode === 403) {
      errorType = "Forbidden";
    } else if (statusCode === 404) {
      errorType = "Not Found";
    } else if (statusCode === 409) {
      errorType = "Conflict";
    } else if (statusCode >= 500) {
      errorType = "Server Error";
    }
    return {
      success: false,
      error: errorType,
      message: error.message,
      code: "APPLICATION_ERROR",
      statusCode
    };
  }
  return {
    success: false,
    error: "Internal Server Error",
    message: "An unexpected error occurred",
    code: "UNKNOWN_ERROR",
    statusCode: 500
  };
}
function sendErrorResponse(c, apiError) {
  return c.json(apiError, apiError.statusCode);
}
export {
  handleAuthError,
  handleForbiddenError,
  handlePrismaClientError,
  handlePrismaError,
  handleUnknownError,
  handleValidationError,
  handleZodError,
  sendErrorResponse
};
