import { randomUUID } from "node:crypto";

import seed from "../seed.json";
import { mongoBooksStore } from "./mongoBooksStore";
import type { Book, NewBook, Status } from "../types";

export type BookFilter = {
  status?: Status;
  q?: string;
};

/**
 * The only way the routes talk to the data.
 * Every function returns a promise, so a database can replace the in-memory version later
 * without changing the routes.
 */
export interface BooksStore {
  list(filter?: BookFilter): Promise<Book[]>;
  count(): Promise<number>;
  get(id: string): Promise<Book | undefined>;
  create(input: NewBook): Promise<Book>;
  /** Replaces the editable fields. Resolves to `undefined` if the id does not exist. */
  replace(id: string, input: NewBook): Promise<Book | undefined>;
  /** Resolves to `false` if the id does not exist. */
  remove(id: string): Promise<boolean>;
}

export function createBooksStore(initial: Book[] = seed as Book[]): BooksStore {
  // A copy, so the seed is never changed.
  let books: Book[] = structuredClone(initial);

  return {
    async list({ status, q } = {}) {
      const query = (q ?? "").trim().toLowerCase();
      return books
        .filter(
          (book) =>
            (status === undefined || book.status === status) &&
            book.title.toLowerCase().includes(query)
        )
        .map((book) => ({ ...book }));
    },

    async count() {
      return books.length;
    },

    async get(id) {
      const book = books.find((item) => item.id === id);
      return book ? { ...book } : undefined;
    },

    async create(input) {
      const book: Book = { id: randomUUID(), ...input };
      books.push(book);
      return { ...book };
    },

    async replace(id, input) {
      const index = books.findIndex((item) => item.id === id);
      if (index === -1) {
        return undefined;
      }
      const book: Book = { id, ...input };
      books[index] = book;
      return { ...book };
    },

    async remove(id) {
      const before = books.length;
      books = books.filter((item) => item.id !== id);
      return books.length < before;
    },
  };
}

/** The store the app uses: MongoDB. The in-memory version above stays for the unit tests. */
export const booksStore: BooksStore = mongoBooksStore;
