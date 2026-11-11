import { Router } from "express";

import {
  deleteBook,
  getBook,
  getBooks,
  postBook,
  putBook,
} from "../handlers/books.js";

export const booksRouter = Router();

booksRouter.get("/", getBooks);
booksRouter.post("/", postBook);
booksRouter.get("/:id", getBook);
booksRouter.put("/:id", putBook);
booksRouter.delete("/:id", deleteBook);
