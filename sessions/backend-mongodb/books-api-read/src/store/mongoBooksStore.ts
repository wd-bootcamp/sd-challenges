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

  // TODO challenge 1: implement get, create, replace and remove with the model methods.
  async get(_id) {
    throw new Error("get is not implemented yet");
  },

  async create(_input) {
    throw new Error("create is not implemented yet");
  },

  async replace(_id, _input) {
    throw new Error("replace is not implemented yet");
  },

  async remove(_id) {
    throw new Error("remove is not implemented yet");
  },
};
