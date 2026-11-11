import express from "express";

import { errorHandler, notFound } from "./middleware/errors.js";
import { apiRouter } from "./routes/index.js";

/**
 * Builds the Express app without starting it and without a database
 * connection, so that tests (Recap Project 8) can import it.
 *
 * There is no CORS middleware on purpose: in development, the frontend dev
 * server proxies /api to this server, so the browser sees one origin.
 */
export function createApp() {
  const app = express();

  app.use(express.json());

  app.use("/api", apiRouter);

  app.use(notFound);
  app.use(errorHandler);
  return app;
}
