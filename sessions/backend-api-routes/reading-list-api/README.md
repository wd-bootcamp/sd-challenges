# Reading List API: Start

You build the **REST API of the Reading List**: Express 5, TypeScript, data in memory. The starter is a small Express app that already answers a few requests. You add the missing routes **by hand** first, and then extend the API with Claude Code.

This README describes the whole task. Read it completely before you start.

## The task

| Challenge | Goal                                                           |          |
| --------- | -------------------------------------------------------------- | -------- |
| 1         | Four small routes by hand: `GET /:id`, `POST`, `PUT`, `DELETE` | required |
| 2         | Sorting and paging with Claude Code                            | optional |

The starter already has `GET /api/health`, `GET /api/books` (with `?status=`), `GET /api/books/count`, the 404 handler and the error handler. The books live in the array `books` in `src/routes/books.ts`. `cors` is set up for the frontend you build later, you do not need to touch it. **Do not change** `types.ts` and `seed.json`.

## The API contract

Base path `/api`, port 3001. All bodies are JSON. A `Book` has exactly the fields `id`, `title`, `author`, `status`, `rating` and `notes`. The `id` is always a string.

| Request                  | Success                                                                                                                                                   | Errors                                 |
| ------------------------ | --------------------------------------------------------------------------------------------------------------------------------------------------------- | -------------------------------------- |
| `GET /api/health`        | 200 `{ "status": "ok" }`                                                                                                                                  |                                        |
| `GET /api/books?status=` | 200 `Book[]`. The filter is optional.                                                                                                                     |                                        |
| `GET /api/books/count`   | 200 `{ "count": <number of books> }`                                                                                                                      |                                        |
| `GET /api/books/:id`     | 200 `Book`                                                                                                                                                | 404 `{ "error": "Book not found" }`    |
| `POST /api/books`        | 201 `Book`. Body: `{ title, author, status?, rating?, notes? }`. The server creates the `id`. Defaults: status `want-to-read`, rating `null`, notes `""`. |                                        |
| `PUT /api/books/:id`     | 200 `Book`. Replaces the editable fields. The `id` never changes, an `id` in the body is ignored.                                                         | 404 `{ "error": "Book not found" }`    |
| `DELETE /api/books/:id`  | 204 without a body                                                                                                                                        | 404 `{ "error": "Book not found" }`    |
| any other route          |                                                                                                                                                           | 404 `{ "error": "Not found" }`         |
| invalid JSON body        |                                                                                                                                                           | 400 `{ "error": "Invalid JSON body" }` |

There is no input validation in this project, on purpose: the API trusts the client. The next session connects the API to a database.

## Challenge 1: Four routes by hand (required)

Write the code yourself, without an agent. Use the Quotes API of the demo as your example, and the Express documentation. If you are stuck, ask Claude Code to **explain** or to give a **hint**, not to write the route.

1. `npm i`, then `npm run dev` (keep it running).
2. Open the Bruno collection in `bruno/` (**Open Collection**, environment `Local`). The requests of the routes you have not built yet fail. They are your to-do list.
3. Build the routes in `src/routes/books.ts`, one after the other. After each route send the matching Bruno request and read the status code:
   - `GET /api/books/:id`: 200 with the book, or 404 `{ "error": "Book not found" }`.
   - `POST /api/books`: read `request.body`, create the book with an `id` (`randomUUID()` from `node:crypto`) and the defaults, 201 with the new book.
   - `PUT /api/books/:id`: 404 if the book does not exist, otherwise replace it (the `id` stays), 200 with the book.
   - `DELETE /api/books/:id`: 404 if the book does not exist, otherwise remove it, 204 without a body.
4. Place `GET /api/books/:id` **after** `GET /api/books/count`. What happens if you swap them? Try it.
5. Create a book, restart the server and list the books again. What happens to your data, and why?
6. Run `npm run typecheck` and commit.

## Challenge 2: Sorting and paging with Claude Code (optional)

Add `?sort=title`, `?limit=` and `?offset=` to `GET /api/books`. Work with Claude Code in **plan mode**:

1. Ask for a plan. Read it, and correct at least one thing before you approve it.
2. Build in small steps. After each step run `npm run typecheck` and the Bruno requests, and read the diff.
3. Add Bruno requests for the new query parameters.

Review the diff: Is the API contract unchanged for the old requests? Did the agent add a layer, a dependency or validation you did not ask for? What does `?limit=abc` do, and what should it do?

## Review your result

- Do the routes use the right status codes (201 for create, 204 without a body for delete, 404 for an unknown id)? Does every error have the form `{ "error": "<message>" }`?
- Does `GET /api/books/count` still work after `GET /api/books/:id` was added? (Express checks routes in order.)
- Are the paths nouns in plural (`/api/books`), with the id in the path and the filter in the query?
- No keys, passwords or tokens in the code, and no `.env` file in the commit.

## What is in the starter

- `src/routes/books.ts`: the router with the array `books` and the routes that exist.
- `src/app.ts`, `src/index.ts`, `src/middleware/errors.ts`: the app, the server and the 404 and error handlers.
- `bruno/`: a Bruno collection with one request for every route.
- `CLAUDE.md`: project rules for the coding agent.

## Development

Node.js 22.22 or newer is required. Install the dependencies with `npm i`.

- `npm run dev` starts the API on http://localhost:3001 and restarts it on changes
- `npm run typecheck` checks the types
