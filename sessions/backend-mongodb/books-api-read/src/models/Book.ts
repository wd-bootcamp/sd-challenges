import { Schema, model, type HydratedDocument } from "mongoose";

import type { Book, NewBook } from "../types";

const bookSchema = new Schema<NewBook>({
  title: String,
  author: String,
  status: String,
  rating: Number,
  notes: String,
});

// The collection is called "books": the lower-case plural of "Book".
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
