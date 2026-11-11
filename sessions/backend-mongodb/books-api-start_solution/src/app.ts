import express, {
  type ErrorRequestHandler,
  type RequestHandler,
} from "express";
import mongoose from "mongoose";
import { booksRouter } from "./routes/books";

export const app = express();

app.use(express.json());

app.get("/api/health", (_request, response) => {
  response.json({ status: "ok" });
});

app.use("/api/books", booksRouter);

const notFound: RequestHandler = (_request, response) => {
  response.status(404).json({ error: "Not found" });
};
app.use(notFound);

const errorHandler: ErrorRequestHandler = (err, _request, response, _next) => {
  // findById("abc") cannot cast "abc" to an ObjectId: no such book.
  if (err instanceof mongoose.Error.CastError && err.path === "_id") {
    response.status(404).json({ error: "Book not found" });
    return;
  }
  // The schema rejected a value (second line of defense after parseBookInput).
  if (err instanceof mongoose.Error.ValidationError) {
    const message = Object.values(err.errors)
      .map((fieldError) => fieldError.message)
      .join(", ");
    response.status(400).json({ error: message });
    return;
  }
  // Errors of express.json() (for example invalid JSON) carry a 4xx status.
  const status = typeof err?.status === "number" ? err.status : 500;
  if (status >= 400 && status < 500) {
    response.status(status).json({ error: "Invalid request body" });
    return;
  }
  console.error(err);
  response.status(500).json({ error: "Internal server error" });
};
app.use(errorHandler);
