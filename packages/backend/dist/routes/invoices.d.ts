/**
 * Invoice Routes - Using Hono RPC + Auto-Generated Zod Schemas
 *
 * This router demonstrates the new architecture:
 * 1. Auto-generated Zod schemas from Prisma
 * 2. Hono Zod Validator middleware for validation
 * 3. Global error handling (no try-catch needed)
 * 4. Fully typed RPC for frontend
 */
import { Hono } from 'hono';
declare const invoiceRoutes: Hono<import("hono/types").BlankEnv, import("hono/types").BlankSchema, "/">;
export default invoiceRoutes;
