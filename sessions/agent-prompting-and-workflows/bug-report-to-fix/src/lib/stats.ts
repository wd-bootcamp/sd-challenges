import type { Book } from "../types";

export type ReadingStats = {
  total: number;
  read: number;
  percentRead: number;
  pagesRead: number;
};

export function getReadingStats(books: Book[]): ReadingStats {
  const finishedBooks = books.filter((book) => book.status === "read");
  const pagesRead = finishedBooks.reduce((sum, book) => sum + book.pages, 0);
  const percentRead =
    books.length === 0
      ? 0
      : Math.round((finishedBooks.length / books.length) * 100);

  return {
    total: books.length,
    read: finishedBooks.length,
    percentRead,
    pagesRead,
  };
}
