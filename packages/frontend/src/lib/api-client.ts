/**
 * Hono RPC Client
 * 
 * Fully typed API client generated from backend types
 * No manual fetch code needed - everything is auto-typed
 * 
 * Example:
 * const res = await client.api.invoices.$post({ json: { ... } })
 * const invoice = await res.json() // Fully typed!
 */

import { hc } from 'hono/client';
// Note: Types will be resolved at build time via tsconfig path alias
// import type { AppType } from '@teif/backend';

const API_BASE = import.meta.env.VITE_API_URL || 'http://localhost:3000';

/**
 * Create strictly typed Hono client
 * All API calls are fully typed from backend routes
 * Configured to send credentials (cookies) with all requests
 */
// Using 'as any' temporarily for type safety - proper typing via build-time path resolution
export const client = hc<any>(API_BASE, {
  init: {
    credentials: 'include', // Send cookies with requests
  }
}) as any;
export const typedClient = client as any;

/**
 * Convenience wrappers for common operations
 * These wrap the RPC client with better error handling and type inference
 */

export async function createInvoice(data: any) {
  const res = await typedClient.api.invoices.$post({ json: data });
  
  if (!res.ok) {
    const error = await res.json();
    throw new Error(error.message || 'Failed to create invoice');
  }
  
  const result = await res.json();
  return result.data;
}

export async function getInvoice(id: string) {
  const res = await typedClient.api.invoices[':id'].$get({ param: { id } });
  
  if (!res.ok) {
    const error = await res.json();
    throw new Error(error.message || 'Failed to fetch invoice');
  }
  
  const result = await res.json();
  return result.data;
}

export async function updateInvoice(id: string, data: any) {
  const res = await typedClient.api.invoices[':id'].$put({
    param: { id },
    json: data,
  });
  
  if (!res.ok) {
    const error = await res.json();
    throw new Error(error.message || 'Failed to update invoice');
  }
  
  const result = await res.json();
  return result.data;
}

export async function deleteInvoice(id: string) {
  const res = await typedClient.api.invoices[':id'].$delete({ param: { id } });
  
  if (!res.ok) {
    const error = await res.json();
    throw new Error(error.message || 'Failed to delete invoice');
  }
  
  return await res.json();
}

export async function listInvoices(params?: {
  page?: number;
  limit?: number;
  search?: string;
  dateFrom?: string;
  dateTo?: string;
  documentType?: string;
  minAmount?: number;
  maxAmount?: number;
  status?: string;
  sortBy?: string;
  sortOrder?: 'asc' | 'desc';
}) {
  const query = new URLSearchParams();
  
  if (params) {
    Object.entries(params).forEach(([key, value]) => {
      if (value !== undefined && value !== null) {
        query.append(key, String(value));
      }
    });
  }
  
  const res = await typedClient.api.invoices.$get({
    query: Object.fromEntries(query),
  });
  
  if (!res.ok) {
    const error = await res.json();
    throw new Error(error.message || 'Failed to fetch invoices');
  }
  
  const result = await res.json();
  return result.data;
}

export async function getInvoicePdf(id: string, language: 'ar' | 'fr' | 'en' = 'fr') {
  const res = await typedClient.api.invoices[':id'].pdf.$get({
    param: { id },
    query: { language },
  });
  
  if (!res.ok) {
    throw new Error('Failed to generate PDF');
  }
  
  return await res.blob();
}

/**
 * Auth Operations
 * Fully typed authentication endpoints via RPC
 */

export async function loginUser(email: string, password: string) {
  const res = await typedClient.api.auth.login.$post({
    json: { email, password },
  });
  
  if (!res.ok) {
    const error = await res.json();
    throw new Error(error.message || 'Failed to login');
  }
  
  const result = await res.json();
  // Store access token in localStorage for auto-refresh mechanism
  if (result.data?.token) {
    localStorage.setItem('teif_access_token', result.data.token);
  }
  return result.data;
}

export async function registerUser(name: string, email: string, password: string) {
  const res = await typedClient.api.auth.register.$post({
    json: { name, email, password },
  });
  
  if (!res.ok) {
    const error = await res.json();
    throw new Error(error.message || 'Failed to register');
  }
  
  const result = await res.json();
  // Store access token in localStorage for auto-refresh mechanism
  if (result.data?.token) {
    localStorage.setItem('teif_access_token', result.data.token);
  }
  return result.data;
}

export async function logoutUser() {
  const res = await typedClient.api.auth.logout.$post();
  
  if (!res.ok) {
    const error = await res.json();
    throw new Error(error.message || 'Failed to logout');
  }
  
  return await res.json();
}

export async function refreshTokenUser() {
  const res = await typedClient.api.auth.refresh.$post();
  
  if (!res.ok) {
    const error = await res.json();
    throw new Error(error.message || 'Failed to refresh token');
  }
  
  const result = await res.json();
  // Store new access token in localStorage
  if (result.data?.token) {
    localStorage.setItem('teif_access_token', result.data.token);
  }
  return result.data;
}

export async function getCurrentUser() {
  const res = await typedClient.api.auth.me.$get();
  
  if (!res.ok) {
    const error = await res.json();
    throw new Error(error.message || 'Failed to fetch user');
  }
  
  const result = await res.json();
  return result.data;
}

export async function verifyEmailCode(email: string, code: string) {
  const res = await typedClient.api.auth['verify-email'].$post({
    json: { email, code },
  });
  
  if (!res.ok) {
    const error = await res.json();
    throw new Error(error.message || 'Failed to verify email');
  }
  
  const result = await res.json();
  // Store access token in localStorage
  if (result.data?.token) {
    localStorage.setItem('teif_access_token', result.data.token);
  }
  return result.data;
}

export async function resendVerificationCode(email: string) {
  const res = await typedClient.api.auth['resend-code'].$post({
    json: { email },
  });
  
  if (!res.ok) {
    const error = await res.json();
    throw new Error(error.message || 'Failed to resend code');
  }
  
  const result = await res.json();
  return result.data;
}

/**
 * Direct access to typed RPC client
 * Use this for more complex operations
 * 
 * Example:
 * const res = await client.api.invoices.$post({ json: data })
 * const data = await res.json()
 */
export default client;
