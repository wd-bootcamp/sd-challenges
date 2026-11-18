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

export const BookModel = model("Book", bookSchema);

/** Turns a document into the plain `Book` object the API sends: `id` instead of `_id`, no `__v`. */
export function toBook(doc: HydratedDocument<NewBook>): Book {
  return {
    id: doc.id,
    title: doc.title,
    author: doc.author,
    status: doc.status,
    rating: doc.rating,
    notes: doc.notes,
  };
}
