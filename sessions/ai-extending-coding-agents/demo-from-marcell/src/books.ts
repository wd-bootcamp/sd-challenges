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
  const needle = query.trim().toLowerCase();
  if (needle === "") {
    return [...books];
  }
  return books.filter(
    (book) =>
      book.title.toLowerCase().includes(needle) ||
      book.author.toLowerCase().includes(needle),
  );
}

/**
 * Returns the average rating of the rated books, rounded to one decimal.
 * Books without a rating are ignored. Returns null if no book has a rating.
 */
export function averageRating(books: Book[]): number | null {
  const ratings = books
    .map((book) => book.rating)
    .filter((rating): rating is number => rating !== null);
  if (ratings.length === 0) {
    return null;
  }
  const sum = ratings.reduce((total, rating) => total + rating, 0);
  return Math.round((sum / ratings.length) * 10) / 10;
}

/**
 * Returns the books sorted by year, oldest first.
 */
export function sortByYear(books: Book[]): Book[] {
  return [...books].sort((a, b) => a.year - b.year);
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

/**
 * Returns only the books that are not read yet.
 */
export function filterUnread(books: Book[]): Book[] {
  return books.filter((book) => !book.read);
}

/**
 * Returns a copy of the books where the book with the given id has the new
 * rating. Rating the book with its current rating again removes the rating.
 */
export function rateBook(books: Book[], id: string, rating: number): Book[] {
  if (!Number.isInteger(rating) || rating < 1 || rating > 5) {
    throw new Error(`A rating must be a whole number from 1 to 5, got ${rating}`);
  }
  return books.map((book) =>
    book.id === id ? { ...book, rating: book.rating === rating ? null : rating } : book,
  );
}

export type NewBookInput = {
  title: string;
  author: string;
  year: string;
};

export type NewBookErrors = Partial<Record<keyof NewBookInput, string>>;

/**
 * Validates the input of the "add a book" form. Returns an empty object when
 * the input is valid.
 */
export function validateNewBook(input: NewBookInput, currentYear = new Date().getFullYear()): NewBookErrors {
  const errors: NewBookErrors = {};
  if (input.title.trim() === "") {
    errors.title = "Please enter a title.";
  }
  if (input.author.trim() === "") {
    errors.author = "Please enter an author.";
  }
  const year = Number(input.year);
  if (!Number.isInteger(year) || year < 1450 || year > currentYear) {
    errors.year = `Please enter a year between 1450 and ${currentYear}.`;
  }
  return errors;
}

/**
 * Returns a new array with a new, unread and unrated book at the end.
 */
export function addBook(books: Book[], input: NewBookInput, id: string = crypto.randomUUID()): Book[] {
  return [
    ...books,
    {
      id,
      title: input.title.trim(),
      author: input.author.trim(),
      year: Number(input.year),
      rating: null,
      read: false,
    },
  ];
}
