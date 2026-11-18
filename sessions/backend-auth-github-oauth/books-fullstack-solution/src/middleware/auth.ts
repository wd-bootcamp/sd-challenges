import type { RequestHandler } from "express";

import { SESSION_COOKIE, verifySession } from "../auth/session";
import { UserModel } from "../models/User";

// RequestHandler<Record<string, string>> keeps request.params.id a string.
// A plain RequestHandler makes it `string | string[]` and the typecheck fails in the books routes.
/** Lets the request pass when the session cookie belongs to a user, otherwise answers 401. */
export const requireAuth: RequestHandler<Record<string, string>> = async (
  request,
  response,
  next
) => {
  const userId = verifySession(request.cookies[SESSION_COOKIE]);
  const user = userId ? await UserModel.exists({ _id: userId }) : null;
  if (!user) {
    response.status(401).json({ error: "Not logged in" });
    return;
  }
  next();
};
