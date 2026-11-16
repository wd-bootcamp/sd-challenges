# Reading List API: Solution

A reference solution of the Reading List API (Express 5, TypeScript, in-memory data) and of the React app that uses it.

Your files and your code will look different, because an agent does not produce the same output twice. What should be the same:

- **The contract:** `npm run check` passes every rule (the server must run: `npm run dev`).
- **The structure:** one router for `/api/books`, validation in one function that `POST` and `PUT` share, a 404 handler and an error handler after all routes, and routes that only talk to `booksStore`.
- **The client:** the `fetch` calls are in `client/src/api.ts`, the components do not know the URLs. A failed request shows a message, and `fetch` errors (no response) and error responses (`response.ok` is `false`) are both handled.

## Layout

```
src/
  index.ts                 starts the server (port 3001)
  app.ts                   builds the app: cors, express.json, routes, 404 handler, error handler
  types.ts                 Book, NewBook, Status, STATUSES
  seed.json                the ten books
  validation.ts            parseBookInput(body): { value: NewBook } | { error: string }
  routes/books.ts          booksRouter: list, count, get, create, replace, delete
  middleware/errors.ts     notFound, errorHandler
  store/booksStore.ts      the BooksStore interface, the in-memory version, the `booksStore` instance
scripts/check.ts           npm run check
client/                    the React app (its own package.json)
```

## The store

The routes use only this interface. A database version must offer the same functions:

```ts
export interface BooksStore {
  list(filter?: { status?: Status; q?: string }): Promise<Book[]>;
  count(): Promise<number>;
  get(id: string): Promise<Book | undefined>;
  create(input: NewBook): Promise<Book>;
  replace(id: string, input: NewBook): Promise<Book | undefined>; // undefined: id not found
  remove(id: string): Promise<boolean>; // false: id not found
}
```

## Things to look at

- **Order in `app.ts`:** `cors`, `express.json()`, the routes, the 404 handler, the error handler. A route registered after the 404 handler is never reached.
- **Order in the router:** `GET /count` comes before `GET /:id`.
- **404 or 400 for `PUT` with an unknown id and an invalid body:** the contract does not say. The solution validates first and answers 400. Both are defensible.
- **Validation:** type checks (a number as title, a rating `"4"`, a body that is `null` or a list), trimmed `title` and `author`, defaults, unknown fields (an `id` in the body) are ignored.
- **Errors:** `{ "error": "<message>" }` everywhere, also for invalid JSON. The error handler logs the error on the server and sends only `Internal server error`.
- **CORS:** only the origins of the React app, not `cors()` without options.
- **Choices beyond the contract:** an unknown `status` in the query is a 400, a `q` that is not a single text is a 400, `notes` must be a string if it is sent.

## Development

Node.js 22.22 or newer is required. Install the dependencies with `npm i` in the project root and in `client/`.

```bash
npm run dev        # the API on http://localhost:3001
npm run check      # in a second terminal: check the running server
cd client && npm run dev   # the React app on http://localhost:3000
```
