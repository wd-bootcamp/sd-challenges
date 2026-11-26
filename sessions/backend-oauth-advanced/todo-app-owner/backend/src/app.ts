import { toNodeHandler } from "better-auth/node";
import cors from "cors";
import express from "express";

import { auth } from "./auth";
import { errorHandler, notFound } from "./middleware/errors";
import { todosRouter } from "./routes/todos";

export const app = express();

// The React app runs on another origin (http://localhost:5173), so the browser needs CORS headers.
// With the Vite proxy the page sends every /api request through http://localhost:5173, so CORS is not used anymore.
app.use(cors({ origin: "http://localhost:5173" }));

// Better Auth answers everything under /api/auth: login, callback, session, logout.
// It reads the body itself, so it must come BEFORE express.json().
app.all("/api/auth/*splat", toNodeHandler(auth));

app.use(express.json());

app.get("/api/health", (_request, response) => {
  response.json({ status: "ok" });
});
app.use("/api/todos", todosRouter);

// Always last: the 404 handler, then the error handler.
app.use(notFound);
app.use(errorHandler);
