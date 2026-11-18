import { beforeEach, describe, expect, test } from "vitest";

import type { Book, NewBook } from "../types";
import { type BooksStore, createBooksStore } from "./booksStore";

const books: Book[] = [
  {
    id: "a",
    title: "Dune",
    author: "Frank Herbert",
    status: "done",
    rating: 5,
    notes: "",
  },
  {
    id: "b",
    title: "Dune Messiah",
    author: "Frank Herbert",
    status: "reading",
    rating: null,
    notes: "",
  },
  {
    id: "c",
    title: "Gone Girl",
    author: "Gillian Flynn",
    status: "want-to-read",
    rating: null,
    notes: "",
  },
];

const newBook: NewBook = {
  title: "Neuromancer",
  author: "William Gibson",
  status: "want-to-read",
  rating: null,
  notes: "",
};

let store: BooksStore;

beforeEach(() => {
  store = createBooksStore(books);
});

describe("list", () => {
  test("returns all books without a filter", async () => {
    expect(await store.list()).toHaveLength(3);
  });

  test("filters by status", async () => {
    const result = await store.list({ status: "done" });
    expect(result.map((book) => book.id)).toEqual(["a"]);
  });

  test("searches the title, ignoring case and spaces around the text", async () => {
    const result = await store.list({ q: "  DUNE " });
    expect(result.map((book) => book.id)).toEqual(["a", "b"]);
  });

  test("combines status and search", async () => {
    const result = await store.list({ status: "reading", q: "dune" });
    expect(result.map((book) => book.id)).toEqual(["b"]);
  });
});

test("count returns the number of books", async () => {
  expect(await store.count()).toBe(3);
  await store.remove("a");
  expect(await store.count()).toBe(2);
});

describe("get", () => {
  test("returns the book or undefined", async () => {
    expect((await store.get("c"))?.title).toBe("Gone Girl");
    expect(await store.get("missing")).toBeUndefined();
  });
});

describe("create", () => {
  test("adds a book with a generated string id", async () => {
    const created = await store.create(newBook);
    expect(typeof created.id).toBe("string");
    expect(created.title).toBe("Neuromancer");
    expect(await store.list()).toHaveLength(4);
  });
});

describe("replace", () => {
  test("replaces the fields and keeps the id", async () => {
    const replaced = await store.replace("a", newBook);
    expect(replaced).toEqual({ id: "a", ...newBook });
    expect(await store.get("a")).toEqual({ id: "a", ...newBook });
  });

  test("returns undefined for an unknown id", async () => {
    expect(await store.replace("missing", newBook)).toBeUndefined();
  });
});

describe("remove", () => {
  test("removes a book and says whether it existed", async () => {
    expect(await store.remove("a")).toBe(true);
    expect(await store.remove("a")).toBe(false);
    expect(await store.list()).toHaveLength(2);
  });
});

test("the store does not change the data it was created from", async () => {
  await store.remove("a");
  expect(books).toHaveLength(3);
});
