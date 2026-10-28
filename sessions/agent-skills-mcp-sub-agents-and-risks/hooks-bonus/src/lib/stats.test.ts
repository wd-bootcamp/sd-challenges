import { getReadingStats } from "./stats";
import type { Book } from "../types";

const books: Book[] = [
  { id: "1", title: "A", author: "X", pages: 100, status: "read" },
  { id: "2", title: "B", author: "Y", pages: 200, status: "to-read" },
];

describe("getReadingStats", () => {
  test("counts all books", () => {
    expect(getReadingStats(books).total).toBe(2);
  });

  test("counts finished books and their pages", () => {
    const stats = getReadingStats(books);
    expect(stats.read).toBe(1);
    expect(stats.pagesRead).toBe(100);
  });

  test("calculates the percentage of finished books", () => {
    expect(getReadingStats(books).percentRead).toBe(50);
  });

  test("returns 0 percent for an empty shelf", () => {
    expect(getReadingStats([]).percentRead).toBe(0);
  });

  test("does not count books that are still being read", () => {
    const shelf: Book[] = [
      ...books,
      { id: "3", title: "C", author: "Z", pages: 300, status: "reading" },
    ];
    const stats = getReadingStats(shelf);
    expect(stats.read).toBe(1);
    expect(stats.pagesRead).toBe(100);
    expect(stats.percentRead).toBe(33);
  });
});
