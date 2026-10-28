import type { Book, StatusFilter } from "../types";

export function filterBooks(
  books: Book[],
  query: string,
  status: StatusFilter
): Book[] {
  const searchTerm = query.trim();

  return books.filter((book) => {
    const matchesStatus = status === "all" || book.status === status;
    const matchesQuery =
      book.title.includes(searchTerm) || book.author.includes(searchTerm);

    return matchesStatus && matchesQuery;
  });
}
