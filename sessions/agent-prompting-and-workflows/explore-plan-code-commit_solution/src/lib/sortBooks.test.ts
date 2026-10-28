import { sortBooks } from "./sortBooks";
import type { Book } from "../types";

const books: Book[] = [
  { id: "1", title: "Clean Code", author: "Robert C. Martin", pages: 464, status: "reading" },
  { id: "2", title: "Atomic Habits", author: "James Clear", pages: 320, status: "read", rating: 3 },
  { id: "3", title: "The Hobbit", author: "J. R. R. Tolkien", pages: 310, status: "read", rating: 5 },
  { id: "4", title: "Project Hail Mary", author: "Andy Weir", pages: 496, status: "read", rating: 3 },
];

function titles(sortedBooks: Book[]): string[] {
  return sortedBooks.map((book) => book.title);
}

describe("sortBooks", () => {
  test("keeps the current order for 'added'", () => {
    expect(titles(sortBooks(books, "added"))).toEqual([
      "Clean Code",
      "Atomic Habits",
      "The Hobbit",
      "Project Hail Mary",
    ]);
  });

  test("sorts by title from A to Z", () => {
    expect(titles(sortBooks(books, "title"))).toEqual([
      "Atomic Habits",
      "Clean Code",
      "Project Hail Mary",
      "The Hobbit",
    ]);
  });

  test("sorts by author from A to Z", () => {
    expect(titles(sortBooks(books, "author"))).toEqual([
      "Project Hail Mary",
      "The Hobbit",
      "Atomic Habits",
      "Clean Code",
    ]);
  });

  test("sorts by rating, best first, and keeps the order of equal ratings", () => {
    expect(titles(sortBooks(books, "rating")).slice(0, 3)).toEqual([
      "The Hobbit",
      "Atomic Habits",
      "Project Hail Mary",
    ]);
  });

  test("puts books without a rating last", () => {
    const sorted = titles(sortBooks(books, "rating"));
    expect(sorted[sorted.length - 1]).toBe("Clean Code");
  });

  test("does not change the original array", () => {
    const original = [...books];
    sortBooks(books, "title");
    expect(books).toEqual(original);
  });
});
