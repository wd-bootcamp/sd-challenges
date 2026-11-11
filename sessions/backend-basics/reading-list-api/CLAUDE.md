# Reading List API

A small JSON API for the Reading List, built with Express 5 and TypeScript. It is read-only and keeps no state. The data is in `src/seed.json`.

## Commands

- `npm run dev`: start the server on http://localhost:3001 and restart it on changes. It never finishes, so do not run it in the foreground. Ask the user to start it, or start it in the background.
- `npm run check`: call the **running** server and report pass or fail for every route. Needs `npm run dev` in another terminal.
- `npm run typecheck`: check the types
- Run `npm run typecheck` and `npm run check` before you say a task is done.

## Stack

- Node.js 22, ES modules, TypeScript with `strict`. Server code runs with `tsx`, there is no build step.
- Express 5 (`npm i express`, types with `npm i -D @types/express`). Install nothing else without asking.

## Rules

- The Express app lives in `src/app.ts` and is exported as `app`. `src/index.ts` only imports `app` and calls `listen`.
- The port is `process.env.PORT` or `3001`, written in one place (`src/index.ts`).
- The books come from `src/seed.json`. Import the file, do not copy its data into the code. Do not change `src/seed.json`, `src/types.ts` or `scripts/check.ts`.
- Base path of all routes: `/api`. Every response is JSON, sent with `response.json(...)` and the correct status code.
- Errors look like `{ "error": "<message>" }`. Unknown routes answer `404` with `{ "error": "Not found" }`, the handler comes after all routes.
- Name the parameters `request` and `response`, not `req` and `res`.
- No `any`. Type what is not obvious.
- Do not add routes that were not asked for. No `cors`, no authentication, no database.
- Never create or commit a `.env` file or secrets.
