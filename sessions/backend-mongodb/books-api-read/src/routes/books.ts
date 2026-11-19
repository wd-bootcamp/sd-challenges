import { Router } from "express";

import { BookModel, toBook } from "../models/Book";
import type { NewBook } from "../types";

export const booksRouter = Router();

// GET /api/books?status=reading
booksRouter.get("/", async (request, response) => {
  const { status } = request.query;

  const filter: Record<string, unknown> = {};
  if (typeof status === "string") filter.status = status;

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
  // TODO challenge 1: find the book with the model method `findById`.
  throw new Error("GET /api/books/:id is not implemented yet");
});

// POST /api/books
booksRouter.post("/", async (request, response) => {
  // TODO challenge 1: create the book with the model method `create`.
  throw new Error("POST /api/books is not implemented yet");
});

// PUT /api/books/:id
booksRouter.put("/:id", async (request, response) => {
  // TODO challenge 1: replace the book with the model method `findByIdAndUpdate`.
  throw new Error("PUT /api/books/:id is not implemented yet");
});

// DELETE /api/books/:id
booksRouter.delete("/:id", async (request, response) => {
  // TODO challenge 1: delete the book with the model method `findByIdAndDelete`.
  throw new Error("DELETE /api/books/:id is not implemented yet");
});
