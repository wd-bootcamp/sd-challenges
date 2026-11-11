# Reading List API

A REST API for the Reading List (Express 5, TypeScript). The books live in MongoDB (mongoose). The in-memory store only stays for the unit tests.

## Commands

Run these in the project root:

- `npm run dev`: start the API on http://localhost:3001 and restart it on changes. It never finishes, so do not run it in the foreground. **Ask the user to start it**, or start it in the background. It reads `.env` if it exists.
- `npm run check`: check every rule of the contract. It starts its own server on port 3101 and restarts it once to test that the data survives. `BASE_URL=http://localhost:3001 npm run check` checks a running server instead.
- `npm run typecheck`: check the types
- `npm run test:run`: run the unit tests once. Do not use `npm test`, it starts the watch mode and never ends.
- `npm run seed`: delete ALL books in the database and insert the ten books of `src/seed.json`
- Run `npm run typecheck`, `npm run test:run` and `npm run check` before you say a task is done.

## Stack

- Node.js 22, ES modules, TypeScript with `strict`. Server code runs with `tsx`, there is no build step.
- Express 5 and `cors`. For MongoDB use `mongoose`. Install nothing else without asking.

## Rules

- **The API contract must not change.** Paths, status codes, the JSON field names (`id, title, author, status, rating, notes`) and the error format `{ "error": "..." }` stay exactly as they are.
- Routes never touch the data directly. They only call `booksStore` (`src/store/booksStore.ts`), which is `mongoBooksStore` (`src/store/mongoBooksStore.ts`, schema in `src/models/Book.ts`, connection in `src/db.ts`). Keep the `BooksStore` interface (`list`, `count`, `get`, `create`, `replace`, `remove`, all async). An unknown **or malformed** id resolves to `undefined` or `false`, it never throws.
- Do not change `src/routes/books.ts` and `src/validation.ts` without telling me why.
- The responses have exactly `id, title, author, status, rating, notes`. No `_id`, no `__v`.
- **Never read, print, log or commit `.env`.** It contains secrets. Do not put a connection string into any other file. `.env.example` has placeholders only. Never log the connection string, at most the database name.
- Connect to the database first, then call `listen`. If the connection fails, stop the process with a clear message.
- Use async/await, no callbacks. Express 5 passes errors of async handlers to the error middleware, so no `try`/`catch` is needed just for that. The error handler is in `src/middleware/errors.ts` and sends no internal details to the client.
- Name the parameters `request` and `response`, not `req` and `res`.
- No `any`. Type what is not obvious.
- Do not add dependencies without telling me why.

## Do not change

`scripts/check.ts`, `src/types.ts`, `src/seed.json`.
