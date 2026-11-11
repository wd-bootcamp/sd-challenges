import { Schema, model } from "mongoose";

import { STATUSES, type BookInput } from "../types.js";

const bookSchema = new Schema<BookInput>(
  {
    title: { type: String, required: true, trim: true },
    author: { type: String, required: true, trim: true },
    status: { type: String, enum: STATUSES, default: "want-to-read" },
    rating: { type: Number, default: null, min: 1, max: 5 },
    notes: { type: String, default: "" },
  },
  {
    // createdAt is used for the sort order, it is not part of the API.
    timestamps: { createdAt: true, updatedAt: false },
    versionKey: false,
    toJSON: {
      // The API exposes `id` and the fields of the contract, nothing else.
      transform: (_doc, ret: Record<string, unknown>) => {
        const { _id, title, author, status, rating, notes } = ret;
        return { id: String(_id), title, author, status, rating, notes };
      },
    },
  }
);

export const BookModel = model<BookInput>("Book", bookSchema);
