import express, {
  type ErrorRequestHandler,
  type RequestHandler,
} from "express";
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
