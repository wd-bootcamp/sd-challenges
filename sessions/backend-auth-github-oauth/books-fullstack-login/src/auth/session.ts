import type { CookieOptions } from "express";
import jwt from "jsonwebtoken";

import { requireEnv } from "../env";

export const SESSION_COOKIE = "session";

// The same options must be used to set and to clear a cookie.
export const sessionCookieOptions: CookieOptions = {
  httpOnly: true, // JavaScript in the page cannot read the cookie
  sameSite: "lax",
  secure: process.env.NODE_ENV === "production", // HTTPS only in production
  path: "/",
  maxAge: 7 * 24 * 60 * 60 * 1000,
};

/** A signed token with the user id inside. It is the value of the session cookie. */
export function signSession(userId: string): string {
  return jwt.sign({}, requireEnv("JWT_SECRET"), {
    subject: userId,
    expiresIn: "7d",
    algorithm: "HS256",
  });
}

/** The user id of a valid token, or `undefined` (missing, tampered or expired). */
export function verifySession(token: unknown): string | undefined {
  if (typeof token !== "string") return undefined;
  try {
    const payload = jwt.verify(token, requireEnv("JWT_SECRET"), {
      algorithms: ["HS256"],
    });
    return typeof payload === "object" ? payload.sub : undefined;
  } catch {
    return undefined;
  }
}
