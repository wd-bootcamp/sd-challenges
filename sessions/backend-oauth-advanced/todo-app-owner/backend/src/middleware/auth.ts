import { fromNodeHeaders } from "better-auth/node";
import type { RequestHandler } from "express";

import { auth } from "../auth";

/**
 * Lets the request pass when the session cookie belongs to a user, otherwise answers 401.
 * Puts the id of the user into response.locals.userId for the routes.
 */
export const requireAuth: RequestHandler<Record<string, string>> = async (
  request,
  response,
  next
) => {
  const session = await auth.api.getSession({
    headers: fromNodeHeaders(request.headers),
  });

  if (!session) {
    response.status(401).json({ error: "Not logged in" });
    return;
  }
  response.locals.userId = session.user.id;
  next();
};
