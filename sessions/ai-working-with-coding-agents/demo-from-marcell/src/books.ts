export type Book = {
  id: string;
  title: string;
  author: string;
  year: number;
  /** 1 to 5 stars, or null when the book has no rating yet */
  rating: number | null;
  read: boolean;
};

/**
 * Returns the books whose title or author contains the query.
 */
export function searchBooks(books: Book[], query: string): Book[] {
  const trimmed = query.trim();
  if (trimmed === "") {
    return books;
  }
  return books.filter((book) => book.title.includes(trimmed));
}

/**
 * Returns the average rating of the books, rounded to one decimal.
 */
export function averageRating(books: Book[]): number | null {
  if (books.length === 0) {
    return null;
  }
  const sum = books.reduce((total, book) => total + (book.rating ?? 0), 0);
  return Math.round((sum / books.length) * 10) / 10;
}

/**
 * Returns the books sorted by year, oldest first.
 */
export function sortByYear(books: Book[]): Book[] {
  return books.sort((a, b) => a.year - b.year);
}

/**
 * Returns how many books are marked as read.
 */
export function countRead(books: Book[]): number {
  return books.filter((book) => book.read).length;
}

/**
 * Returns a copy of the books where the book with the given id has the
 * opposite read state.
 */
export function toggleRead(books: Book[], id: string): Book[] {
  return books.map((book) =>
    book.id === id ? { ...book, read: !book.read } : book,
  );
}
