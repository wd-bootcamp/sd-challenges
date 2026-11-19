import { randomUUID } from "node:crypto";

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

// GET /api/books/:id
booksRouter.get("/:id", (request, response) => {
  const book = books.find((item) => item.id === request.params.id);

  if (!book) {
    response.status(404).json({ error: "Book not found" });
    return;
  }
  response.json(book);
});

// POST /api/books
booksRouter.post("/", (request, response) => {
  const book: Book = { ...defaults, ...request.body, id: randomUUID() };

  books.push(book);
  response.status(201).json(book);
});

// PUT /api/books/:id
booksRouter.put("/:id", (request, response) => {
  const index = books.findIndex((item) => item.id === request.params.id);

  if (index === -1) {
    response.status(404).json({ error: "Book not found" });
    return;
  }
  const book: Book = { ...defaults, ...request.body, id: request.params.id };

  books[index] = book;
  response.json(book);
});

// DELETE /api/books/:id
booksRouter.delete("/:id", (request, response) => {
  const before = books.length;

  books = books.filter((item) => item.id !== request.params.id);
  if (books.length === before) {
    response.status(404).json({ error: "Book not found" });
    return;
  }
  response.status(204).end();
});
