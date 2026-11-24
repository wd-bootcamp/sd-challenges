import cors from "cors";
import express from "express";

import { errorHandler, notFound } from "./middleware/errors";
import { todosRouter } from "./routes/todos";

export const app = express();

// The React app runs on another origin, so the browser needs CORS headers.
// CORS_ORIGIN is the origin of the frontend (scheme and host exact, no trailing slash).
// Default: the local frontend.
app.use(cors({ origin: process.env.CORS_ORIGIN ?? "http://localhost:5173" }));
app.use(express.json());

app.get("/api/health", (_request, response) => {
  response.json({ status: "ok" });
});
app.use("/api/todos", todosRouter);

// Always last: the 404 handler, then the error handler.
app.use(notFound);
app.use(errorHandler);
