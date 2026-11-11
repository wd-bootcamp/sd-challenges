import { readFile } from "node:fs/promises";

import mongoose from "mongoose";

import { config } from "./config.js";
import { replaceAllBooks } from "./models/bookStore.js";
import { parseBookInput } from "./validation/book.js";

const file = new URL("../../data/books.seed.json", import.meta.url);
const raw: unknown[] = JSON.parse(await readFile(file, "utf-8"));

const books = raw.map((entry) => {
  const result = parseBookInput(entry);
  if (!result.ok) throw new Error(`Invalid seed entry: ${result.error}`);
  return result.value;
});

await mongoose.connect(config.mongodbUri);
await replaceAllBooks(books);
console.log(`Seeded ${books.length} books (all existing books were deleted)`);
await mongoose.disconnect();
