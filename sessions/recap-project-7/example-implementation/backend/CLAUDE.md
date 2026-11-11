# Backend

Express 5 JSON API with MongoDB (mongoose), TypeScript strict, ESM. Runs with `tsx`. Base path `/api`, port 3001.

## Commands

- `npm run dev`: start with restart on changes (I run this, not you)
- `npm run typecheck`: type check
- `npm run test:run`: unit tests, once
- `npm run seed`: replace all books with `../data/books.seed.json`

## Structure

`routes/` maps URLs to `handlers/`. Handlers read the request, call `models/bookStore.ts` and send the response. Only `bookStore.ts` talks to the database. `validation/` holds pure functions. `app.ts` builds the app without listening, `index.ts` connects and listens.

## Conventions

- Errors: throw `HttpError(status, message)`. The central handler in `middleware/errors.ts` sends `{ "error": "<message>" }`. Handlers do not build error responses themselves.
- Responses follow `../docs/api-contract.md` exactly: `id` as string, no `_id`, no `__v`.
- Configuration only through `src/config.ts` (environment variables, `.env.example` lists them).
- No `any`. Imports of local files end with `.js` (ESM).
- Validation lives in `validation/` and has unit tests.

## Off limits

- Do not read `.env`. Do not start the server against my database.
- Do not change the contract without changing `../docs/api-contract.md`.
