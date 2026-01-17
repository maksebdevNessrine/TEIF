/**
 * Frontend API Bridge - Type-Safe RPC Client
 * 
 * This module:
 * - Imports AppType from the Hono backend
 * - Creates a typed hc (Hono Client) instance
 * - Provides end-to-end type safety from frontend to backend
 * - Handles all API communication with full IntelliSense support
 */

import { hc } from "hono/client";
import type { AppType } from "../../server/src";

/**
 * Typed Hono Client
 * Connects to the local Hono RPC server
 * 
 * Usage in React components:
 * ```tsx
 * const { data } = await api.invoices.$get();
 * // data is fully typed from the backend!
 * ```
 */
export const api = hc<AppType>(
  import.meta.env.VITE_API_BASE_URL || "http://localhost:3000"
);

/**
 * Type-safe response wrapper
 * Handles both success and error responses consistently
 */
export interface ApiResponse<T = any> {
  data?: T;
  error?: string;
  message?: string;
  pagination?: {
    page: number;
    limit: number;
    total: number;
    pages: number;
  };
}

/**
 * Utility: Safely fetch with error handling
 * 
 * Usage:
 * ```tsx
 * const { data, error } = await apiCall(() => api.invoices.$get());
 * ```
 */
export async function apiCall<T>(
  fn: () => Promise<Response>,
  options?: { fallback?: T }
): Promise<ApiResponse<T>> {
  try {
    const response = await fn();

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      return {
        error: errorData.error || `HTTP ${response.status}`,
      };
    }

    const data = await response.json();
    return { data: data.data || data };
  } catch (error) {
    console.error("API call failed:", error);
    return {
      error: error instanceof Error ? error.message : "Unknown error",
      data: options?.fallback,
    };
  }
}

/**
 * Export client for use throughout the app
 * 
 * Type-safe methods are automatically available:
 * - api.users.$get()      // GET /api/users
 * - api.users.$post()     // POST /api/users
 * - api.invoices.$get()   // GET /api/invoices
 * - api.invoices.$post()  // POST /api/invoices
 * - etc.
 */
export default api;
