"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const hono_1 = require("hono");
const node_server_1 = require("@hono/node-server");
const logger_1 = require("hono/logger");
const zod_1 = require("zod");
const client_1 = require("@prisma/client");
const cors_1 = require("./middleware/cors");
const prisma_1 = require("./lib/prisma");
const error_handler_1 = require("./utils/error-handler");
const auth_1 = __importDefault(require("./routes/auth"));
const invoices_1 = __importDefault(require("./routes/invoices"));
const app = new hono_1.Hono();
// Global middleware
app.use('*', (0, logger_1.logger)());
app.use('*', cors_1.corsMiddleware);
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
app.route('/api/auth', auth_1.default);
// Mount invoice routes
app.route('/api/invoices', invoices_1.default);
// 404 handler
app.notFound((c) => {
    return c.json({ error: 'Not Found', path: c.req.path }, 404);
});
// Global Error Handler
app.onError((err, c) => {
    // Handle Zod validation errors
    if (err instanceof zod_1.ZodError) {
        const apiError = (0, error_handler_1.handleZodError)(err);
        return (0, error_handler_1.sendErrorResponse)(c, apiError);
    }
    // Handle Prisma known request errors
    if (err instanceof client_1.Prisma.PrismaClientKnownRequestError) {
        const apiError = (0, error_handler_1.handlePrismaError)(err);
        return (0, error_handler_1.sendErrorResponse)(c, apiError);
    }
    // Handle Prisma initialization errors
    if (err instanceof client_1.Prisma.PrismaClientInitializationError) {
        const apiError = (0, error_handler_1.handlePrismaClientError)(err);
        return (0, error_handler_1.sendErrorResponse)(c, apiError);
    }
    // Handle all other errors
    const apiError = (0, error_handler_1.handleUnknownError)(err);
    // Log server errors
    if (apiError.statusCode >= 500) {
        console.error('Server Error:', err);
    }
    return (0, error_handler_1.sendErrorResponse)(c, apiError);
});
// Start server
const port = Number(process.env.PORT) || 3000;
async function startServer() {
    try {
        // Connect to database
        await (0, prisma_1.connectDatabase)();
        // Start HTTP server
        console.log(`🚀 Server starting on 0.0.0.0:${port}...`);
        // serve() returns a promise that never resolves (keeps server alive)
        await (0, node_server_1.serve)({
            fetch: app.fetch,
            port,
            hostname: '0.0.0.0', // Bind to all interfaces, not just localhost
        }, () => {
            console.log(`✅ Server running at http://0.0.0.0:${port}`);
            console.log(`📝 API documentation: http://0.0.0.0:${port}/api/health`);
        });
    }
    catch (error) {
        console.error('Failed to start server:', error);
        process.exit(1);
    }
}
// Graceful shutdown
process.on('SIGINT', async () => {
    console.log('\n🛑 Shutting down gracefully...');
    await (0, prisma_1.disconnectDatabase)();
    process.exit(0);
});
process.on('SIGTERM', async () => {
    console.log('\n🛑 Shutting down gracefully...');
    await (0, prisma_1.disconnectDatabase)();
    process.exit(0);
});
startServer();
exports.default = app;
