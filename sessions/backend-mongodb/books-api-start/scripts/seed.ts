import seed from "../src/seed.json";
import { booksStore } from "../src/store/booksStore";
import type { NewBook } from "../src/types";

// Replaces all books in the store with the ten books of src/seed.json.
// The ids of the seed file are dropped, the store creates its own ids.
for (const book of await booksStore.list()) {
  await booksStore.remove(book.id);
}
for (const { id: _seedId, ...book } of seed) {
  await booksStore.create(book as NewBook);
}

console.log(`Seeded ${seed.length} books.`);
console.log(
  "Note: the in-memory store forgets them when this process ends. " +
    "Replace the store with MongoDB first."
);
