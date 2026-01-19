import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { prisma } from '../lib/prisma';
import { createClient } from '@supabase/supabase-js';
import nodemailer from 'nodemailer';
const JWT_SECRET = process.env.JWT_SECRET || 'your-secret-key-change-in-production';
const JWT_EXPIRES_IN = (process.env.JWT_EXPIRES_IN || '15m'); // Short-lived access token
const REFRESH_TOKEN_EXPIRES_IN = '7d'; // Longer-lived refresh token
// Initialize Supabase client
const supabase = createClient(process.env.SUPABASE_URL || '', process.env.SUPABASE_ANON_KEY || '');
/**
 * Hash a password using bcrypt with 10 salt rounds
 */
export async function hashPassword(password) {
    return await bcrypt.hash(password, 10);
}
/**
 * Compare a plain password with a hashed password
 */
export async function comparePassword(password, hash) {
    return await bcrypt.compare(password, hash);
}
/**
 * Generate a JWT access token with user payload (short-lived)
 */
export function generateAccessToken(userId, email) {
    const payload = { userId, email, type: 'access' };
    return jwt.sign(payload, JWT_SECRET, {
        expiresIn: JWT_EXPIRES_IN,
        algorithm: 'HS256',
    });
}
/**
 * Generate a JWT refresh token (long-lived)
 */
export function generateRefreshTokenJwt(userId) {
    const payload = { userId, type: 'refresh' };
    return jwt.sign(payload, JWT_SECRET, {
        expiresIn: REFRESH_TOKEN_EXPIRES_IN,
        algorithm: 'HS256',
    });
}
/**
 * Verify and decode a JWT token
 */
export function verifyToken(token) {
    try {
        const decoded = jwt.verify(token, JWT_SECRET, {
            algorithms: ['HS256'],
        });
        return { userId: decoded.userId, email: decoded.email, type: decoded.type };
    }
    catch (error) {
        if (error instanceof jwt.TokenExpiredError) {
            throw new Error('Token has expired');
        }
        if (error instanceof jwt.JsonWebTokenError) {
            throw new Error('Invalid token');
        }
        throw new Error('Token verification failed');
    }
}
/**
 * Store refresh token in database with hash
 */
export async function storeRefreshToken(userId, token) {
    const tokenHash = await bcrypt.hash(token, 10);
    const expiresAt = new Date(Date.now() + 7 * 24 * 60 * 60 * 1000); // 7 days
    const storedToken = await prisma.refreshToken.create({
        data: {
            userId,
            tokenHash,
            expiresAt,
        },
    });
    return storedToken.id;
}
/**
 * Validate a refresh token from the database
 */
export async function validateRefreshToken(userId, token) {
    const storedTokens = await prisma.refreshToken.findMany({
        where: {
            userId,
            revokedAt: null,
            expiresAt: { gt: new Date() },
        },
    });
    for (const storedToken of storedTokens) {
        const isValid = await bcrypt.compare(token, storedToken.tokenHash);
        if (isValid) {
            return true;
        }
    }
    return false;
}
/**
 * Rotate a refresh token (revoke old, issue new)
 */
export async function rotateRefreshToken(userId, oldToken) {
    // Verify old token is valid
    const isValid = await validateRefreshToken(userId, oldToken);
    if (!isValid) {
        const error = new Error('Invalid refresh token');
        error.statusCode = 401;
        throw error;
    }
    // Revoke all old tokens for this user
    await prisma.refreshToken.updateMany({
        where: { userId, revokedAt: null },
        data: { revokedAt: new Date() },
    });
    // Issue new refresh token
    const newToken = generateRefreshTokenJwt(userId);
    await storeRefreshToken(userId, newToken);
    return newToken;
}
/**
 * Supabase Auth: Sign up new user
 */
export async function signUpWithSupabase(email, password, name) {
    try {
        const { data, error } = await supabase.auth.signUp({
            email: email.toLowerCase(),
            password,
            options: {
                data: { name },
            },
        });
        if (error) {
            const dbError = new Error(error.message);
            dbError.statusCode = error.status === 422 ? 409 : 400;
            throw dbError;
        }
        if (!data.user) {
            throw new Error('User creation failed');
        }
        // Create local user record
        const localUser = await prisma.user.create({
            data: {
                id: data.user.id, // Use Supabase user ID
                email: email.toLowerCase(),
                name,
                passwordHash: '', // Supabase handles password
            },
        });
        return localUser;
    }
    catch (error) {
        throw error;
    }
}
/**
 * Supabase Auth: Sign in with email and password
 */
