# Reading List API

A REST API for the Reading List (Express 5, TypeScript). The books live in MongoDB (mongoose).

## Commands

Run these in the project root:

- `npm run dev`: start the API on http://localhost:3001 and restart it on changes. It never finishes, so do not run it in the foreground. **Ask the user to start it**, or start it in the background. It reads `.env` if it exists.
- `npm run typecheck`: check the types
- `npm run test:run`: run the tests once. **Never run `npm test`**: it starts the watch mode and never ends.
- Run `npm run typecheck` and `npm run test:run` before you say a task is done.

## Stack

- Node.js 22, ES modules, TypeScript with `strict`. Server code runs with `tsx`, there is no build step.
- Express 5 and `cors`. For MongoDB use `mongoose`. Tests use `vitest` and `supertest`. Install nothing else without asking.

## Rules

- **The API contract must not change.** Paths, status codes, the JSON field names (`id, title, author, status, rating, notes`) and the error format `{ "error": "..." }` stay exactly as they are.
- Routes call the mongoose model directly (`BookModel` and `toBook` from `src/models/Book.ts`, connection in `src/db.ts`). There is no store, repository or service layer: do not add one.
- There is no input validation in this project, on purpose. Do not add any (no `parseBookInput`, no schema validators, no checks of `request.body`, `request.query` or the id).
- The responses have exactly `id, title, author, status, rating, notes`. No `_id`, no `__v`.
- **Never read, print, log or commit `.env`.** It contains secrets. Do not put a connection string into any other file. `.env.example` has placeholders only. Never log the connection string, at most the database name.
- Connect to the database first, then call `listen`. If the connection fails, stop the process with a clear message.
- Use async/await, no callbacks. Express 5 passes errors of async handlers to the error middleware, so no `try`/`catch` is needed just for that. The error handler is in `src/middleware/errors.ts` and sends no internal details to the client.
- Name the parameters `request` and `response`, not `req` and `res`.
- No `any`. Type what is not obvious.
- Do not add dependencies without telling me why.

## Rules for tests

- Tests are in `src/app.test.ts` and call the app with `supertest` (`request(app)`). No port, no database.
- Replace `BookModel` with stubs (`vi.mock`, see the first test). Never connect to MongoDB in a test, never import `src/index.ts` or `src/db.ts`, never read `.env`.
- Every `request(app)` needs an `await`, and every test checks the status **and** the body.
- Test the contract (status and body), not which function was called. The one exception is `model.create`, to check that the body arrived.
- **Do not change `src/` to make a test pass.** If a test fails, ask whether the test or the code is wrong, and tell me.

## Do not change

`src/types.ts`, `src/seed.json`.
