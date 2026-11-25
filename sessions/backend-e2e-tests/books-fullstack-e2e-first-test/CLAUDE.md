# Reading List API

A monorepo (npm workspaces) for the Reading List: the REST API in `backend/` (Express 5, TypeScript) and the React app in `frontend/` (Vite, TypeScript). The books live in MongoDB (mongoose).

## Commands

Run these in the project root (the folder with the root `package.json`):

- `npm run dev:backend`: start the API on http://localhost:3001 and restart it on changes. It never finishes, so do not run it in the foreground. **Ask the user to start it**, or start it in the background. It reads `backend/.env` if it exists.
- `npm run dev:frontend`: start the React app on http://localhost:5173. It never finishes either, ask the user to start it.
- `npm run typecheck`: check the types of `backend/` and `frontend/`
- Run `npm run typecheck` before you say a task is done. The user checks the page in the browser.

## Stack

- Node.js 22, ES modules, TypeScript with `strict`. Server code runs with `tsx`, there is no build step.
- Express 5 and `cors`. For MongoDB use `mongoose`. Install nothing else without asking.

## Rules

- **The API contract must not change.** Paths, status codes, the JSON field names (`id, title, author, status, rating, notes`) and the error format `{ "error": "..." }` stay exactly as they are.
- Routes call the mongoose model directly (`BookModel` and `toBook` from `backend/src/models/Book.ts`, connection in `backend/src/db.ts`). There is no store, repository or service layer: do not add one.
- There is no input validation in this project, on purpose. Do not add any (no `parseBookInput`, no schema validators, no checks of `request.body`, `request.query` or the id).
- The responses have exactly `id, title, author, status, rating, notes`. No `_id`, no `__v`.
- **Never read, print, log or commit `backend/.env`.** It contains secrets. Do not put a connection string into any other file. `backend/.env.example` has placeholders only. Never log the connection string, at most the database name.
- Connect to the database first, then call `listen`. If the connection fails, stop the process with a clear message.
- Use async/await, no callbacks. Express 5 passes errors of async handlers to the error middleware, so no `try`/`catch` is needed just for that. The error handler is in `src/middleware/errors.ts` and sends no internal details to the client.
- Name the parameters `request` and `response`, not `req` and `res`.
- No `any`. Type what is not obvious.
- Do not add dependencies without telling me why.

## Commands for E2E (only in the folders with `e2e/`)

- `npm run e2e`: run the browser tests (Playwright). It starts the API and the client itself and stops them again. Stop your own dev servers first, the ports 3000 and 3101 must be free. It uses the database of your `backend/.env` (`MONGODB_URI`) and needs the browser (`npx playwright install --only-shell chromium`, once).

## E2E tests

- The browser tests live in `e2e/`, the configuration is `playwright.config.ts`. They drive the React app like a user: locators by role and label (`getByRole`, `getByLabel`), assertions of the form `await expect(locator)...`. No `waitForTimeout`, no CSS selectors unless there is no role or label.
- **Never set `reuseExistingServer: true`** in `playwright.config.ts`. Never read or print `backend/.env`. If a run fails, tell me why instead of changing this.
- The tests run against the database of `backend/.env`, the same as `npm run dev:backend`. They have no database code (no mongoose, no `deleteMany`, no script that deletes data). Each test creates its own data (a unique title) and deletes it through the page. Tests do not depend on each other or on exact counts.
- Do not change the app (`backend/`, `frontend/`) to make a test pass. If a test fails, tell me whether the test or the app is wrong.

## Do not change

`backend/src/types.ts`, `backend/src/seed.json`.
