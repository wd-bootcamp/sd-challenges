import type { Request, Response } from "express";

import { HttpError } from "../middleware/errors.js";
import {
  createBook,
  findBook,
  listBooks,
  removeBook,
  replaceBook,
} from "../models/bookStore.js";
import { parseBookInput, parseBookQuery } from "../validation/book.js";

// Express 5 forwards errors of async handlers to the error handler.

export async function getBooks(request: Request, response: Response) {
  const query = parseBookQuery(request.query);
  if (!query.ok) throw new HttpError(400, query.error);
  response.json(await listBooks(query.value));
}

export async function getBook(
  request: Request<{ id: string }>,
  response: Response
) {
  const book = await findBook(request.params.id);
  if (!book) throw new HttpError(404, "Book not found");
  response.json(book);
}

export async function postBook(request: Request, response: Response) {
  const input = parseBookInput(request.body);
  if (!input.ok) throw new HttpError(400, input.error);
  response.status(201).json(await createBook(input.value));
}

export async function putBook(
  request: Request<{ id: string }>,
  response: Response
) {
  const input = parseBookInput(request.body);
  if (!input.ok) throw new HttpError(400, input.error);
  const book = await replaceBook(request.params.id, input.value);
  if (!book) throw new HttpError(404, "Book not found");
  response.json(book);
}

export async function deleteBook(
  request: Request<{ id: string }>,
  response: Response
) {
  const book = await removeBook(request.params.id);
  if (!book) throw new HttpError(404, "Book not found");
  response.status(204).end();
}
