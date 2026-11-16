# Reading List API

A REST API for the Reading List (Express 5, TypeScript, in-memory data). The folder `client/` holds a React app that will use the API. Read the section "The API contract" in `README.md` before you build anything: it is the specification.

## Commands

Run these in the project root (the API):

- `npm run dev`: start the API on http://localhost:3001 and restart it on changes. It never finishes, so do not run it in the foreground. **Ask the user to start it**, or start it in the background.
- `npm run check`: call the **running** server and report PASS or FAIL for every rule of the contract. Needs `npm run dev` in another terminal.
- `npm run typecheck`: check the types
- `npm run test:run`: run the unit tests once. Do not use `npm test`, it starts the watch mode and never ends.
- Run `npm run typecheck`, `npm run test:run` and `npm run check` before you say a task is done.

The React app in `client/` is a separate project with its own `package.json`: `npm run dev` (port 3000), `npm run typecheck`, `npm run test:run`, `npm run build`.

## Stack

- Node.js 22, ES modules, TypeScript with `strict`. Server code runs with `tsx`, there is no build step.
- Express 5. The only new dependency allowed is `cors` (with `@types/cors`). Install nothing else without asking.

## Rules for the API

- `src/app.ts` builds the Express app and exports `app`. `src/index.ts` only imports `app` and calls `listen` (port `process.env.PORT` or `3001`).
- Routes of `/api/books` live in a router in `src/routes/books.ts`. Validation lives in `src/validation.ts`. The 404 handler and the error handler live in `src/middleware/errors.ts`.
- Routes never touch the data directly. They only call `booksStore` (`src/store/booksStore.ts`). Do not change the `BooksStore` interface: a database replaces the in-memory version later.
- Base path of all routes: `/api`. Every response is JSON, sent with `response.json(...)`, except `204` (no body). Use the correct status code.
- Errors look like `{ "error": "<message>" }`. Never send a stack trace or internal details to the client.
- Validate everything that comes from the client (`request.body`, `request.params`, `request.query`). Check the type, not only whether the value is truthy.
- Handlers send the response and `return`. Express 5 passes errors of async handlers to the error middleware, so no `try`/`catch` is needed just for that.
- Order in `app.ts`: `cors`, `express.json()`, the routes, then the 404 handler, then the error handler. A route added after the 404 handler is never reached.
- Name the parameters `request` and `response`, not `req` and `res`.
- No `any`. Type what is not obvious.
- No secrets in the code. Never create or commit a `.env` file.

## Do not change

`scripts/check.ts`, `src/types.ts`, `src/seed.json` and the interface in `src/store/booksStore.ts`.

## Rules for the client (`client/`)

- Use `fetch` only. No axios, no SWR, no new dependencies.
- The `fetch` calls live in `client/src/api.ts`, not in components.
- Tests never call the real server. Mock `fetch` or the `api` module.
