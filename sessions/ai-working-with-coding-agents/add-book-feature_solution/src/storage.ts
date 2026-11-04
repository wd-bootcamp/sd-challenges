import type { Book } from "./types";

export const STORAGE_KEY = "bookshelf:books";

function isBook(value: unknown): value is Book {
  if (typeof value !== "object" || value === null) {
    return false;
  }
  const book = value as Record<string, unknown>;
  return (
    typeof book.id === "string" &&
    typeof book.title === "string" &&
    typeof book.author === "string" &&
    typeof book.genre === "string" &&
    typeof book.rating === "number" &&
    typeof book.isRead === "boolean"
  );
}

/** Loads the saved books. Falls back if nothing is saved or the data is broken. */
export function loadBooks(fallback: Book[]): Book[] {
  try {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (saved === null) {
      return fallback;
    }
    const parsed: unknown = JSON.parse(saved);
    return Array.isArray(parsed) && parsed.every(isBook) ? parsed : fallback;
  } catch {
    return fallback;
  }
}

export function saveBooks(books: Book[]): void {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(books));
}
