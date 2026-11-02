import type { Book, GenreFilter } from "./types";

type Filter = {
  genre: GenreFilter;
  query: string;
};

export function filterBooks(books: Book[], { genre, query }: Filter): Book[] {
  const normalizedQuery = query.trim().toLowerCase();
  return books.filter(
    (book) =>
      (genre === "all" || book.genre === genre) &&
      book.title.toLowerCase().includes(normalizedQuery)
  );
}

export function toggleRead(books: Book[], id: string): Book[] {
  return books.map((book) =>
    book.id === id ? { ...book, isRead: !book.isRead } : book
  );
}

export function removeBook(books: Book[], id: string): Book[] {
  return books.filter((book) => book.id !== id);
}

export function countRead(books: Book[]): number {
  return books.filter((book) => book.isRead).length;
}

/** Average of all rated books, rounded to one decimal. `null` if no book is rated. */
export function averageRating(books: Book[]): number | null {
  const rated = books.filter((book) => book.rating > 0);
  if (rated.length === 0) {
    return null;
  }
  const sum = rated.reduce((total, book) => total + book.rating, 0);
  return Math.round((sum / rated.length) * 10) / 10;
}

export type NewBook = Pick<Book, "title" | "author" | "genre" | "rating">;

export type ValidationResult =
  { ok: true; book: NewBook } | { ok: false; error: string };

/** Checks the input of the "add a book" form. Trims title and author. */
export function validateNewBook(
  books: Book[],
  input: NewBook
): ValidationResult {
  const title = input.title.trim();
  const author = input.author.trim();

  if (title === "") {
    return { ok: false, error: "Title is required." };
  }
  if (author === "") {
    return { ok: false, error: "Author is required." };
  }
  if (!Number.isInteger(input.rating) || input.rating < 0 || input.rating > 5) {
    return { ok: false, error: "Rating must be between 0 and 5." };
  }

  const isDuplicate = books.some(
    (book) =>
      book.title.toLowerCase() === title.toLowerCase() &&
      book.author.toLowerCase() === author.toLowerCase()
  );
  if (isDuplicate) {
    return { ok: false, error: "This book is already on your shelf." };
  }

  return { ok: true, book: { ...input, title, author } };
}

export function addBook(books: Book[], newBook: NewBook, id: string): Book[] {
  return [...books, { ...newBook, id, isRead: false }];
}
