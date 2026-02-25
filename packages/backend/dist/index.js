import "dotenv/config";
import { Hono } from "hono";
import { serve } from "@hono/node-server";
import { logger } from "hono/logger";
import { ZodError } from "zod";
import { Prisma } from "@prisma/client";
import { corsMiddleware } from "./middleware/cors.js";
import { signatureSecurityHeaders, signatureAuditLog } from "./middleware/signatureSecurity.js";
import { connectDatabase, disconnectDatabase } from "./lib/prisma.js";
import { validateEnv, checkSignatureSecurityRequirements } from "./config/env.js";
import { handleZodError, handlePrismaError, handlePrismaClientError, handleUnknownError, sendErrorResponse } from "./utils/error-handler.js";
import authRoutes from "./routes/auth.js";
import invoiceRoutes from "./routes/invoices.js";
import signatureRoutes from "./routes/signature.js";
try {
  validateEnv();
  console.log("\u2705 Environment variables validated");
  const { warnings, errors: securityErrors } = checkSignatureSecurityRequirements();
  if (securityErrors.length > 0) {
    console.error("\u274C Signature security requirements not met:");
    securityErrors.forEach((err) => console.error(`   - ${err}`));
    process.exit(1);
  }
  if (warnings.length > 0) {
    console.warn("\u26A0\uFE0F Signature security warnings:");
    warnings.forEach((warn) => console.warn(`   - ${warn}`));
  }
} catch (error) {
  console.error("\u274C Environment validation failed:", error instanceof Error ? error.message : error);
  process.exit(1);
}
const app = new Hono();
app.use("*", logger());
app.use("*", corsMiddleware);
app.get("/api/health", (c) => {
  return c.json({
    status: "ok",
    timestamp: (/* @__PURE__ */ new Date()).toISOString(),
    environment: process.env.NODE_ENV || "development"
  });
});
app.get("/", (c) => {
  return c.json({
    message: "TEIF Backend API",
    version: "1.0.0",
    endpoints: {
      health: "/api/health",
      auth: {
        register: "POST /api/auth/register",
        login: "POST /api/auth/login",
        logout: "POST /api/auth/logout",
        me: "GET /api/auth/me"
      },
      invoices: {
        create: "POST /api/invoices",
        list: "GET /api/invoices",
        get: "GET /api/invoices/:id",
        update: "PUT /api/invoices/:id",
        delete: "DELETE /api/invoices/:id"
      }
    }
  });
});
app.route("/api/auth", authRoutes);
app.route("/api/invoices", invoiceRoutes);
app.use("/api/signature/*", signatureSecurityHeaders);
app.use("/api/signature/*", signatureAuditLog);
app.route("/api/signature", signatureRoutes);
app.notFound((c) => {
  return c.json({ error: "Not Found", path: c.req.path }, 404);
});
app.onError((err, c) => {
  if (err instanceof ZodError) {
    const apiError2 = handleZodError(err);
    return sendErrorResponse(c, apiError2);
  }
  if (err instanceof Prisma.PrismaClientKnownRequestError) {
    const apiError2 = handlePrismaError(err);
    return sendErrorResponse(c, apiError2);
  }
  if (err instanceof Prisma.PrismaClientInitializationError) {
    const apiError2 = handlePrismaClientError(err);
    return sendErrorResponse(c, apiError2);
  }
  const apiError = handleUnknownError(err);
  if (apiError.statusCode >= 500) {
    console.error("Server Error:", err);
  }
  return sendErrorResponse(c, apiError);
});
const port = Number(process.env.PORT) || 3e3;
async function startServer() {
  try {
    console.log(`\u{1F680} Server starting on 0.0.0.0:${port}...`);
    connectDatabase().catch((err) => {
      console.warn("\u26A0\uFE0F Initial database connection failed, will retry:", err.message);
      setInterval(async () => {
        try {
          await connectDatabase();
          console.log("\u2705 Database connected");
        } catch (retryErr) {
          console.warn("Database retry failed:", retryErr.message);
        }
      }, 5e3);
    });
    await serve({
      fetch: app.fetch,
      port,
      hostname: "0.0.0.0"
      // Bind to all interfaces, not just localhost
    }, () => {
      console.log(`\u2705 Server running at http://0.0.0.0:${port}`);
      console.log(`\u{1F4DD} API documentation: http://0.0.0.0:${port}/api/health`);
    });
  } catch (error) {
    console.error("Failed to start server:", error);
    process.exit(1);
  }
}
process.on("SIGINT", async () => {
  console.log("\n\u{1F6D1} Shutting down gracefully...");
  await disconnectDatabase();
  process.exit(0);
});
process.on("unhandledRejection", (reason, promise) => {
  console.error("Unhandled Rejection at:", promise, "reason:", reason);
});
process.on("uncaughtException", (error) => {
  console.error("Uncaught Exception:", error);
});
process.on("SIGTERM", async () => {
  console.log("\n\u{1F6D1} Shutting down gracefully...");
  await disconnectDatabase();
  process.exit(0);
});
startServer();
var src_default = app;
export {
  src_default as default
};

