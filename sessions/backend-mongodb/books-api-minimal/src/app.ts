import cors from "cors";
import express from "express";

import { errorHandler, notFound } from "./middleware/errors";
import { booksRouter } from "./routes/books";

export const app = express();

// The React app runs on another origin (port 3000), so the browser needs CORS headers.
app.use(cors({ origin: ["http://localhost:3000", "http://localhost:5173"] }));
app.use(express.json());

app.get("/api/health", (_request, response) => {
  response.json({ status: "ok" });
});
app.use("/api/books", booksRouter);

// Always last: the 404 handler, then the error handler.
app.use(notFound);
app.use(errorHandler);
