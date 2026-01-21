import path from 'path';
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig(({ mode }) => {
    // Get API URL from environment variable (passed during build)
    const apiBaseUrl = process.env.VITE_API_BASE_URL || 'http://localhost:3000/api';
    
    return {
      build: {
        outDir: 'dist',
        emptyOutDir: true
      },
      server: {
        port: 5173,
        host: '0.0.0.0',
        proxy: {
          '/api': {
            target: apiBaseUrl.replace(/\/api\/?$/, ''),
            changeOrigin: true,
            rewrite: (path) => path.replace(/^\/api/, '/api'),
          },
        },
      },
      plugins: [react()],
      define: {
        'import.meta.env.VITE_API_BASE_URL': JSON.stringify(apiBaseUrl),
        'process.env.API_KEY': JSON.stringify(process.env.GEMINI_API_KEY || ''),
        'process.env.GEMINI_API_KEY': JSON.stringify(process.env.GEMINI_API_KEY || '')
      },
      resolve: {
        alias: {
          '@': path.resolve(__dirname, './src'),
          '@teif/shared': path.resolve(__dirname, '../shared/src'),
        }
      }
    };
});
