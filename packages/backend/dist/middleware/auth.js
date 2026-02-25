import { getCookie } from "hono/cookie";
import { verifyToken } from "../services/auth.service.js";
async function authMiddleware(c, next) {
  try {
    let token = "";
    const authHeader = c.req.header("Authorization");
    if (authHeader) {
      const parts = authHeader.split(" ");
      if (parts.length === 2 && parts[0] === "Bearer") {
        token = parts[1];
      } else {
        return c.json(
          { error: "Invalid authorization format. Use: Bearer <token>" },
          401
        );
      }
    } else {
      token = getCookie(c, "accessToken") || "";
    }
    if (!token) {
      return c.json(
        { error: "Authentication required" },
        401
      );
    }
    const decoded = verifyToken(token);
    c.set("user", decoded);
    await next();
  } catch (error) {
    const message = error instanceof Error ? error.message : "Token verification failed";
    return c.json(
      { error: message },
      401
    );
  }
}
function requireAuth() {
  return authMiddleware;
}
export {
  authMiddleware,
  requireAuth
};

