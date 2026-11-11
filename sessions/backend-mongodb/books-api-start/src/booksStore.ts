import { randomUUID } from "node:crypto";
import seedBooks from "../data/books.json";
import type { Book, BookFilter, NewBook } from "./types";

/**
 * The data layer of the API. The routes only talk to these five functions.
 * Everything is async on purpose, so a real database can replace this module
 * without changing the routes.
 */

// In-memory storage: lost whenever the server stops.
const books = new Map<string, Book>(
  (seedBooks as NewBook[]).map((book) => {
    const id = randomUUID();
    return [id, { id, ...book }];
  })
);

export async function list({ status, q }: BookFilter = {}): Promise<Book[]> {
  const query = q?.trim().toLowerCase() ?? "";
  return [...books.values()].filter(
    (book) =>
      (status === undefined || book.status === status) &&
      book.title.toLowerCase().includes(query)
  );
}

/** Resolves to `undefined` when there is no book with this id. */
export async function get(id: string): Promise<Book | undefined> {
  return books.get(id);
}

export async function create(input: NewBook): Promise<Book> {
  const book: Book = { id: randomUUID(), ...input };
  books.set(book.id, book);
  return book;
}

/** Replaces all editable fields. Resolves to `undefined` when the id is unknown. */
export async function replace(
  id: string,
  input: NewBook
): Promise<Book | undefined> {
  if (!books.has(id)) return undefined;
  const book: Book = { id, ...input };
  books.set(id, book);
  return book;
}

/** Resolves to `true` when a book was deleted, `false` when the id is unknown. */
export async function remove(id: string): Promise<boolean> {
  return books.delete(id);
}
