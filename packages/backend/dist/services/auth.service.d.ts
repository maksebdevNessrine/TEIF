/**
 * Hash a password using bcrypt with 10 salt rounds
 */
export declare function hashPassword(password: string): Promise<string>;
/**
 * Compare a plain password with a hashed password
 */
export declare function comparePassword(password: string, hash: string): Promise<boolean>;
/**
 * Generate a JWT access token with user payload (short-lived)
 */
export declare function generateAccessToken(userId: string, email: string): string;
/**
 * Generate a JWT refresh token (long-lived)
 */
export declare function generateRefreshTokenJwt(userId: string): string;
/**
 * Verify and decode a JWT token
 */
export declare function verifyToken(token: string): {
    userId: string;
    email?: string;
    type: string;
};
/**
 * Store refresh token in database with hash
 */
export declare function storeRefreshToken(userId: string, token: string): Promise<string>;
/**
 * Validate a refresh token from the database
 */
export declare function validateRefreshToken(userId: string, token: string): Promise<boolean>;
/**
 * Rotate a refresh token (revoke old, issue new)
 */
export declare function rotateRefreshToken(userId: string, oldToken: string): Promise<string>;
/**
 * Supabase Auth: Sign up new user
 */
export declare function signUpWithSupabase(email: string, password: string, name: string): Promise<any>;
/**
 * Supabase Auth: Sign in with email and password
 */
export declare function signInWithSupabase(email: string, password: string): Promise<{
    user: any;
    accessToken: any;
    refreshToken: any;
    expiresIn: any;
}>;
/**
 * Supabase Auth: Sign out
 */
export declare function signOutWithSupabase(accessToken: string): Promise<void>;
/**
 * Create a new user in the database (Custom JWT fallback)
 */
export declare function createUser(name: string, email: string, password: string): Promise<any>;
/**
 * Find a user by email (includes passwordHash for login verification)
 */
export declare function findUserByEmail(email: string): Promise<any>;
/**
 * Find a user by ID (excludes passwordHash)
 */
export declare function findUserById(id: string): Promise<any>;
/**
 * Login user with email and password (local authentication)
 */
export declare function loginUser(email: string, password: string): Promise<{
    id: any;
    email: any;
    name: any;
}>;
/**
 * Generate a 6-digit verification code
 */
export declare function generateVerificationCode(): string;
/**
 * Send verification code to user's email via OVH SMTP
 */
export declare function sendVerificationEmail(email: string, code: string, name: string): Promise<boolean>;
/**
 * Create user with verification code and send email
 */
export declare function createUserWithVerification(name: string, email: string, password: string): Promise<any>;
/**
 * Verify email with code
 */
export declare function verifyEmailCode(email: string, code: string): Promise<any>;
/**
 * Resend verification code
 */
export declare function resendVerificationCode(email: string): Promise<{
    message: string;
    email: string;
}>;
