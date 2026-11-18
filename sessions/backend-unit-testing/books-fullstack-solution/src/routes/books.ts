import { Router } from "express";

import type { BooksStore } from "../store/booksStore";
import { STATUSES, type Status } from "../types";
import { parseBookInput } from "../validation";

/** The router needs a store. `createApp` decides which one: MongoDB in the app, a fresh in-memory store in a test. */
export function createBooksRouter(store: BooksStore): Router {
  const booksRouter = Router();

  // GET /api/books?status=reading&q=dune
  booksRouter.get("/", async (request, response) => {
    const { status, q } = request.query;

    if (status !== undefined && !STATUSES.includes(status as Status)) {
      response
        .status(400)
        .json({ error: `status must be one of: ${STATUSES.join(", ")}` });
      return;
    }
    if (q !== undefined && typeof q !== "string") {
      response.status(400).json({ error: "q must be a single text" });
      return;
    }
    response.json(
      await store.list({ status: status as Status | undefined, q })
    );
  });

  // GET /api/books/count
  // This route must come before "/:id", otherwise "count" would be taken as an id.
  booksRouter.get("/count", async (_request, response) => {
    response.json({ count: await store.count() });
  });

  // GET /api/books/:id
  booksRouter.get("/:id", async (request, response) => {
    const book = await store.get(request.params.id);

    if (!book) {
      response.status(404).json({ error: "Book not found" });
      return;
    }
    response.json(book);
  });

  // POST /api/books
  booksRouter.post("/", async (request, response) => {
    const result = parseBookInput(request.body);

    if ("error" in result) {
      response.status(400).json({ error: result.error });
      return;
    }
    response.status(201).json(await store.create(result.value));
  });

  // PUT /api/books/:id
  booksRouter.put("/:id", async (request, response) => {
    const result = parseBookInput(request.body);

    if ("error" in result) {
      response.status(400).json({ error: result.error });
      return;
    }
    const book = await store.replace(request.params.id, result.value);

    if (!book) {
      response.status(404).json({ error: "Book not found" });
      return;
    }
    response.json(book);
  });

  // DELETE /api/books/:id
  booksRouter.delete("/:id", async (request, response) => {
    const removed = await store.remove(request.params.id);

    if (!removed) {
      response.status(404).json({ error: "Book not found" });
      return;
    }
    response.status(204).end();
  });

  return booksRouter;
}
