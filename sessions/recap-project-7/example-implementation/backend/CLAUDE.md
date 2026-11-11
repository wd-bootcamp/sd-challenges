# Backend

Express 5 JSON API with MongoDB (mongoose), TypeScript strict, ESM. Runs with `tsx`. Base path `/api`, port 3001.

## Commands

- `npm run dev`: start with restart on changes (I run this, not you)
- `npm run typecheck`: type check
- `npm run test:run`: unit tests, once
- `npm run seed`: replace all books with `src/seed.json` (I run this)
- `npm run check`: contract test, calls a server (starts its own on port 3101 unless `BASE_URL` is set, needs the database: I run this)

## Structure

`src/app.ts` exports `app` (no `listen`), `src/index.ts` connects and listens. `routes/books.ts` maps URLs to code, `validation.ts` has `parseBookInput` (pure function), `middleware/errors.ts` has the not found handler and the central error handler. `store/booksStore.ts` is the interface the routes use, `store/mongoBooksStore.ts` is the only code that queries the database. `models/Book.ts` is the mongoose model, `db.ts` connects.

## Conventions

- Routes only call `booksStore` and `parseBookInput`. Errors are answered as `{ "error": "<message>" }`, unexpected ones go to the central handler.
- Responses follow `../docs/api-contract.md` exactly: `id` as string, no `_id`, no `__v`.
- Configuration only from environment variables (`.env.example` lists them), loaded with `--env-file-if-exists=.env`.
- No `any` in new code. New validation rules get a unit test first.

## Off limits

- Do not read `.env`. Do not start the server against my database.
- Do not change the contract without changing `../docs/api-contract.md`.
