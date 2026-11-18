# Reading List API

A REST API for the Reading List (Express 5, TypeScript) and its React app in `client/` (Vite, TypeScript). The books live in MongoDB (mongoose). The in-memory store only stays for the unit tests.

## Commands

Run these in the project root:

- `npm run dev`: start the API on http://localhost:3001 and restart it on changes. It never finishes, so do not run it in the foreground. **Ask the user to start it**, or start it in the background. It reads `.env` if it exists.
- `npm run typecheck`: check the types (the API; `client/` has its own `npm run typecheck`)
- `cd client && npm run dev`: start the React app on http://localhost:5173. It never finishes either, ask the user to start it.
- `npm run test:run`: run the unit tests once. Do not use `npm test`, it starts the watch mode and never ends.
- `npm run e2e`: run the browser tests (Playwright). It starts the API and the client itself and stops them again. Stop your own dev servers first, the ports 3000 and 3101 must be free. It needs the E2E database (`E2E_MONGODB_URI` in `.env`) and the browser (`npx playwright install --only-shell chromium`, once).
- Run `npm run typecheck` and `npm run test:run` before you say a task is done. The user checks the page in the browser.

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

## E2E tests

- The browser tests live in `e2e/`, the configuration is `playwright.config.ts`. They drive the React app like a user: locators by role and label (`getByRole`, `getByLabel`), assertions of the form `await expect(locator)...`. No `waitForTimeout`, no CSS selectors unless there is no role or label.
- **Never change `e2e/database.ts`** (the guard: the database name must end with `-e2e`) and **never set `reuseExistingServer: true`** in `playwright.config.ts`. Never read or print `.env`. If a run fails, tell me why instead of changing these.
- The tests have no database code. Each test creates its own data (a unique title) and deletes it through the page. Tests do not depend on each other or on exact counts.
- Do not put a login bypass or a test route into the app for the tests.

## Do not change

`src/types.ts`, `src/seed.json`, `e2e/database.ts`.
