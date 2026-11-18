import { BookModel, toBook } from "../models/Book";
import type { BookFilter, BooksStore } from "./booksStore";

function escapeRegExp(text: string): string {
  return text.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
}

/** An ObjectId is 24 hexadecimal characters. Anything else cannot be a book. */
function isObjectId(id: string): boolean {
  return /^[0-9a-f]{24}$/i.test(id);
}

/** The BooksStore on top of MongoDB. Needs `connectToDatabase()` first. */
export const mongoBooksStore: BooksStore = {
  async list({ status, q }: BookFilter = {}) {
    const filter: Record<string, unknown> = {};
    if (status !== undefined) filter.status = status;
    const text = q?.trim();
    if (text) filter.title = { $regex: escapeRegExp(text), $options: "i" };

    const docs = await BookModel.find(filter);
    return docs.map(toBook);
  },

  async count() {
    return BookModel.countDocuments();
  },

  async get(id) {
    // findById("abc") would throw a CastError. A malformed id is a book that does not exist.
    if (!isObjectId(id)) return undefined;
    const doc = await BookModel.findById(id);
    return doc ? toBook(doc) : undefined;
  },

  async create(input) {
    return toBook(await BookModel.create(input));
  },

  async replace(id, input) {
    if (!isObjectId(id)) return undefined;
    const doc = await BookModel.findByIdAndUpdate(id, input, {
      returnDocument: "after", // return the updated document, not the old one
      runValidators: true, // run the schema validators on updates, too
    });
    return doc ? toBook(doc) : undefined;
  },

  async remove(id) {
    if (!isObjectId(id)) return false;
    const doc = await BookModel.findByIdAndDelete(id);
    return doc !== null;
  },
};
