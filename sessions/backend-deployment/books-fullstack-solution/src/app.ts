import cors from "cors";
import express from "express";

import "./loadEnv";
import { errorHandler, notFound } from "./middleware/errors";
import { booksRouter } from "./routes/books";

export const app = express();

// The origins of the frontends that may call the API: CORS_ORIGINS (comma separated),
// default the two local ones. Scheme and host must match exactly, no trailing slash.
const allowedOrigins = (
  process.env.CORS_ORIGINS ?? "http://localhost:3000,http://localhost:5173"
)
  .split(",")
  .map((origin) => origin.trim());

// credentials: true, because the client sends fetch with credentials: "include".
// With credentials the origin must be a list, never "*".
app.use(cors({ origin: allowedOrigins, credentials: true }));
app.use(express.json());

app.get("/api/health", (_request, response) => {
  response.json({ status: "ok" });
});
app.use("/api/books", booksRouter);

// Always last: the 404 handler, then the error handler.
app.use(notFound);
app.use(errorHandler);
