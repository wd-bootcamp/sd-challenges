import { toNodeHandler } from "better-auth/node";
import cors from "cors";
import express from "express";

import { auth } from "./auth";
import { errorHandler, notFound } from "./middleware/errors";
import { booksRouter } from "./routes/books";

export const app = express();

// The React app runs on another origin (port 3000), so the browser needs CORS headers.
// credentials: true lets the browser send cookies to this API (the login needs it).
app.use(
  cors({
    origin: ["http://localhost:3000", "http://localhost:5173"],
    credentials: true,
  })
);

// Better Auth answers everything under /api/auth: login, callback, session, logout.
// It reads the body itself, so it must come before express.json().
app.all("/api/auth/*splat", toNodeHandler(auth));

app.use(express.json());

app.get("/api/health", (_request, response) => {
  response.json({ status: "ok" });
});
app.use("/api/books", booksRouter);

// Always last: the 404 handler, then the error handler.
app.use(notFound);
app.use(errorHandler);
