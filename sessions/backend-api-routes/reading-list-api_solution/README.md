# Reading List API: Solution

A reference solution of the Reading List API (Express 5, TypeScript, in-memory data). It is also the starting point of the session "Backend MongoDB".

Your code will look different. What should be the same:

- **The contract:** every request of the Bruno collection in `bruno/` answers as expected.
- **The structure:** one router for `/api/books` that works on the array `books`, `GET /api/books/count` before `GET /api/books/:id`, and the 404 handler and the error handler after all routes.

## Layout

```
src/
  index.ts                 starts the server (port 3001)
  app.ts                   cors, express.json, routes, 404 handler, error handler
  types.ts                 Book, NewBook, Status, STATUSES
  seed.json                the ten books
  routes/books.ts          booksRouter: list, count, get, create, replace, delete
  middleware/errors.ts     notFound, errorHandler
bruno/                     a Bruno collection with one request for every route
```

```bash
npm i
npm run dev
```
