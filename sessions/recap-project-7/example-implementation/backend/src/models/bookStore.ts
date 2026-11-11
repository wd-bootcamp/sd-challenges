import { isValidObjectId } from "mongoose";

import type { BookInput, Status } from "../types.js";
import { BookModel } from "./book.js";

/**
 * The only place that talks to the database about books.
 *
 * Later (Recap Project 8), books get an owner. Every function below then gets
 * an `ownerId` parameter and adds it to the filter, in this file only.
 */

function escapeRegExp(text: string): string {
  return text.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
}

export async function listBooks(filter: { status?: Status; q?: string }) {
  const query: Record<string, unknown> = {};
  if (filter.status) query.status = filter.status;
  if (filter.q) query.title = { $regex: escapeRegExp(filter.q), $options: "i" };
  return BookModel.find(query).sort({ createdAt: -1, _id: -1 });
}

export async function findBook(id: string) {
  if (!isValidObjectId(id)) return null;
  return BookModel.findById(id);
}

export async function createBook(input: BookInput) {
  return BookModel.create(input);
}

export async function replaceBook(id: string, input: BookInput) {
  if (!isValidObjectId(id)) return null;
  return BookModel.findByIdAndUpdate(id, input, {
    new: true,
    runValidators: true,
  });
}

export async function removeBook(id: string) {
  if (!isValidObjectId(id)) return null;
  return BookModel.findByIdAndDelete(id);
}

/** Used by the seed script. */
export async function replaceAllBooks(inputs: BookInput[]) {
  await BookModel.deleteMany({});
  // The list shows the newest book first, so insert the seed in reverse.
  return BookModel.insertMany([...inputs].reverse());
}
