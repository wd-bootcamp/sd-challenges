import seedBooks from "../data/books.json";
import * as booksStore from "../src/booksStore";
import type { NewBook } from "../src/types";

// Replaces all books in the store with the ten books of data/books.json.
for (const book of await booksStore.list()) {
  await booksStore.remove(book.id);
}
for (const book of seedBooks as NewBook[]) {
  await booksStore.create(book);
}

console.log(`Seeded ${seedBooks.length} books.`);
console.log(
  "Note: the in-memory store forgets them when this process ends. " +
    "Replace the store with MongoDB first."
);
