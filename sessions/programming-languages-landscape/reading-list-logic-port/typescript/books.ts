import type { Book, Status, StatusFilter } from "./types.ts";

export const STATUS_LABELS: Record<Status, string> = {
  "want-to-read": "Want to read",
  reading: "Reading",
  done: "Done",
};

export function filterBooks(
  books: Book[],
  status: StatusFilter,
  query: string
): Book[] {
  const normalizedQuery = query.trim().toLowerCase();
  return books.filter(
    (book) =>
      (status === "all" || book.status === status) &&
      book.title.toLowerCase().includes(normalizedQuery)
  );
}

export type BookErrors = { title?: string; author?: string };

/** Returns an error message per invalid field. An empty object means valid. */
export function validateBook(input: {
  title: string;
  author: string;
}): BookErrors {
  const errors: BookErrors = {};
  if (input.title.trim() === "") {
    errors.title = "Title is required";
  }
  if (input.author.trim() === "") {
    errors.author = "Author is required";
  }
  return errors;
}
