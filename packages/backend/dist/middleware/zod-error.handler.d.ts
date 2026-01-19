/**
 * Global Zod Error Handler Middleware
 * Catches Zod validation errors from @hono/zod-validator
 * Transforms them into user-friendly API responses
 */
import type { Context, Next } from 'hono';
export declare function zodErrorHandler(c: Context, next: Next): Promise<(Response & import("hono").TypedResponse<{
    success: false;
    error: string;
    details: {
        field: string;
        message: string;
        code: "invalid_type" | "invalid_literal" | "unrecognized_keys" | "invalid_union" | "invalid_union_discriminator" | "invalid_enum_value" | "invalid_arguments" | "invalid_return_type" | "invalid_date" | "invalid_string" | "too_small" | "too_big" | "invalid_intersection_types" | "not_multiple_of" | "not_finite" | "custom";
        type: "string" | "number" | "bigint" | "invalid_type" | "invalid_literal" | "unrecognized_keys" | "invalid_union" | "invalid_union_discriminator" | "invalid_enum_value" | "invalid_arguments" | "invalid_return_type" | "invalid_date" | "invalid_string" | "invalid_intersection_types" | "not_multiple_of" | "not_finite" | "custom" | "array" | "set" | "date";
    }[];
    count: number;
}, 400, "json">) | undefined>;
