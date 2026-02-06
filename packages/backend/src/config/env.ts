import { z } from 'zod';

/**
 * Environment variable validation schema
 * Ensures all required config is present and valid at startup
 */
const envSchema = z.object({
  // Database
  DATABASE_URL: z.string().url('DATABASE_URL must be a valid connection string'),

  // JWT
  JWT_SECRET: z.string().min(32, 'JWT_SECRET must be at least 32 characters'),
  JWT_REFRESH_SECRET: z.string().min(32, 'JWT_REFRESH_SECRET must be at least 32 characters'),
  JWT_EXPIRES_IN: z.string().default('7d'),

  // Server
  PORT: z.coerce.number().default(3000),
  NODE_ENV: z.enum(['development', 'production', 'test']).default('development'),

  // CORS
  FRONTEND_URL: z.string().url('FRONTEND_URL must be a valid URL'),

  // Digital Signature (Tunisia TradeNet)
  SIGNATURE_ENCRYPTION_KEY: z
    .string()
    .regex(/^[0-9a-f]{64}$/, 'SIGNATURE_ENCRYPTION_KEY must be 64 hex characters (32 bytes)'),

  // Signature Security
  SIGNATURE_REQUIRE_HTTPS: z
    .enum(['true', 'false'])
    .transform((v) => v === 'true')
    .default('false'),

  SIGNATURE_MAX_CERTIFICATE_SIZE: z.coerce.number().default(10485760), // 10MB

  // Audit Logging
  AUDIT_LOG_RETENTION_DAYS: z.coerce.number().default(90),

  // Optional: Supabase
  SUPABASE_URL: z.string().url().optional(),
  SUPABASE_ANON_KEY: z.string().optional(),
  SUPABASE_SERVICE_ROLE_KEY: z.string().optional(),
  SUPABASE_STORAGE_BUCKET: z.string().optional(),
});

export type EnvConfig = z.infer<typeof envSchema>;

let validatedConfig: EnvConfig | null = null;

/**
 * Validate and cache environment variables
 * Throws on first call if validation fails
 */
export function validateEnv(): EnvConfig {
  if (validatedConfig) {
    return validatedConfig;
  }

  try {
    validatedConfig = envSchema.parse(process.env);
    return validatedConfig;
  } catch (error) {
    if (error instanceof z.ZodError) {
      const issues = error.issues.map((issue) => `  ${issue.path.join('.')}: ${issue.message}`).join('\n');
      throw new Error(`Environment validation failed:\n${issues}`);
    }
    throw error;
  }
}

/**
 * Get validated config (must call validateEnv() first)
 */
export function getConfig(): EnvConfig {
  if (!validatedConfig) {
    throw new Error('Environment not validated. Call validateEnv() first.');
  }
  return validatedConfig;
}

/**
 * Check if running in production
 */
export function isProduction(): boolean {
  return getConfig().NODE_ENV === 'production';
}

/**
 * Check if HTTPS is required for signature operations
 */
export function isSignatureHttpsRequired(): boolean {
  return getConfig().SIGNATURE_REQUIRE_HTTPS;
}

/**
 * Get encryption key as Buffer (for crypto operations)
 */
export function getSignatureEncryptionKey(): Buffer {
  const hexKey = getConfig().SIGNATURE_ENCRYPTION_KEY;
  return Buffer.from(hexKey, 'hex');
}

/**
 * Verify signature endpoint security requirements for production
 * Warn if HTTPS not enforced or other issues detected
 */
export function checkSignatureSecurityRequirements(): {
  warnings: string[];
  errors: string[];
} {
  const warnings: string[] = [];
  const errors: string[] = [];

  const config = getConfig();

  if (config.NODE_ENV === 'production') {
    if (!config.SIGNATURE_REQUIRE_HTTPS) {
      errors.push('SIGNATURE_REQUIRE_HTTPS must be "true" in production');
    }

    if (config.SIGNATURE_ENCRYPTION_KEY === process.env.SIGNATURE_ENCRYPTION_KEY?.trim() && 
        process.env.SIGNATURE_ENCRYPTION_KEY?.includes('0123456789')) {
      errors.push('SIGNATURE_ENCRYPTION_KEY appears to be using default/placeholder value');
    }

    if (!config.SUPABASE_SERVICE_ROLE_KEY) {
      warnings.push('SUPABASE_SERVICE_ROLE_KEY not configured; certificate backups will not be available');
    }
  }

  if (config.NODE_ENV === 'development') {
    if (config.SIGNATURE_REQUIRE_HTTPS) {
      warnings.push('SIGNATURE_REQUIRE_HTTPS is "true" in development; local testing may require HTTP');
    }
  }

  return { warnings, errors };
}
