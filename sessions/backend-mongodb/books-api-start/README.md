# Backend MongoDB: Books API Start

The demo start of the session. An Express 5 API for the Reading List with TypeScript. All routes work, but the books live **in memory**, in one array: stop the server and they are gone.

In the demo you build the **read** part of the MongoDB version live: install `mongoose`, connect, a model, and `GET /api/books` and `GET /api/books/count` on top of it. The result is the project `books-api-read`. You continue the exercise there, see its README for the API contract and the challenges.

## What is in the starter

```
src/
  app.ts                   cors, express.json, routes, 404 handler, error handler
  index.ts                 starts the server (PORT or 3001)
  routes/books.ts          booksRouter: list, count, get, create, replace, delete, on an array
  middleware/errors.ts     notFound and errorHandler
  types.ts                 STATUSES, Status, Book, NewBook
  seed.json                ten books (the same books as books.json of the last session)
.env.example               the variables of the app, without secrets
CLAUDE.md                  rules for the agent
```

The routes read and change the array `books` in `src/routes/books.ts`. In the demo, the array is replaced by the mongoose model, route by route. There is no input validation, on purpose.

## Run it

```bash
npm i
npm start
```

Add a book with `POST`, stop the server, start it again: the book is gone.
