import { Router } from "express";

import { BookModel, toBook } from "../models/Book";
import type { NewBook, Status } from "../types";

export const booksRouter = Router();

// GET /api/books?status=reading
booksRouter.get("/", async (request, response) => {
  const { status } = request.query as { status?: Status };

  const filter = typeof status === "string" ? { status } : {};

  const docs = await BookModel.find(filter);
  response.json(docs.map(toBook));
});

// GET /api/books/count
// This route must come before "/:id", otherwise "count" would be taken as an id.
booksRouter.get("/count", async (_request, response) => {
  response.json({ count: await BookModel.countDocuments() });
});

// GET /api/books/:id
booksRouter.get("/:id", async (request, response) => {
  const doc = await BookModel.findById(request.params.id);

  if (!doc) {
    response.status(404).json({ error: "Book not found" });
    return;
  }
  response.json(toBook(doc));
});

// POST /api/books
booksRouter.post("/", async (request, response) => {
  response
    .status(201)
    .json(toBook(await BookModel.create(request.body as NewBook)));
});

// PUT /api/books/:id
booksRouter.put("/:id", async (request, response) => {
  const doc = await BookModel.findByIdAndUpdate(
    request.params.id,
    request.body as NewBook,
    {
      returnDocument: "after", // return the updated document, not the old one
    }
  );

  if (!doc) {
    response.status(404).json({ error: "Book not found" });
    return;
  }
  response.json(toBook(doc));
});

// DELETE /api/books/:id
booksRouter.delete("/:id", async (request, response) => {
  const doc = await BookModel.findByIdAndDelete(request.params.id);

  if (!doc) {
    response.status(404).json({ error: "Book not found" });
    return;
  }
  response.status(204).end();
});
