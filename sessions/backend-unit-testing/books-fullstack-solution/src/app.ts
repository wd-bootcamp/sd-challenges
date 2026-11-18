import cors from "cors";
import express from "express";

import { errorHandler, notFound } from "./middleware/errors";
import { createBooksRouter } from "./routes/books";
import { booksStore, type BooksStore } from "./store/booksStore";

/** Builds the app around a store. Tests pass a fresh in-memory store, the server passes MongoDB. */
export function createApp(store: BooksStore) {
  const app = express();

  // The React app runs on another origin (port 5173), so the browser needs CORS headers.
  // credentials: true lets the page send cookies ("credentials: include" in client/src/api.ts).
  app.use(
    cors({
      origin: ["http://localhost:3000", "http://localhost:5173"],
      credentials: true,
    })
  );
  app.use(express.json());

  app.get("/api/health", (_request, response) => {
    response.json({ status: "ok" });
  });
  app.use("/api/books", createBooksRouter(store));

  // Always last: the 404 handler, then the error handler.
  app.use(notFound);
  app.use(errorHandler);
  return app;
}

export const app = createApp(booksStore);
