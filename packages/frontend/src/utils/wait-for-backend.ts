/**
 * Wait for backend to be ready
 * Retries until the /api/health endpoint responds
 */
export async function waitForBackend(maxRetries = 60, delayMs = 500): Promise<void> {
  const apiBaseUrl = import.meta.env.VITE_API_BASE_URL || 'http://localhost:3000/api';
  const healthUrl = apiBaseUrl.replace(/\/api\/?$/, '') + '/api/health';
  
  for (let attempt = 1; attempt <= maxRetries; attempt++) {
    try {
      const response = await fetch(healthUrl, {
        method: 'GET',
        headers: { 'Content-Type': 'application/json' },
        mode: 'cors',
        cache: 'no-cache',
      });

      if (response.ok) {
        console.log(`✅ Backend is ready (attempt ${attempt}/${maxRetries})`);
        // Give it a tiny bit more time to be fully stable
        await new Promise((resolve) => setTimeout(resolve, 500));
        return;
      }
    } catch (error) {
      // Backend not ready yet
      if (attempt % 5 === 0 || attempt === 1) {
        console.log(`⏳ Waiting for backend... (${attempt}/${maxRetries})`);
      }

      if (attempt === maxRetries) {
        console.error('❌ Backend is not responding after ' + maxRetries + ' attempts');
        console.error('Make sure the backend is running:');
        console.error('  cd packages/backend && pnpm dev');
        // Don't throw - let app try to start anyway
        return;
      }

      await new Promise((resolve) => setTimeout(resolve, delayMs));
    }
  }
}
