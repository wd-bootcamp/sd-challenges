import { Router } from "express";

import { booksRouter } from "./books.js";

export const apiRouter = Router();

apiRouter.get("/health", (_request, response) => {
  response.json({ status: "ok" });
});
apiRouter.use("/books", booksRouter);
