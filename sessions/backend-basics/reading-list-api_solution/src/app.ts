import express from "express";

import seed from "./seed.json";
import type { Book, Status } from "./types";

const books = seed as Book[];
const STATUSES: Status[] = ["want-to-read", "reading", "done"];

export const app = express();

app.get("/api/health", (_request, response) => {
  response.json({ status: "ok" });
});

app.get("/api/books", (request, response) => {
  const { status } = request.query;

  if (status === undefined) {
    response.json(books);
    return;
  }

  if (typeof status !== "string" || !STATUSES.includes(status as Status)) {
    response
      .status(400)
      .json({ error: `Invalid status: use ${STATUSES.join(", ")}` });
    return;
  }

  response.json(books.filter((book) => book.status === status));
});

app.get("/api/books/count", (_request, response) => {
  response.json({ count: books.length });
});

app.use((_request, response) => {
  response.status(404).json({ error: "Not found" });
});
