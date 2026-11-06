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

/** Raw values of the add-book form */
export type BookInput = {
  title: string;
  author: string;
  year: string;
};

export type BookErrors = {
  title?: string;
  author?: string;
  year?: string;
};

const FIRST_BOOK_YEAR = 1450;

/**
 * Returns an error message per invalid field, or an empty object when the
 * input is valid.
 */
export function validateBook(input: BookInput, now: Date = new Date()): BookErrors {
  const errors: BookErrors = {};
  const currentYear = now.getFullYear();
  if (input.title.trim() === "") {
    errors.title = "Title is required.";
  }
  if (input.author.trim() === "") {
    errors.author = "Author is required.";
  }
  const year = Number(input.year);
  if (
    input.year.trim() === "" ||
    !Number.isInteger(year) ||
    year < FIRST_BOOK_YEAR ||
    year > currentYear
  ) {
    errors.year = `Year must be a number between ${FIRST_BOOK_YEAR} and ${currentYear}.`;
  }
  return errors;
}

/**
 * Returns a new unread book without a rating from valid form input.
 */
export function createBook(input: BookInput, id: string = crypto.randomUUID()): Book {
  return {
    id,
    title: input.title.trim(),
    author: input.author.trim(),
    year: Number(input.year),
    rating: null,
    read: false,
  };
}
