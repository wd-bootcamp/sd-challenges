# Reading List API

A JSON API for the Reading List, built with Express 5 and TypeScript. The data lives in `src/booksStore.ts`. Read `README.md` before you change anything.

## Commands

- `npm start`: start the API on http://localhost:3001 (reads `.env` if it exists)
- `npm run dev`: the same, restarts on file changes
- `npm run seed`: replace all books with the ten books of `data/books.json`
- `npm run typecheck`: check the types
- `npm run check`: start the server and check every rule of the API contract (see README.md)

## Structure

- `src/app.ts`: Express app, middleware, 404 and error handling
- `src/index.ts`: starts the server
- `src/routes/books.ts`: the `/api/books` routes. They only call `booksStore`.
- `src/booksStore.ts`: **the data layer**, five async functions: `list`, `get`, `create`, `replace`, `remove`
- `src/validation.ts`: `parseBookInput` checks the body of POST and PUT
- `src/types.ts`: `Book`, `NewBook`, `Status`
- `data/books.json`: the seed data
- `scripts/seed.ts`, `scripts/check.ts`

## Rules

- **The API contract in `README.md` must not change.** Paths, status codes, the JSON field names (`id, title, author, status, rating, notes`) and the error format `{ "error": "..." }` stay exactly as they are. `npm run check` must pass.
- Keep the five-function interface of `src/booksStore.ts`. Routes must not know which database is behind it.
- Never read, print, log or commit `.env`. It contains secrets. Do not put a connection string into any other file. Use `.env.example` for placeholders only.
- Never log the connection string. Log the database name at most.
- Use async/await, no callbacks. Express 5 passes errors of rejected promises to the error handler, do not wrap every route in `try/catch`.
- TypeScript strict, no `any`.
- Do not add dependencies without telling me why.
- Run `npm run typecheck` and `npm run check` before you say a task is done.
