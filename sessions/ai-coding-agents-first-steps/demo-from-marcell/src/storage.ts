import type { Book } from "./books";
import { initialBooks } from "./data/books";

const STORAGE_KEY = "bookshelf.books";

function isBook(value: unknown): value is Book {
  if (typeof value !== "object" || value === null) {
    return false;
  }
  const book = value as Record<string, unknown>;
  return (
    typeof book.id === "string" &&
    typeof book.title === "string" &&
    typeof book.author === "string" &&
    typeof book.year === "number" &&
    (book.rating === null || typeof book.rating === "number") &&
    typeof book.read === "boolean"
  );
}

/**
 * Returns the stored books, or the fallback when nothing valid is stored.
 */
export function loadBooks(storage: Storage = localStorage, fallback: Book[] = initialBooks): Book[] {
  try {
    const raw = storage.getItem(STORAGE_KEY);
    if (raw === null) {
      return fallback;
    }
    const parsed: unknown = JSON.parse(raw);
    return Array.isArray(parsed) && parsed.every(isBook) ? parsed : fallback;
  } catch {
    return fallback;
  }
}

/**
 * Stores the books. Storage errors (quota, blocked access) are ignored.
 */
export function saveBooks(books: Book[], storage: Storage = localStorage): void {
  try {
    storage.setItem(STORAGE_KEY, JSON.stringify(books));
  } catch {
    // the shelf still works in memory
  }
}
