import { Router } from "express";

import seed from "../seed.json";
import type { Book, NewBook } from "../types";

export const booksRouter = Router();

// The books live in this array. When the server stops, they are gone.
let books: Book[] = structuredClone(seed as Book[]);

const defaults: NewBook = {
  title: "",
  author: "",
  status: "want-to-read",
  rating: null,
  notes: "",
};

// GET /api/books?status=reading
booksRouter.get("/", (request, response) => {
  const { status } = request.query;

  response.json(
    typeof status === "string"
      ? books.filter((book) => book.status === status)
      : books
  );
});

// GET /api/books/count
// This route must come before "/:id", otherwise "count" would be taken as an id.
booksRouter.get("/count", (_request, response) => {
  response.json({ count: books.length });
});

// TODO: GET /api/books/:id
// TODO: POST /api/books
// TODO: PUT /api/books/:id
// TODO: DELETE /api/books/:id
