import { describe, expect, test } from "vitest";
import {
  averageRating,
  countRead,
  filterBooks,
  addBook,
  removeBook,
  toggleRead,
  validateNewBook,
} from "./books";
import { initialBooks } from "./data";

describe("filterBooks", () => {
  test("filters by genre", () => {
    const result = filterBooks(initialBooks, { genre: "sci-fi", query: "" });
    expect(result.map((book) => book.title)).toEqual(["Dune", "Neuromancer"]);
  });

  test("returns all books for the genre 'all'", () => {
    expect(filterBooks(initialBooks, { genre: "all", query: "" })).toHaveLength(
      5
    );
  });

  test("finds a title regardless of upper and lower case", () => {
    const result = filterBooks(initialBooks, { genre: "all", query: "dune" });
    expect(result.map((book) => book.title)).toEqual(["Dune"]);
  });

  test("ignores spaces around the search text", () => {
    const result = filterBooks(initialBooks, { genre: "all", query: " Dune " });
    expect(result).toHaveLength(1);
  });
});

describe("toggleRead", () => {
  test("toggles the read status of one book", () => {
    const result = toggleRead(structuredClone(initialBooks), "b3");
    expect(result.find((book) => book.id === "b3")?.isRead).toBe(true);
    expect(result.find((book) => book.id === "b1")?.isRead).toBe(true);
  });

  test("does not change the original list", () => {
    const books = structuredClone(initialBooks);
    const result = toggleRead(books, "b3");
    expect(books.find((book) => book.id === "b3")?.isRead).toBe(false);
    expect(result).not.toBe(books);
  });
});

describe("removeBook", () => {
  test("removes the book with the given id", () => {
    const result = removeBook(initialBooks, "b2");
    expect(result.map((book) => book.id)).toEqual(["b1", "b3", "b4", "b5"]);
  });
});

describe("countRead", () => {
  test("counts the read books", () => {
    expect(countRead(initialBooks)).toBe(2);
  });
});

describe("averageRating", () => {
  test("averages only the rated books", () => {
    expect(averageRating(initialBooks)).toBe(4);
  });

  test("returns null when no book is rated", () => {
    expect(averageRating([initialBooks[2], initialBooks[4]])).toBeNull();
  });

  test("returns null for an empty list", () => {
    expect(averageRating([])).toBeNull();
  });
});

describe("validateNewBook", () => {
  const input = {
    title: "Emma",
    author: "Jane Austen",
    genre: "mystery" as const,
    rating: 4,
  };

  test("accepts a valid book and trims title and author", () => {
    const result = validateNewBook(initialBooks, {
      ...input,
      title: "  Emma ",
      author: " Jane Austen  ",
    });
    expect(result).toEqual({ ok: true, book: input });
  });

  test("requires a title", () => {
    expect(validateNewBook(initialBooks, { ...input, title: "   " })).toEqual({
      ok: false,
      error: "Title is required.",
    });
  });

  test("requires an author", () => {
    expect(validateNewBook(initialBooks, { ...input, author: "" })).toEqual({
      ok: false,
      error: "Author is required.",
    });
  });

  test.each([-1, 6, 2.5])("rejects the rating %s", (rating) => {
    const result = validateNewBook(initialBooks, { ...input, rating });
    expect(result).toEqual({
      ok: false,
      error: "Rating must be between 0 and 5.",
    });
  });

  test("rejects a book that is already on the shelf, ignoring case", () => {
    const result = validateNewBook(initialBooks, {
      ...input,
      title: "dune",
      author: "FRANK HERBERT",
    });
    expect(result).toEqual({
      ok: false,
      error: "This book is already on your shelf.",
    });
  });

  test("accepts the same title by another author", () => {
    const result = validateNewBook(initialBooks, { ...input, title: "Dune" });
    expect(result.ok).toBe(true);
  });
});

describe("addBook", () => {
  test("appends a new, unread book with the given id", () => {
    const result = addBook(
      initialBooks,
      { title: "Emma", author: "Jane Austen", genre: "mystery", rating: 4 },
      "new-id"
    );
    expect(result).toHaveLength(6);
    expect(result[5]).toEqual({
      id: "new-id",
      title: "Emma",
      author: "Jane Austen",
      genre: "mystery",
      rating: 4,
      isRead: false,
    });
  });

  test("does not change the original list", () => {
    const copy = [...initialBooks];
    addBook(
      initialBooks,
      { title: "Emma", author: "Jane Austen", genre: "mystery", rating: 4 },
      "new-id"
    );
    expect(initialBooks).toEqual(copy);
  });
});
