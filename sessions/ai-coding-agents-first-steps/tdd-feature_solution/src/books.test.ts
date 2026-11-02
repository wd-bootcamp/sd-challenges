import { describe, expect, test } from "vitest";
import {
  averageRating,
  countRead,
  filterBooks,
  removeBook,
  sortBooks,
  toggleRead,
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

describe("sortBooks", () => {
  const book = (id: string, title: string, author: string, rating: number) => ({
    id,
    title,
    author,
    genre: "fantasy" as const,
    rating,
    isRead: false,
  });
  const books = [
    book("1", "banana", "Zed", 3),
    book("2", "Apple", "yan", 0),
    book("3", "cherry", "Xia", 5),
    book("4", "Date", "Wu", 3),
  ];

  test("sorts by title regardless of upper and lower case", () => {
    const titles = sortBooks(books, "title").map((b) => b.title);
    expect(titles).toEqual(["Apple", "banana", "cherry", "Date"]);
  });

  test("sorts by author in descending order", () => {
    const authors = sortBooks(books, "author", "desc").map((b) => b.author);
    expect(authors).toEqual(["Zed", "yan", "Xia", "Wu"]);
  });

  test("sorts by rating and keeps equal ratings in their original order", () => {
    const ids = sortBooks(books, "rating").map((b) => b.id);
    expect(ids).toEqual(["1", "4", "3", "2"]);
  });

  test("puts unrated books last, also in descending order", () => {
    const ids = sortBooks(books, "rating", "desc").map((b) => b.id);
    expect(ids).toEqual(["3", "1", "4", "2"]);
  });

  test("does not change the original list", () => {
    const copy = [...books];
    sortBooks(books, "title");
    expect(books).toEqual(copy);
  });

  test("returns an empty list for an empty list", () => {
    expect(sortBooks([], "title")).toEqual([]);
  });
});
