import type { Book, StatusFilter } from "../types";

export function filterBooks(
  books: Book[],
  query: string,
  status: StatusFilter
): Book[] {
  const searchTerm = query.trim().toLowerCase();

  return books.filter((book) => {
    const matchesStatus = status === "all" || book.status === status;
    const matchesQuery =
      book.title.toLowerCase().includes(searchTerm) ||
      book.author.toLowerCase().includes(searchTerm);

    return matchesStatus && matchesQuery;
  });
}
