import { Hono } from "hono";
import { setCookie, getCookie } from "hono/cookie";
import { zValidator } from "@hono/zod-validator";
import { z } from "zod";
import {
  registerSchema,
  loginSchema
} from "@teif/shared";
import * as authService from "../services/auth.service.js";
import { requireAuth } from "../middleware/auth.js";
import { AuthError, authErrors } from "../utils/auth-errors.js";
const authRoutes = new Hono();
authRoutes.post(
  "/register",
  zValidator("json", registerSchema),
  async (c) => {
    try {
      const validatedData = c.req.valid("json");
      const { name, email, password } = validatedData;
      const user = await authService.createUserWithVerification(name, email, password);
      return c.json({
        success: true,
        data: {
          user,
          message: "Registration successful. Check your email for verification code.",
          emailVerified: false
        }
      }, 201);
    } catch (error) {
      if (error.message === "Email already exists") {
        return c.json({
          success: false,
          error: "Email already exists",
          code: "EMAIL_EXISTS"
        }, 409);
      }
      throw error;
    }
  }
);
authRoutes.post(
  "/login",
  zValidator("json", loginSchema),
  async (c) => {
    try {
      const validatedData = c.req.valid("json");
      const { email, password } = validatedData;
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(email)) {
        throw authErrors.invalidEmail();
      }
      let user;
      try {
        user = await authService.loginUser(email, password);
      } catch (error) {
        if (error.code === "USER_NOT_FOUND" || error.message === "User not found") {
          throw authErrors.invalidCredentials();
        }
        if (error.message === "Invalid credentials" || error.message === "Invalid password") {
          throw authErrors.invalidCredentials();
        }
        if (error.code === "ACCOUNT_LOCKED") {
          throw authErrors.accountLocked(error.retryAfter);
        }
        if (error.code === "ACCOUNT_DISABLED") {
          throw authErrors.accountDisabled();
        }
        if (error instanceof AuthError) throw error;
        throw authErrors.internalError();
      }
      let accessToken;
      try {
        accessToken = authService.generateAccessToken(user.id, user.email);
      } catch (error) {
        console.error("Access token generation failed:", error);
        throw authErrors.tokenGenerationFailed();
      }
      let refreshToken;
      try {
        refreshToken = authService.generateRefreshTokenJwt(user.id);
        await authService.storeRefreshToken(user.id, refreshToken);
      } catch (error) {
        console.error("Refresh token generation failed:", error);
        throw authErrors.tokenGenerationFailed();
      }
      setCookie(c, "accessToken", accessToken, {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "Strict",
        maxAge: 15 * 60
        // 15 minutes
      });
      setCookie(c, "refreshToken", refreshToken, {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "Strict",
        maxAge: 7 * 24 * 60 * 60
        // 7 days
      });
      const response = {
        user,
        token: accessToken
      };
      return c.json({ success: true, data: response }, 200);
    } catch (error) {
      if (error instanceof AuthError) {
        const response2 = error.toResponse();
        return c.json(response2, error.statusCode);
      }
      console.error("Unexpected login error:", error);
      const unknownError = authErrors.unknownError(error?.message);
      const response = unknownError.toResponse();
      return c.json(response, 500);
    }
  }
);
authRoutes.post("/refresh", async (c) => {
  let refreshToken = getCookie(c, "refreshToken");
  if (!refreshToken) {
    const body = await c.req.json().catch(() => ({}));
    refreshToken = body.refreshToken;
  }
  if (!refreshToken) {
    const error = new Error("Refresh token required");
    error.statusCode = 401;
    throw error;
  }
  const decoded = authService.verifyToken(refreshToken);
  if (decoded.type !== "refresh") {
    const error = new Error("Invalid token type");
    error.statusCode = 401;
    throw error;
  }
  const userId = decoded.userId;
  const isValid = await authService.validateRefreshToken(userId, refreshToken);
  if (!isValid) {
    const error = new Error("Invalid or expired refresh token");
    error.statusCode = 401;
    throw error;
  }
  const newRefreshToken = await authService.rotateRefreshToken(userId, refreshToken);
  const user = await authService.findUserById(userId);
  const newAccessToken = authService.generateAccessToken(user.id, user.email);
  setCookie(c, "refreshToken", newRefreshToken, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "Strict",
    maxAge: 7 * 24 * 60 * 60
    // 7 days
  });
  return c.json({
    success: true,
    data: {
      token: newAccessToken,
      refreshToken: newRefreshToken
    }
  }, 200);
});
authRoutes.post("/logout", requireAuth(), async (c) => {
  const authUser = c.get("user");
  if (authUser) {
    const { prisma } = await import("../lib/prisma");
    await prisma.refreshToken.updateMany({
      where: { userId: authUser.userId, revokedAt: null },
      data: { revokedAt: /* @__PURE__ */ new Date() }
    });
  }
  const cookie = getCookie(c, "refreshToken");
  if (cookie) {
    await authService.signOutWithSupabase(cookie);
  }
  setCookie(c, "refreshToken", "", { maxAge: 0 });
  const response = {
    message: "Logged out successfully"
  };
  return c.json({ success: true, data: response }, 200);
});
authRoutes.get("/me", requireAuth(), async (c) => {
  const authUser = c.get("user");
  if (!authUser) {
    const error = new Error("Authentication required");
    error.statusCode = 401;
    throw error;
  }
  const user = await authService.findUserById(authUser.userId);
  const response = {
    user
  };
  return c.json({ success: true, data: response }, 200);
});
authRoutes.post(
  "/verify-email",
  zValidator("json", z.object({
    email: z.string().email("Invalid email format"),
    code: z.string().regex(/^\d{6}$/, "Verification code must be 6 digits")
  })),
  async (c) => {
    try {
      const validatedData = c.req.valid("json");
      const { email, code } = validatedData;
      const user = await authService.verifyEmailCode(email, code);
      const accessToken = authService.generateAccessToken(user.id, user.email);
      const refreshToken = authService.generateRefreshTokenJwt(user.id);
      await authService.storeRefreshToken(user.id, refreshToken);
      setCookie(c, "refreshToken", refreshToken, {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "Strict",
        maxAge: 7 * 24 * 60 * 60
        // 7 days
      });
      const response = {
        user,
        token: accessToken
      };
      return c.json({ success: true, data: response }, 200);
    } catch (error) {
      if (error.message === "Invalid or expired verification code") {
        return c.json({
          success: false,
          error: "Invalid or expired verification code",
          code: "INVALID_CODE"
        }, 400);
      }
      if (error.message === "User not found") {
        return c.json({
          success: false,
          error: "User not found",
          code: "USER_NOT_FOUND"
        }, 404);
      }
      throw error;
    }
  }
);
authRoutes.post(
  "/resend-code",
  zValidator("json", z.object({
    email: z.string().email("Invalid email format")
  })),
  async (c) => {
    try {
      const validatedData = c.req.valid("json");
      const { email } = validatedData;
      const result = await authService.resendVerificationCode(email);
      return c.json({ success: true, data: result }, 200);
    } catch (error) {
      if (error.message === "User not found") {
        return c.json({
          success: false,
          error: "User not found",
          code: "USER_NOT_FOUND"
        }, 404);
      }
      throw error;
    }
  }
);
var auth_default = authRoutes;
export {
  auth_default as default
};

