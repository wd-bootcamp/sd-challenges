import mongoose from "mongoose";
import seedBooks from "../data/books.json";
import { connectToDatabase } from "../src/db";
import { BookModel } from "../src/models/Book";

// Replaces ALL books in the database with the ten books of data/books.json.
// The file has no ids, MongoDB creates the _id values.
try {
  await connectToDatabase();
  await BookModel.deleteMany({});
  const books = await BookModel.insertMany(seedBooks);
  console.log(`Seeded ${books.length} books.`);
} catch (error) {
  console.error("Seeding failed:", (error as Error).message);
  process.exitCode = 1;
} finally {
  await mongoose.disconnect();
}
