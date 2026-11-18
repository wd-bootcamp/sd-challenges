# Backend MongoDB: Books API Start

The demo start of the session. An Express 5 API for the Reading List with TypeScript. All routes work, but the books live **in memory**: stop the server and they are gone.

In the demo you build the **minimal** MongoDB version live: install `mongoose`, connect, a model, and a store on top of it. The result is the project `books-api-minimal`. You continue the exercise there, see its README for the API contract and the levels.

## What is in the starter

This is the solution of the session "Backend API Routes", plus a few files for MongoDB. The API works, but the books live **in memory**.

```
src/
  app.ts                   cors, express.json, routes, 404 handler, error handler
  index.ts                 starts the server (PORT or 3001)
  routes/books.ts          booksRouter: list, count, get, create, replace, delete
  middleware/errors.ts     notFound and errorHandler
  validation.ts            parseBookInput: checks the body of POST and PUT
  store/booksStore.ts      the BooksStore interface, the in-memory store, the `booksStore` instance
  types.ts                 STATUSES, Status, Book, NewBook
  seed.json                ten books (the same books as books.json of the last session)
scripts/
  check.ts                 checks every rule of the contract (npm run check)
.env.example               the variables of the app, without secrets
CLAUDE.md                  rules for the agent
requests.http              example requests for the REST Client extension of VS Code
```

The routes only call the singleton `booksStore`. It has this interface (the same as in "Backend API Routes"):

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

`createBooksStore(initial)` builds the in-memory version, the unit tests use it. Your MongoDB store keeps the interface: an unknown **or malformed** id resolves to `undefined` or `false` and never throws.

## Run it

```bash
npm i
npm start
```

Add a book with `POST`, stop the server, start it again: the book is gone. `npm run check` runs 52 rules and one fails: "a book created before a restart is still there after the restart".
