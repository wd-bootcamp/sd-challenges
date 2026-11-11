import { Schema, model, type HydratedDocument } from "mongoose";

import { STATUSES, type Book, type NewBook } from "../types";

const bookSchema = new Schema<NewBook>({
  title: { type: String, required: [true, "title is required"], trim: true },
  author: { type: String, required: [true, "author is required"], trim: true },
  status: {
    type: String,
    enum: {
      values: STATUSES,
      message: `status must be one of: ${STATUSES.join(", ")}`,
    },
    default: "want-to-read",
  },
  rating: {
    type: Number,
    default: null,
    min: [1, "rating must be at least 1"],
    max: [5, "rating must be at most 5"],
    validate: {
      // Custom validators also run for null, which means "not rated".
      validator: (value: number | null) =>
        value === null || Number.isInteger(value),
      message: "rating must be an integer",
    },
  },
  notes: { type: String, default: "" },
});

// What a book looks like in JSON: `_id` becomes `id`, `__v` disappears.
bookSchema.set("toJSON", {
  versionKey: false,
  transform: (_doc, ret: Record<string, unknown>) => {
    const { _id, ...rest } = ret;
    return { id: String(_id), ...rest };
  },
});

export const BookModel = model("Book", bookSchema);

/** Turns a document into the plain `Book` object the API sends. */
export function toBook(doc: HydratedDocument<NewBook>): Book {
  return doc.toJSON() as unknown as Book;
}