export async function signInWithSupabase(email, password) {
    try {
        const { data, error } = await supabase.auth.signInWithPassword({
            email: email.toLowerCase(),
            password,
        });
        if (error) {
            const dbError = new Error('Invalid credentials');
            dbError.statusCode = 401;
            throw dbError;
        }
        if (!data.user || !data.session) {
            throw new Error('Sign in failed');
        }
        // Get local user record
        const user = await prisma.user.findUnique({
            where: { id: data.user.id },
            select: { id: true, email: true, name: true },
        });
        return {
            user,
            accessToken: data.session.access_token,
            refreshToken: data.session.refresh_token,
            expiresIn: data.session.expires_in,
        };
    }
    catch (error) {
        throw error;
    }
}
/**
 * Supabase Auth: Sign out
 */
export async function signOutWithSupabase(accessToken) {
    try {
        const { error } = await supabase.auth.signOut();
        if (error) {
            console.error('Supabase sign out error:', error);
        }
    }
    catch (error) {
        console.error('Sign out error:', error);
    }
}
/**
 * Create a new user in the database (Custom JWT fallback)
 */
export async function createUser(name, email, password) {
    try {
        // Check if user already exists
        const existingUser = await prisma.user.findUnique({
            where: { email: email.toLowerCase() },
        });
        if (existingUser) {
            const error = new Error('Email already exists');
            error.statusCode = 409;
            throw error;
        }
        // Hash password
        const passwordHash = await hashPassword(password);
        // Create user
        const user = await prisma.user.create({
            data: {
                email: email.toLowerCase(),
                name,
                passwordHash,
            },
            select: {
                id: true,
                email: true,
                name: true,
            },
        });
        return user;
    }
    catch (error) {
        if (error.code === 'P2002') {
            const dbError = new Error('Email already exists');
            dbError.statusCode = 409;
            throw dbError;
        }
        throw error;
    }
}
/**
 * Find a user by email (includes passwordHash for login verification)
 */
export async function findUserByEmail(email) {
    const user = await prisma.user.findUnique({
        where: { email: email.toLowerCase() },
        select: {
            id: true,
            email: true,
            name: true,
            passwordHash: true,
        },
    });
    if (!user) {
        const error = new Error('User not found');
        error.statusCode = 404;
        throw error;
    }
    return user;
}
/**
 * Find a user by ID (excludes passwordHash)
 */
export async function findUserById(id) {
    const user = await prisma.user.findUnique({
        where: { id },
        select: {
            id: true,
            email: true,
            name: true,
        },
    });
    if (!user) {
        const error = new Error('User not found');
        error.statusCode = 404;
        throw error;
    }
    return user;
}
/**
 * Login user with email and password (local authentication)
 */
export async function loginUser(email, password) {
    try {
        // Find user by email
        const user = await findUserByEmail(email);
        if (!user) {
            const error = new Error('User not found');
            error.statusCode = 404;
            throw error;
        }
        console.log(`🔐 User found: ${user.email}, hash starts with: ${user.passwordHash.substring(0, 20)}...`);
        // Verify password
        const isPasswordValid = await comparePassword(password, user.passwordHash);
        console.log(`🔑 Password valid: ${isPasswordValid}`);
        if (!isPasswordValid) {
            const error = new Error('Invalid credentials');
            error.statusCode = 401;
            throw error;
        }
        // Return user without password hash
        return {
            id: user.id,
            email: user.email,
            name: user.name,
        };
    }
    catch (error) {
        console.error('Login error:', error);
        throw error;
    }
}
/**
 * Generate a 6-digit verification code
 */
export function generateVerificationCode() {
    return Math.floor(100000 + Math.random() * 900000).toString();
}
/**
 * Send verification code to user's email via OVH SMTP
 */
export async function sendVerificationEmail(email, code, name) {
    try {
        // Create Nodemailer transporter for OVH SMTP
        const transporter = nodemailer.createTransport({
            host: process.env.SMTP_HOST || 'ssl0.ovh.net',
            port: parseInt(process.env.SMTP_PORT || '587'),
            secure: process.env.SMTP_SECURE === 'true', // true for 465, false for 587
            auth: {
                user: process.env.SMTP_USER,
                pass: process.env.SMTP_PASS,
            },
        });
        // HTML email template
        const htmlContent = `
      <!DOCTYPE html>
      <html>
        <head>
          <style>
            body { font-family: Arial, sans-serif; }
            .container { max-width: 600px; margin: 0 auto; padding: 20px; }
            .header { background-color: #059669; color: white; padding: 20px; text-align: center; border-radius: 5px; }
            .content { padding: 20px; background-color: #f9fafb; margin: 20px 0; border-radius: 5px; }
            .code { font-size: 32px; font-weight: bold; letter-spacing: 5px; color: #059669; text-align: center; padding: 20px; background-color: white; border-radius: 5px; margin: 20px 0; }
            .footer { color: #666; font-size: 12px; text-align: center; padding: 20px; border-top: 1px solid #ddd; }
          </style>
        </head>
        <body>
          <div class="container">
            <div class="header">
              <h1>Vérification d'email</h1>
            </div>
            <div class="content">
              <p>Bonjour ${name},</p>
              <p>Merci de vous être inscrit. Voici votre code de vérification :</p>
              <div class="code">${code}</div>
              <p>Ce code expire dans 10 minutes.</p>
              <p>Si vous n'avez pas demandé ce code, veuillez ignorer cet email.</p>
            </div>
            <div class="footer">
              <p>&copy; 2026 TEIF. Tous droits réservés.</p>
            </div>
          </div>
        </body>
      </html>
    `;
        // Send email
        const info = await transporter.sendMail({
            from: process.env.SMTP_USER || 'support@comptacrm.com',
            to: email,
            subject: '🔐 Votre code de vérification TEIF',
            html: htmlContent,
            text: `Bonjour ${name},\n\nVotre code de vérification est: ${code}\n\nCe code expire dans 10 minutes.`,
        });
        console.log(`✅ Email sent successfully to ${email} (Message ID: ${info.messageId})`);
        return true;
    }
    catch (error) {
        console.error('❌ Email send failed:', error);
        return false;
    }
}
/**
 * Create user with verification code and send email
 */
