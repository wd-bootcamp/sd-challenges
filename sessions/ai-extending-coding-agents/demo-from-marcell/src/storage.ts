import type { Book } from "./books";

const KEY = "bookshelf.books";

/**
 * Loads the books from localStorage. Returns the fallback when nothing is
 * stored or the stored value is not valid.
 */
export function loadBooks(fallback: Book[], storage: Storage = window.localStorage): Book[] {
  try {
    const raw = storage.getItem(KEY);
    if (raw === null) {
      return fallback;
    }
    const parsed: unknown = JSON.parse(raw);
    return Array.isArray(parsed) ? (parsed as Book[]) : fallback;
  } catch {
    return fallback;
  }
}

export function saveBooks(books: Book[], storage: Storage = window.localStorage): void {
  try {
    storage.setItem(KEY, JSON.stringify(books));
  } catch {
    // storage full or not available: the app keeps working without saving
  }
}
