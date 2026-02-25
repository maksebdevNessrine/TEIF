import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { prisma } from "../lib/prisma.js";
import { createClient } from "@supabase/supabase-js";
import nodemailer from "nodemailer";
const JWT_SECRET = process.env.JWT_SECRET || "your-secret-key-change-in-production";
const JWT_EXPIRES_IN = process.env.JWT_EXPIRES_IN || "15m";
const REFRESH_TOKEN_EXPIRES_IN = "7d";
const supabase = createClient(
  process.env.SUPABASE_URL || "",
  process.env.SUPABASE_ANON_KEY || ""
);
async function hashPassword(password) {
  return await bcrypt.hash(password, 10);
}
async function comparePassword(password, hash) {
  return await bcrypt.compare(password, hash);
}
function generateAccessToken(userId, email) {
  const payload = { userId, email, type: "access" };
  return jwt.sign(payload, JWT_SECRET, {
    expiresIn: JWT_EXPIRES_IN,
    algorithm: "HS256"
  });
}
function generateRefreshTokenJwt(userId) {
  const payload = { userId, type: "refresh" };
  return jwt.sign(payload, JWT_SECRET, {
    expiresIn: REFRESH_TOKEN_EXPIRES_IN,
    algorithm: "HS256"
  });
}
function verifyToken(token) {
  try {
    const decoded = jwt.verify(token, JWT_SECRET, {
      algorithms: ["HS256"]
    });
    return { userId: decoded.userId, email: decoded.email, type: decoded.type };
  } catch (error) {
    if (error instanceof jwt.TokenExpiredError) {
      throw new Error("Token has expired");
    }
    if (error instanceof jwt.JsonWebTokenError) {
      throw new Error("Invalid token");
    }
    throw new Error("Token verification failed");
  }
}
async function storeRefreshToken(userId, token) {
  const tokenHash = await bcrypt.hash(token, 10);
  const expiresAt = new Date(Date.now() + 7 * 24 * 60 * 60 * 1e3);
  const storedToken = await prisma.refreshToken.create({
    data: {
      userId,
      tokenHash,
      expiresAt
    }
  });
  return storedToken.id;
}
async function validateRefreshToken(userId, token) {
  const storedTokens = await prisma.refreshToken.findMany({
    where: {
      userId,
      revokedAt: null,
      expiresAt: { gt: /* @__PURE__ */ new Date() }
    }
  });
  for (const storedToken of storedTokens) {
    const isValid = await bcrypt.compare(token, storedToken.tokenHash);
    if (isValid) {
      return true;
    }
  }
  return false;
}
async function rotateRefreshToken(userId, oldToken) {
  const isValid = await validateRefreshToken(userId, oldToken);
  if (!isValid) {
    const error = new Error("Invalid refresh token");
    error.statusCode = 401;
    throw error;
  }
  await prisma.refreshToken.updateMany({
    where: { userId, revokedAt: null },
    data: { revokedAt: /* @__PURE__ */ new Date() }
  });
  const newToken = generateRefreshTokenJwt(userId);
  await storeRefreshToken(userId, newToken);
  return newToken;
}
async function signUpWithSupabase(email, password, name) {
  try {
    const { data, error } = await supabase.auth.signUp({
      email: email.toLowerCase(),
      password,
      options: {
        data: { name }
      }
    });
    if (error) {
      const dbError = new Error(error.message);
      dbError.statusCode = error.status === 422 ? 409 : 400;
      throw dbError;
    }
    if (!data.user) {
      throw new Error("User creation failed");
    }
    const localUser = await prisma.user.create({
      data: {
        id: data.user.id,
        // Use Supabase user ID
        email: email.toLowerCase(),
        name,
        passwordHash: ""
        // Supabase handles password
      }
    });
    return localUser;
  } catch (error) {
    throw error;
  }
}
async function signInWithSupabase(email, password) {
  try {
    const { data, error } = await supabase.auth.signInWithPassword({
      email: email.toLowerCase(),
      password
    });
    if (error) {
      const dbError = new Error("Invalid credentials");
      dbError.statusCode = 401;
      throw dbError;
    }
    if (!data.user || !data.session) {
      throw new Error("Sign in failed");
    }
    const user = await prisma.user.findUnique({
      where: { id: data.user.id },
      select: { id: true, email: true, name: true }
    });
    return {
      user,
      accessToken: data.session.access_token,
      refreshToken: data.session.refresh_token,
      expiresIn: data.session.expires_in
    };
  } catch (error) {
    throw error;
  }
}
async function signOutWithSupabase(accessToken) {
  try {
    const { error } = await supabase.auth.signOut();
    if (error) {
      console.error("Supabase sign out error:", error);
    }
  } catch (error) {
    console.error("Sign out error:", error);
  }
}
async function createUser(name, email, password) {
  try {
    const existingUser = await prisma.user.findUnique({
      where: { email: email.toLowerCase() }
    });
    if (existingUser) {
      const error = new Error("Email already exists");
      error.statusCode = 409;
      throw error;
    }
    const passwordHash = await hashPassword(password);
    const user = await prisma.user.create({
      data: {
        email: email.toLowerCase(),
        name,
        passwordHash
      },
      select: {
        id: true,
        email: true,
        name: true
      }
    });
    return user;
  } catch (error) {
    if (error.code === "P2002") {
      const dbError = new Error("Email already exists");
      dbError.statusCode = 409;
      throw dbError;
    }
    throw error;
  }
}
async function findUserByEmail(email) {
  const user = await prisma.user.findUnique({
    where: { email: email.toLowerCase() },
    select: {
      id: true,
      email: true,
      name: true,
      passwordHash: true
    }
  });
  if (!user) {
    const error = new Error("User not found");
    error.statusCode = 404;
    throw error;
  }
  return user;
}
async function findUserById(id) {
  const user = await prisma.user.findUnique({
    where: { id },
    select: {
      id: true,
      email: true,
      name: true
    }
  });
  if (!user) {
    const error = new Error("User not found");
    error.statusCode = 404;
    throw error;
  }
  return user;
}
async function loginUser(email, password) {
  try {
    const user = await findUserByEmail(email);
    console.log(`\u{1F510} User found: ${user.email}, hash starts with: ${user.passwordHash.substring(0, 20)}...`);
    const isPasswordValid = await comparePassword(password, user.passwordHash);
    console.log(`\u{1F511} Password valid: ${isPasswordValid}`);
    if (!isPasswordValid) {
      const error = new Error("Invalid credentials");
      error.statusCode = 401;
      throw error;
    }
    return {
      id: user.id,
      email: user.email,
      name: user.name
    };
  } catch (error) {
    console.error("Login error:", error);
    throw error;
  }
}
function generateVerificationCode() {
  return Math.floor(1e5 + Math.random() * 9e5).toString();
}
async function sendVerificationEmail(email, code, name) {
  try {
    const transporter = nodemailer.createTransport({
      host: process.env.SMTP_HOST || "ssl0.ovh.net",
      port: parseInt(process.env.SMTP_PORT || "587"),
      secure: process.env.SMTP_SECURE === "true",
      // true for 465, false for 587
      auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASS
      }
    });
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
              <h1>V\xE9rification d'email</h1>
            </div>
            <div class="content">
              <p>Bonjour ${name},</p>
              <p>Merci de vous \xEAtre inscrit. Voici votre code de v\xE9rification :</p>
              <div class="code">${code}</div>
              <p>Ce code expire dans 10 minutes.</p>
              <p>Si vous n'avez pas demand\xE9 ce code, veuillez ignorer cet email.</p>
            </div>
            <div class="footer">
              <p>&copy; 2026 TEIF. Tous droits r\xE9serv\xE9s.</p>
            </div>
          </div>
        </body>
      </html>
    `;
    const info = await transporter.sendMail({
      from: process.env.SMTP_USER || "support@comptacrm.com",
      to: email,
      subject: "\u{1F510} Votre code de v\xE9rification TEIF",
      html: htmlContent,
      text: `Bonjour ${name},

Votre code de v\xE9rification est: ${code}

Ce code expire dans 10 minutes.`
    });
    console.log(`\u2705 Email sent successfully to ${email} (Message ID: ${info.messageId})`);
    return true;
  } catch (error) {
    console.error("\u274C Email send failed:", error);
    return false;
  }
}
async function createUserWithVerification(name, email, password) {
  try {
    const existingUser = await prisma.user.findUnique({
      where: { email: email.toLowerCase() }
    });
    if (existingUser) {
      const error = new Error("Email already exists");
      error.statusCode = 409;
      throw error;
    }
    const verificationCode = generateVerificationCode();
    const verificationCodeExpires = new Date(Date.now() + 10 * 60 * 1e3);
    const passwordHash = await hashPassword(password);
    const user = await prisma.user.create({
      data: {
        email: email.toLowerCase(),
        name,
        passwordHash,
        emailVerified: false,
        verificationCode,
        verificationCodeExpires
      },
      select: {
        id: true,
        email: true,
        name: true,
        emailVerified: true,
        verificationCode: true,
        verificationCodeExpires: true
      }
    });
    await sendVerificationEmail(email, verificationCode, name);
    return user;
  } catch (error) {
    if (error.code === "P2002") {
      const dbError = new Error("Email already exists");
      dbError.statusCode = 409;
      throw dbError;
    }
    throw error;
  }
}
async function verifyEmailCode(email, code) {
  try {
    const user = await prisma.user.findUnique({
      where: { email: email.toLowerCase() },
      select: {
        id: true,
        email: true,
        name: true,
        emailVerified: true,
        verificationCode: true,
        verificationCodeExpires: true
      }
    });
    if (!user) {
      const error = new Error("User not found");
      error.statusCode = 404;
      throw error;
    }
    if (user.emailVerified) {
      const error = new Error("Email already verified");
      error.statusCode = 400;
      throw error;
    }
    if (user.verificationCode !== code) {
      const error = new Error("Invalid verification code");
      error.statusCode = 400;
      throw error;
    }
    if (!user.verificationCodeExpires || /* @__PURE__ */ new Date() > user.verificationCodeExpires) {
      const error = new Error("Verification code expired");
      error.statusCode = 400;
      throw error;
    }
    const verifiedUser = await prisma.user.update({
      where: { id: user.id },
      data: {
        emailVerified: true,
        verificationCode: null,
        verificationCodeExpires: null
      },
      select: {
        id: true,
        email: true,
        name: true,
        emailVerified: true,
        verificationCode: true,
        verificationCodeExpires: true
      }
    });
    return verifiedUser;
  } catch (error) {
    throw error;
  }
}
async function resendVerificationCode(email) {
  try {
    const user = await prisma.user.findUnique({
      where: { email: email.toLowerCase() },
      select: {
        id: true,
        email: true,
        name: true,
        emailVerified: true
      }
    });
    if (!user) {
      const error = new Error("User not found");
      error.statusCode = 404;
      throw error;
    }
    if (user.emailVerified) {
      const error = new Error("Email already verified");
      error.statusCode = 400;
      throw error;
    }
    const verificationCode = generateVerificationCode();
    const verificationCodeExpires = new Date(Date.now() + 10 * 60 * 1e3);
    await prisma.user.update({
      where: { id: user.id },
      data: {
        verificationCode,
        verificationCodeExpires
      }
    });
    await sendVerificationEmail(email, verificationCode, user.name);
    return {
      message: "Verification code resent",
      email
    };
  } catch (error) {
    throw error;
  }
}
export {
  comparePassword,
  createUser,
  createUserWithVerification,
  findUserByEmail,
  findUserById,
  generateAccessToken,
  generateRefreshTokenJwt,
  generateVerificationCode,
  hashPassword,
  loginUser,
  resendVerificationCode,
  rotateRefreshToken,
  sendVerificationEmail,
  signInWithSupabase,
  signOutWithSupabase,
  signUpWithSupabase,
  storeRefreshToken,
  validateRefreshToken,
  verifyEmailCode,
  verifyToken
};

