import { Hono } from 'hono';
import { serve } from '@hono/node-server';
import { logger } from 'hono/logger';
import { ZodError } from 'zod';
import { Prisma } from '@prisma/client';
import { corsMiddleware } from './middleware/cors';
import { connectDatabase, disconnectDatabase } from './lib/prisma';
import { handleZodError, handlePrismaError, handlePrismaClientError, handleUnknownError, sendErrorResponse } from './utils/error-handler';
import authRoutes from './routes/auth';
import invoiceRoutes from './routes/invoices';

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
    // Connect to database
    await connectDatabase();
    
    // Start HTTP server
    console.log(`🚀 Server starting on port ${port}...`);
    serve({
      fetch: app.fetch,
      port,
    });
    
    console.log(`✅ Server running at http://localhost:${port}`);
    console.log(`📝 API documentation: http://localhost:${port}/api/health`);
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

process.on('SIGTERM', async () => {
  console.log('\n🛑 Shutting down gracefully...');
  await disconnectDatabase();
  process.exit(0);
});

startServer();

export default app;
export type AppType = typeof app;
