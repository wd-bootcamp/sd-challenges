import { randomBytes } from "node:crypto";

import { Router } from "express";

import {
  buildAuthorizeUrl,
  exchangeCodeForToken,
  fetchGitHubUser,
} from "../auth/github";
import {
  SESSION_COOKIE,
  sessionCookieOptions,
  signSession,
  verifySession,
} from "../auth/session";
import { UserModel, toUser } from "../models/User";

export const authRouter = Router();

const STATE_COOKIE = "oauth_state";

// GET /api/auth/github: remember a random state, then send the browser to GitHub.
authRouter.get("/github", (_request, response) => {
  const state = randomBytes(16).toString("hex");
  response.cookie(STATE_COOKIE, state, {
    ...sessionCookieOptions,
    maxAge: 10 * 60 * 1000,
  });
  response.redirect(buildAuthorizeUrl(state));
});

// GET /api/auth/github/callback: GitHub sends the browser back here with ?code=...&state=...
authRouter.get("/github/callback", async (request, response) => {
  const { code, state } = request.query;
  const expectedState: unknown = request.cookies[STATE_COOKIE];
  response.clearCookie(STATE_COOKIE, sessionCookieOptions);
  if (
    typeof code !== "string" ||
    typeof state !== "string" ||
    state !== expectedState
  ) {
    response.status(400).json({ error: "Invalid OAuth state or code" });
    return;
  }
  let githubUser;
  try {
    githubUser = await fetchGitHubUser(await exchangeCodeForToken(code));
  } catch (error) {
    console.error((error as Error).message);
    response.status(401).json({ error: "GitHub login failed" });
    return;
  }
  // First login creates the user, later logins update it.
  const user = await UserModel.findOneAndUpdate(
    { githubId: githubUser.githubId },
    githubUser,
    { upsert: true, returnDocument: "after" }
  );
  response.cookie(SESSION_COOKIE, signSession(user.id), sessionCookieOptions);
  response.redirect(process.env.FRONTEND_URL ?? "/api/auth/me");
});

// GET /api/auth/me: who is logged in?
authRouter.get("/me", async (request, response) => {
  const userId = verifySession(request.cookies[SESSION_COOKIE]);
  const user = userId ? await UserModel.findById(userId) : null;
  if (!user) {
    response.status(401).json({ error: "Not logged in" });
    return;
  }
  response.json(toUser(user));
});

// POST /api/auth/logout: delete the cookie. Use the same options as at the login.
authRouter.post("/logout", (_request, response) => {
  response.clearCookie(SESSION_COOKIE, sessionCookieOptions);
  response.status(204).end();
});
