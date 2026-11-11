import { BookModel, toBook } from "./models/Book";
import type { Book, BookFilter, NewBook } from "./types";

/**
 * The data layer of the API, now backed by MongoDB (mongoose).
 * Same five functions as the in-memory version, so the routes did not change.
 */

function escapeRegExp(text: string): string {
  return text.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
}

export async function list({ status, q }: BookFilter = {}): Promise<Book[]> {
  const filter: Record<string, unknown> = {};
  if (status !== undefined) filter.status = status;
  const text = q?.trim();
  if (text) filter.title = { $regex: escapeRegExp(text), $options: "i" };

  const docs = await BookModel.find(filter);
  return docs.map(toBook);
}

/** Resolves to `undefined` when there is no book with this id. */
export async function get(id: string): Promise<Book | undefined> {
  const doc = await BookModel.findById(id);
  return doc ? toBook(doc) : undefined;
}

export async function create(input: NewBook): Promise<Book> {
  return toBook(await BookModel.create(input));
}

/** Replaces all editable fields. Resolves to `undefined` when the id is unknown. */
export async function replace(
  id: string,
  input: NewBook
): Promise<Book | undefined> {
  const doc = await BookModel.findByIdAndUpdate(id, input, {
    returnDocument: "after", // return the updated document, not the old one
    runValidators: true, // run the schema validators on updates, too
  });
  return doc ? toBook(doc) : undefined;
}

/** Resolves to `true` when a book was deleted, `false` when the id is unknown. */
export async function remove(id: string): Promise<boolean> {
  const doc = await BookModel.findByIdAndDelete(id);
  return doc !== null;
}
