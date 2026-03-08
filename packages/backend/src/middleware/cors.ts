import { cors } from 'hono/cors';

const isDevelopment = process.env.NODE_ENV === 'development';

/**
 * CORS configuration
 * In development: Allow common localhost ports (5173-5180 range) and explicit FRONTEND_URL
 * In production: Only allow FRONTEND_URL
 */
export const corsMiddleware = cors({
  origin: isDevelopment
    ? [
        process.env.FRONTEND_URL || 'http://localhost:5175',
        'http://localhost:5173',
        'http://localhost:5174',
        'http://localhost:5175',
        'http://localhost:5176',
        'http://localhost:5177',
        'http://localhost:5178',
        'http://localhost:5179',
        'http://localhost:5180',
        'http://localhost:3000',
      ]
    : (process.env.FRONTEND_URL || 'http://localhost:5175'),
  credentials: true,
  allowMethods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS', 'PATCH'],
  allowHeaders: ['Content-Type', 'Authorization'],
  exposeHeaders: ['Content-Length', 'X-Request-Id'],
  maxAge: 86400, // 24 hours
});
