function successResponse(data, statusCode = 200) {
  return {
    status: statusCode >= 400 ? "error" : "success",
    data,
    statusCode
  };
}
function errorResponse(message, statusCode = 500, details) {
  return {
    status: "error",
    error: message,
    ...details && { details },
    statusCode
  };
}
function validationErrorResponse(zodError) {
  const errors = {};
  zodError.errors.forEach((error) => {
    const path = error.path.join(".");
    if (!errors[path]) {
      errors[path] = [];
    }
    errors[path].push(error.message);
  });
  return {
    status: "error",
    error: "Validation failed",
    details: errors,
    statusCode: 400
  };
}
export {
  errorResponse,
  successResponse,
  validationErrorResponse
};
