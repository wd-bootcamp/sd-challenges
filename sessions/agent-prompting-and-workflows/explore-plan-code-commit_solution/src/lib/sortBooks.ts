import type { Book, SortOption } from "../types";

export function sortBooks(books: Book[], sortBy: SortOption): Book[] {
  const sortedBooks = [...books];

  switch (sortBy) {
    case "title":
      return sortedBooks.sort((a, b) => a.title.localeCompare(b.title));
    case "author":
      return sortedBooks.sort((a, b) => a.author.localeCompare(b.author));
    case "rating":
      return sortedBooks.sort((a, b) => (b.rating ?? 0) - (a.rating ?? 0));
    case "added":
      return sortedBooks;
  }
}
