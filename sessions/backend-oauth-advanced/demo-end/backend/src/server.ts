import express from "express";
import { toNodeHandler, fromNodeHeaders } from "better-auth/node";
import { auth, db } from "./auth";

const app = express();

// 1. Better Auth answers everything under /api/auth (login, callback, logout, session).
//    It must come BEFORE express.json(), otherwise the login hangs.
app.all("/api/auth/*splat", toNodeHandler(auth));

app.use(express.json());

// 2. "Who am I?" NEW: loaded from the database
app.get("/api/me", async (request, response) => {
  const session = await auth.api.getSession({
    headers: fromNodeHeaders(request.headers),
  });

  if (!session) {
    response.status(401).json({ error: "Not logged in" });
    return;
  }

  const user = await db.collection("user").findOne({ email: session.user.email });

  if (!user) {
    response.status(404).json({ error: "User not found" });
    return;
  }

  response.json({
    name: user.name,
    email: user.email,
    image: user.image,
    createdAt: user.createdAt, // when this user logged in for the first time
  });
});

// 3. NEW: everybody who has ever logged in, loaded from the database
app.get("/api/users", async (request, response) => {
  const session = await auth.api.getSession({
    headers: fromNodeHeaders(request.headers),
  });

  if (!session) {
    response.status(401).json({ error: "Not logged in" });
    return;
  }

  const users = await db.collection("user").find().toArray();

  response.json(
    users.map((user) => ({
      name: user.name,
      image: user.image,
    }))
  );
});

app.listen(3001, () => {
  console.log("API running on http://localhost:3001");
});
