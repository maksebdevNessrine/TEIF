import { z } from "zod";
import { validationErrorResponse, errorResponse } from "../utils/response.js";
async function errorMiddleware(c, next) {
  try {
    await next();
  } catch (error) {
    console.error("Error:", error);
    if (error instanceof z.ZodError) {
      const response = validationErrorResponse(error);
      return c.json(response, 400);
    }
    if (error instanceof Error && error.statusCode) {
      const response = errorResponse(error.message, error.statusCode);
      return c.json(response, error.statusCode);
    }
    if (error instanceof Error && error.message.includes("Token")) {
      return c.json(
        errorResponse(error.message, 401),
        401
      );
    }
    if (error instanceof Error) {
      if (error.code === "P2002") {
        return c.json(
          errorResponse("Email already exists", 409),
          409
        );
      }
      if (error.code === "P2025") {
        return c.json(
          errorResponse("Resource not found", 404),
          404
        );
      }
      const message = process.env.NODE_ENV === "production" ? "Internal server error" : error.message;
      return c.json(
        errorResponse(message, 500),
        500
      );
    }
    return c.json(
      errorResponse("Internal server error", 500),
      500
    );
  }
}
export {
  errorMiddleware
};

