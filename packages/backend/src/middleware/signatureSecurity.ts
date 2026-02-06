import { Context, Next } from 'hono';
import { isProduction, isSignatureHttpsRequired } from '../config/env';

/**
 * Security headers middleware for signature endpoints
 * Enforces HTTPS, prevents caching, and adds OWASP security headers
 */
export const signatureSecurityHeaders = async (c: Context, next: Next) => {
  // HTTPS enforcement in production
  if (isProduction() && isSignatureHttpsRequired()) {
    const protocol = c.req.header('x-forwarded-proto') || 'http';
    if (protocol !== 'https') {
      return c.json(
        {
          success: false,
          error: 'HTTPS required for signature operations',
          code: 'HTTPS_REQUIRED',
        },
        { status: 403 }
      );
    }
  }

  // Prevent caching of sensitive signature operations
  c.header('Cache-Control', 'no-store, no-cache, must-revalidate, proxy-revalidate');
  c.header('Pragma', 'no-cache');
  c.header('Expires', '0');

  // HSTS (HTTP Strict-Transport-Security) - force HTTPS for 1 year
  if (isProduction()) {
    c.header('Strict-Transport-Security', 'max-age=31536000; includeSubDomains');
  }

  // Prevent clickjacking
  c.header('X-Frame-Options', 'DENY');

  // Prevent MIME type sniffing
  c.header('X-Content-Type-Options', 'nosniff');

  // Enable XSS protection in browsers
  c.header('X-XSS-Protection', '1; mode=block');

  // Content Security Policy - restrict to same origin for forms
  c.header(
    'Content-Security-Policy',
    "default-src 'self'; script-src 'self'; style-src 'self' 'unsafe-inline'; form-action 'self'"
  );

  // Prevent referrer leakage
  c.header('Referrer-Policy', 'strict-origin-when-cross-origin');

  // Require secure cookies
  if (c.req.header('cookie')) {
    c.header('Set-Cookie', 'SameSite=Strict; Secure; HttpOnly');
  }

  await next();
};

/**
 * IP address extraction middleware
 * Extracts client IP from headers (handles proxies/load balancers)
 */
export const getClientIpAddress = (c: Context): string => {
  const xForwardedFor = c.req.header('x-forwarded-for');
  if (xForwardedFor) {
    return xForwardedFor.split(',')[0].trim();
  }

  const cfConnectingIp = c.req.header('cf-connecting-ip');
  if (cfConnectingIp) {
    return cfConnectingIp;
  }

  const xRealIp = c.req.header('x-real-ip');
  if (xRealIp) {
    return xRealIp;
  }

  // Fallback - this won't work with Hono's native request
  return 'unknown';
};

/**
 * Audit logging middleware for signature endpoints
 * Logs all requests with IP, user agent, and timestamp
 */
export const signatureAuditLog = async (c: Context, next: Next) => {
  const startTime = Date.now();
  const method = c.req.method;
  const path = c.req.path;
  const ipAddress = getClientIpAddress(c);
  const userAgent = c.req.header('user-agent') || 'unknown';

  // Log request
  console.log(`[SIGNATURE_AUDIT] ${method} ${path} from ${ipAddress} at ${new Date().toISOString()}`);

  await next();

  // Log response
  const duration = Date.now() - startTime;
  const status = c.res.status;
  console.log(`[SIGNATURE_AUDIT] Response: ${status} (${duration}ms)`);
};
