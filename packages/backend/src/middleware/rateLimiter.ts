/**
 * Rate Limiting Middleware for Hono
 * Protects signature endpoints from abuse using in-memory store
 */

import type { Context, Next } from 'hono';

interface RateLimitConfig {
  windowMs: number; // Time window in milliseconds
  maxRequests: number; // Maximum requests per window
  message?: string; // Error message
}

interface RateLimitEntry {
  count: number;
  resetTime: number;
}

class RateLimiter {
  private store: Map<string, RateLimitEntry> = new Map();
  private config: RateLimitConfig;

  constructor(config: RateLimitConfig) {
    this.config = config;

    // Cleanup expired entries every 60 seconds
    setInterval(() => {
      const now = Date.now();
      for (const [key, entry] of this.store.entries()) {
        if (entry.resetTime < now) {
          this.store.delete(key);
        }
      }
    }, 60000);
  }

  /**
   * Get client IP from request
   */
  private getClientIp(c: Context): string {
    return (
      c.req.header('X-Forwarded-For')?.split(',')[0].trim() ||
      c.req.header('CF-Connecting-IP') ||
      c.req.header('X-Real-IP') ||
      'unknown'
    );
  }

  /**
   * Create rate limit middleware
   */
  middleware() {
    return async (c: Context, next: Next) => {
      const clientIp = this.getClientIp(c);
      const key = `${clientIp}:${c.req.path}`;
      const now = Date.now();

      // Get or create entry
      let entry = this.store.get(key);

      if (!entry || entry.resetTime < now) {
        // Create new entry
        entry = {
          count: 1,
          resetTime: now + this.config.windowMs,
        };
        this.store.set(key, entry);
      } else {
        // Increment count
        entry.count++;
      }

      // Add rate limit headers
      const remaining = Math.max(0, this.config.maxRequests - entry.count);
      const resetTime = Math.ceil(entry.resetTime / 1000);

      c.header('X-RateLimit-Limit', this.config.maxRequests.toString());
      c.header('X-RateLimit-Remaining', remaining.toString());
      c.header('X-RateLimit-Reset', resetTime.toString());

      // Check if limit exceeded
      if (entry.count > this.config.maxRequests) {
        return c.json(
          {
            success: false,
            error: this.config.message || 'Too many requests',
            code: 'RATE_LIMIT_EXCEEDED',
            retryAfter: Math.ceil((entry.resetTime - now) / 1000),
          }
        );
      }

      await next();
    };
  }
}

/**
 * Create signing rate limiter (10 req/min)
 */
export const createSigningLimiter = () => {
  return new RateLimiter({
    windowMs: 60 * 1000, // 1 minute
    maxRequests: 10,
    message: 'Too many signing attempts. Try again in 1 minute.',
  }).middleware();
};

/**
 * Create certificate upload limiter (5 per hour)
 */
export const createCertificateUploadLimiter = () => {
  return new RateLimiter({
    windowMs: 60 * 60 * 1000, // 1 hour
    maxRequests: 5,
    message: 'Too many certificate uploads. Try again in 1 hour.',
  }).middleware();
};

/**
 * Create general API limiter (100 per 15 min)
 */
export const createApiLimiter = () => {
  return new RateLimiter({
    windowMs: 15 * 60 * 1000, // 15 minutes
    maxRequests: 100,
    message: 'Too many requests. Try again later.',
  }).middleware();
};
