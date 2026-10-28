import { filterBooks } from "./filterBooks";
import type { Book } from "../types";

const books: Book[] = [
  { id: "1", title: "The Hobbit", author: "Tolkien", pages: 310, status: "read" },
  { id: "2", title: "Clean Code", author: "Martin", pages: 464, status: "reading" },
];

describe("filterBooks", () => {
  test("returns all books for an empty query and status 'all'", () => {
    expect(filterBooks(books, "", "all")).toHaveLength(2);
  });

  test("filters by status", () => {
    expect(filterBooks(books, "", "reading")).toEqual([books[1]]);
  });

  test("finds books by title", () => {
    expect(filterBooks(books, "Hobbit", "all")).toEqual([books[0]]);
  });

  test("finds books by author", () => {
    expect(filterBooks(books, "Martin", "all")).toEqual([books[1]]);
  });

  test("ignores upper and lower case", () => {
    expect(filterBooks(books, "hobbit", "all")).toEqual([books[0]]);
    expect(filterBooks(books, "MARTIN", "all")).toEqual([books[1]]);
  });
});