export async function createUserWithVerification(name, email, password) {
    try {
        // Check if user already exists
        const existingUser = await prisma.user.findUnique({
            where: { email: email.toLowerCase() },
        });
        if (existingUser) {
            const error = new Error('Email already exists');
            error.statusCode = 409;
            throw error;
        }
        // Generate verification code
        const verificationCode = generateVerificationCode();
        const verificationCodeExpires = new Date(Date.now() + 10 * 60 * 1000); // 10 minutes
        // Hash password
        const passwordHash = await hashPassword(password);
        // Create user with verification code
        const user = await prisma.user.create({
            data: {
                email: email.toLowerCase(),
                name,
                passwordHash,
                emailVerified: false,
                verificationCode,
                verificationCodeExpires,
            },
            select: {
                id: true,
                email: true,
                name: true,
                emailVerified: true,
                verificationCode: true,
                verificationCodeExpires: true,
            },
        });
        // Send verification email
        await sendVerificationEmail(email, verificationCode, name);
        return user;
    }
    catch (error) {
        if (error.code === 'P2002') {
            const dbError = new Error('Email already exists');
            dbError.statusCode = 409;
            throw dbError;
        }
        throw error;
    }
}
/**
 * Verify email with code
 */
export async function verifyEmailCode(email, code) {
    try {
        const user = await prisma.user.findUnique({
            where: { email: email.toLowerCase() },
            select: {
                id: true,
                email: true,
                name: true,
                emailVerified: true,
                verificationCode: true,
                verificationCodeExpires: true,
            },
        });
        if (!user) {
            const error = new Error('User not found');
            error.statusCode = 404;
            throw error;
        }
        // Check if already verified
        if (user.emailVerified) {
            const error = new Error('Email already verified');
            error.statusCode = 400;
            throw error;
        }
        // Check if code matches
        if (user.verificationCode !== code) {
            const error = new Error('Invalid verification code');
            error.statusCode = 400;
            throw error;
        }
        // Check if code expired
        if (!user.verificationCodeExpires || new Date() > user.verificationCodeExpires) {
            const error = new Error('Verification code expired');
            error.statusCode = 400;
            throw error;
        }
        // Mark email as verified
        const verifiedUser = await prisma.user.update({
            where: { id: user.id },
            data: {
                emailVerified: true,
                verificationCode: null,
                verificationCodeExpires: null,
            },
            select: {
                id: true,
                email: true,
                name: true,
                emailVerified: true,
                verificationCode: true,
                verificationCodeExpires: true,
            },
        });
        return verifiedUser;
    }
    catch (error) {
        throw error;
    }
}
/**
 * Resend verification code
 */
export async function resendVerificationCode(email) {
    try {
        const user = await prisma.user.findUnique({
            where: { email: email.toLowerCase() },
            select: {
                id: true,
                email: true,
                name: true,
                emailVerified: true,
            },
        });
        if (!user) {
            const error = new Error('User not found');
            error.statusCode = 404;
            throw error;
        }
        if (user.emailVerified) {
            const error = new Error('Email already verified');
            error.statusCode = 400;
            throw error;
        }
        // Generate new code
        const verificationCode = generateVerificationCode();
        const verificationCodeExpires = new Date(Date.now() + 10 * 60 * 1000); // 10 minutes
        // Update user with new code
        await prisma.user.update({
            where: { id: user.id },
            data: {
                verificationCode,
                verificationCodeExpires,
            },
        });
        // Send verification email
        await sendVerificationEmail(email, verificationCode, user.name);
        return {
            message: 'Verification code resent',
            email,
        };
    }
    catch (error) {
        throw error;
    }
}
