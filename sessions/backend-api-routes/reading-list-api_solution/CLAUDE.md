# Reading List API

A REST API for the Reading List (Express 5, TypeScript, in-memory data). The specification is the section "The API contract" in `README.md`.

## Commands

Run these in the project root:

- `npm run dev`: start the API on http://localhost:3001 and restart it on changes. It never finishes, so do not run it in the foreground. **Ask the user to start it**, or start it in the background.
- `npm run typecheck`: check the types
- Run `npm run typecheck` before you say a task is done. The user validates the API with Bruno (`bruno/`, environment `Local`).

## Stack

- Node.js 22, ES modules, TypeScript with `strict`. Server code runs with `tsx`, there is no build step.
- Express 5 and `cors`. Install nothing else without asking.

## Rules

- **The API contract must not change.** Paths, status codes, the JSON field names (`id, title, author, status, rating, notes`) and the error format `{ "error": "..." }` stay exactly as they are.
- The routes of `/api/books` live in the router in `src/routes/books.ts` and work on the array `books`. There is no store, repository or service layer: do not add one.
- There is no input validation in this project, on purpose. Do not add any.
- Order in `src/app.ts`: `cors`, `express.json()`, the routes, then the 404 handler, then the error handler. A route added after the 404 handler is never reached.
- Every response is JSON, sent with `response.json(...)`, except `204` (no body). Use the correct status code.
- Handlers send the response and `return`. Express 5 passes errors of async handlers to the error middleware, so no `try`/`catch` is needed just for that.
- Name the parameters `request` and `response`, not `req` and `res`.
- No `any`. Type what is not obvious.
- No secrets in the code. Never create or commit a `.env` file.
- Do not add dependencies without telling me why.

## Do not change

`src/types.ts`, `src/seed.json`.
