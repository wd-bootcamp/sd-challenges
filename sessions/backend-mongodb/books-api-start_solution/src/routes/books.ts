import { Router } from "express";
import * as booksStore from "../booksStore";
import { parseBookInput } from "../validation";

export const booksRouter = Router();

const NOT_FOUND = { error: "Book not found" };

function queryText(value: unknown): string | undefined {
  return typeof value === "string" ? value : undefined;
}

booksRouter.get("/", async (request, response) => {
  const books = await booksStore.list({
    status: queryText(request.query.status),
    q: queryText(request.query.q),
  });
  response.json(books);
});

booksRouter.get("/:id", async (request, response) => {
  const book = await booksStore.get(request.params.id);
  if (!book) return response.status(404).json(NOT_FOUND);
  response.json(book);
});

booksRouter.post("/", async (request, response) => {
  const parsed = parseBookInput(request.body);
  if (!parsed.ok) return response.status(400).json({ error: parsed.error });
  const book = await booksStore.create(parsed.value);
  response.status(201).json(book);
});

booksRouter.put("/:id", async (request, response) => {
  const parsed = parseBookInput(request.body);
  if (!parsed.ok) return response.status(400).json({ error: parsed.error });
  const book = await booksStore.replace(request.params.id, parsed.value);
  if (!book) return response.status(404).json(NOT_FOUND);
  response.json(book);
});

booksRouter.delete("/:id", async (request, response) => {
  const deleted = await booksStore.remove(request.params.id);
  if (!deleted) return response.status(404).json(NOT_FOUND);
  response.status(204).end();
});
