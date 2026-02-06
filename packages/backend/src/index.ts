import 'dotenv/config';
import { Hono } from 'hono';
import { serve } from '@hono/node-server';
import { logger } from 'hono/logger';
import { ZodError } from 'zod';
import { Prisma } from '@prisma/client';
import { corsMiddleware } from './middleware/cors';
import { signatureSecurityHeaders, signatureAuditLog } from './middleware/signatureSecurity';
import { connectDatabase, disconnectDatabase } from './lib/prisma';
import { validateEnv, checkSignatureSecurityRequirements } from './config/env';
import { handleZodError, handlePrismaError, handlePrismaClientError, handleUnknownError, sendErrorResponse } from './utils/error-handler';
import authRoutes from './routes/auth';
import invoiceRoutes from './routes/invoices';
import signatureRoutes from './routes/signature';

// Validate environment variables at startup
try {
  validateEnv();
  console.log('✅ Environment variables validated');
  
  // Check signature security requirements
  const { warnings, errors: securityErrors } = checkSignatureSecurityRequirements();
  
  if (securityErrors.length > 0) {
    console.error('❌ Signature security requirements not met:');
    securityErrors.forEach(err => console.error(`   - ${err}`));
    process.exit(1);
  }
  
  if (warnings.length > 0) {
    console.warn('⚠️ Signature security warnings:');
    warnings.forEach(warn => console.warn(`   - ${warn}`));
  }
} catch (error) {
  console.error('❌ Environment validation failed:', error instanceof Error ? error.message : error);
  process.exit(1);
}

const app = new Hono();

// Global middleware
app.use('*', logger());
app.use('*', corsMiddleware);

// Health check endpoint
app.get('/api/health', (c) => {
  return c.json({ 
    status: 'ok',
    timestamp: new Date().toISOString(),
    environment: process.env.NODE_ENV || 'development'
  });
});

// Root endpoint
app.get('/', (c) => {
  return c.json({ 
    message: 'TEIF Backend API',
    version: '1.0.0',
    endpoints: {
      health: '/api/health',
      auth: {
        register: 'POST /api/auth/register',
        login: 'POST /api/auth/login',
        logout: 'POST /api/auth/logout',
        me: 'GET /api/auth/me'
      },
      invoices: {
        create: 'POST /api/invoices',
        list: 'GET /api/invoices',
        get: 'GET /api/invoices/:id',
        update: 'PUT /api/invoices/:id',
        delete: 'DELETE /api/invoices/:id'
      }
    }
  });
});

// Mount authentication routes
app.route('/api/auth', authRoutes);

// Mount invoice routes
app.route('/api/invoices', invoiceRoutes);

// Mount signature routes with security headers and audit logging
app.use('/api/signature/*', signatureSecurityHeaders);
app.use('/api/signature/*', signatureAuditLog);
app.route('/api/signature', signatureRoutes);

// 404 handler
app.notFound((c) => {
  return c.json({ error: 'Not Found', path: c.req.path }, 404);
});

// Global Error Handler
app.onError((err, c) => {
  // Handle Zod validation errors
  if (err instanceof ZodError) {
    const apiError = handleZodError(err);
    return sendErrorResponse(c, apiError);
  }

  // Handle Prisma known request errors
  if (err instanceof Prisma.PrismaClientKnownRequestError) {
    const apiError = handlePrismaError(err);
    return sendErrorResponse(c, apiError);
  }

  // Handle Prisma initialization errors
  if (err instanceof Prisma.PrismaClientInitializationError) {
    const apiError = handlePrismaClientError(err);
    return sendErrorResponse(c, apiError);
  }

  // Handle all other errors
  const apiError = handleUnknownError(err);
  
  // Log server errors
  if (apiError.statusCode >= 500) {
    console.error('Server Error:', err);
  }
  
  return sendErrorResponse(c, apiError);
});

// Start server
const port = Number(process.env.PORT) || 3000;

async function startServer() {
  try {
    // Start HTTP server immediately (don't wait for DB)
    console.log(`🚀 Server starting on 0.0.0.0:${port}...`);
    
    // Connect to database in background with retry
    connectDatabase()
      .catch(err => {
        console.warn('⚠️ Initial database connection failed, will retry:', err.message);
        // Retry every 5 seconds
        setInterval(async () => {
          try {
            await connectDatabase();
            console.log('✅ Database connected');
          } catch (retryErr) {
            console.warn('Database retry failed:', (retryErr as Error).message);
          }
        }, 5000);
      });
    
    // serve() returns a promise that never resolves (keeps server alive)
    await serve({
      fetch: app.fetch,
      port,
      hostname: '0.0.0.0', // Bind to all interfaces, not just localhost
    }, () => {
      console.log(`✅ Server running at http://0.0.0.0:${port}`);
      console.log(`📝 API documentation: http://0.0.0.0:${port}/api/health`);
    });
  } catch (error) {
    console.error('Failed to start server:', error);
    process.exit(1);
  }
}

// Graceful shutdown
process.on('SIGINT', async () => {
  console.log('\n🛑 Shutting down gracefully...');
  await disconnectDatabase();
  process.exit(0);
});

// Handle unhandled rejections
process.on('unhandledRejection', (reason, promise) => {
  console.error('Unhandled Rejection at:', promise, 'reason:', reason);
});

// Handle uncaught exceptions  
process.on('uncaughtException', (error) => {
  console.error('Uncaught Exception:', error);
  // Don't exit - keep server running
});

process.on('SIGTERM', async () => {
  console.log('\n🛑 Shutting down gracefully...');
  await disconnectDatabase();
  process.exit(0);
});

startServer();

export default app;
export type AppType = typeof app;
