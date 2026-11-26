import express from "express";
import { toNodeHandler, fromNodeHeaders } from "better-auth/node";
import { auth } from "./auth";

const app = express();

// 1. Better Auth answers everything under /api/auth (login, callback, logout, session).
//    It must come BEFORE express.json(), otherwise the login hangs.
app.all("/api/auth/*splat", toNodeHandler(auth));

app.use(express.json());

// 2. Our own route: "Who am I?"
app.get("/api/me", async (request, response) => {
  const session = await auth.api.getSession({
    headers: fromNodeHeaders(request.headers),
  });

  if (!session) {
    response.status(401).json({ error: "Not logged in" });
    return;
  }

  response.json(session.user);
});

app.listen(3001, () => {
  console.log("API running on http://localhost:3001");
});
