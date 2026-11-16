import cors from "cors";
import express from "express";

import { errorHandler, notFound } from "./middleware/errors";
import { quotesRouter } from "./routes/quotes";

export const app = express();

app.use(cors({ origin: "http://localhost:5173" }));
app.use(express.json());

app.get("/api/health", (_request, response) => {
  response.json({ status: "ok" });
});
app.use("/api/quotes", quotesRouter);

// Always last: the 404 handler, then the error handler.
app.use(notFound);
app.use(errorHandler);
