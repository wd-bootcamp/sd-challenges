import { BookModel, toBook } from "../models/Book";
import type { BooksStore } from "./booksStore";

/** The BooksStore on top of MongoDB. Needs `connectToDatabase()` first. */
export const mongoBooksStore: BooksStore = {
  async list({ status, q } = {}) {
    const filter: Record<string, unknown> = {};
    if (status) filter.status = status;
    if (q?.trim()) filter.title = { $regex: q.trim(), $options: "i" };

    const docs = await BookModel.find(filter);
    return docs.map(toBook);
  },

  async count() {
    return BookModel.countDocuments();
  },

  async get(id) {
    const doc = await BookModel.findById(id);
    return doc ? toBook(doc) : undefined;
  },

  async create(input) {
    return toBook(await BookModel.create(input));
  },

  async replace(id, input) {
    const doc = await BookModel.findByIdAndUpdate(id, input, {
      returnDocument: "after", // return the updated document, not the old one
    });
    return doc ? toBook(doc) : undefined;
  },

  async remove(id) {
    const doc = await BookModel.findByIdAndDelete(id);
    return doc !== null;
  },
};
