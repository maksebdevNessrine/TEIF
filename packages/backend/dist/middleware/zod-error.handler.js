import { ZodError } from "zod";
async function zodErrorHandler(c, next) {
  try {
    await next();
  } catch (error) {
    if (error instanceof ZodError) {
      const details = error.errors.map((err) => ({
        field: err.path.join("."),
        message: err.message,
        code: err.code,
        type: "type" in err ? err.type : err.code
      }));
      return c.json(
        {
          success: false,
          error: "Validation Failed",
          details,
          count: error.errors.length
        },
        400
      );
    }
    throw error;
  }
}
export {
  zodErrorHandler
};
