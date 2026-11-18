# Reading List: API and React page

The project root is a REST API for the Reading List (Express 5, TypeScript). The books live in MongoDB (mongoose). The in-memory store only stays for the unit tests. `client/` is a small React page (Vite, TypeScript) that uses the API. It is given and does not change in this session.

## Commands

Run these in the project root:

- `npm run dev`: start the API on http://localhost:3001 and restart it on changes. It never finishes, so do not run it in the foreground. **Ask the user to start it**, or start it in the background. It reads `.env` if it exists.
- `npm run typecheck`: check the types
- In `client/`: `npm run dev` starts the page on http://localhost:5173 (it never finishes, ask the user to start it), `npm run typecheck` checks the types.
- `npm run test:run`: run the unit tests once. Do not use `npm test`, it starts the watch mode and never ends.
- Run `npm run typecheck` and `npm run test:run` before you say a task is done. The user validates in the React page and with Bruno.

## Stack

- Node.js 22, ES modules, TypeScript with `strict`. Server code runs with `tsx`, there is no build step.
- Express 5 and `cors`. For MongoDB use `mongoose`. Install nothing else without asking.
- Login (added in this session): GitHub OAuth written by hand with `fetch`, a JWT in an httpOnly cookie (`jsonwebtoken`, `cookie-parser`). No `passport`, no `express-session`, no other auth package without asking.

## Rules

- **The API contract must not change.** Routes that are public stay public: a 401 is only for protected routes. Paths, status codes, the JSON field names (`id, title, author, status, rating, notes`) and the error format `{ "error": "..." }` stay exactly as they are.
- Routes never touch the data directly. They only call `booksStore` (`src/store/booksStore.ts`), which is `mongoBooksStore` (`src/store/mongoBooksStore.ts`, schema in `src/models/Book.ts`, connection in `src/db.ts`). Keep the `BooksStore` interface (`list`, `count`, `get`, `create`, `replace`, `remove`, all async). An unknown **or malformed** id resolves to `undefined` or `false`, it never throws.
- Do not change `src/routes/books.ts` and `src/validation.ts` without telling me why. (Putting `requireAuth` on the write routes is the one planned change of `src/routes/books.ts`.)
- The responses have exactly `id, title, author, status, rating, notes`. No `_id`, no `__v`.
- **Never read, print, log or commit `.env`.** It contains secrets: the connection string, the GitHub client secret and `JWT_SECRET`. Never put them into another file, a prompt or a log. Never log a GitHub token or a session token. `.env.example` has placeholders only. Never log the connection string, at most the database name.
- Connect to the database first, then call `listen`. If the connection fails, stop the process with a clear message.
- Use async/await, no callbacks. Express 5 passes errors of async handlers to the error middleware, so no `try`/`catch` is needed just for that. The error handler is in `src/middleware/errors.ts` and sends no internal details to the client.
- The session is a cookie that the server sets and the page cannot read (`httpOnly`). Never keep a token in `localStorage`. Do not add a dev-login route or any other way in without the GitHub login.
- A middleware with the type `RequestHandler` turns `request.params.id` into `string | string[]`. Type `requireAuth` as `RequestHandler<Record<string, string>>`.
- Name the parameters `request` and `response`, not `req` and `res`.
- No `any`. Type what is not obvious.
- Do not add dependencies without telling me why.

## Do not change

`src/types.ts`, `src/seed.json`.
