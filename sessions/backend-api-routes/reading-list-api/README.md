# Reading List API: Start

You build the **REST API of the Reading List** with Claude Code: Express 5, TypeScript, data in memory. It continues the API of Backend Basics. Then you connect the React app to your API with `fetch`.

This README describes the whole task. Read it completely before you start.

## The task

### Part 1: The API

You continue the API of Backend Basics. It already answers three requests, and a check script tells you which rules of the contract below your server follows.

You do **not** write the data layer. It is finished and has tests:

- `src/store/booksStore.ts`: `list`, `count`, `get`, `create`, `replace` and `remove`, with the seed data in memory.
- `src/types.ts` and `src/seed.json` (ten books).
- `scripts/check.ts`: the check script (`npm run check`).
- `src/app.ts` has `GET /api/health`, `GET /api/books` (with `?status=`), `GET /api/books/count` and a 404 handler, all in one file.

You direct Claude Code to build the rest: move the books routes into a router, add `q`, `GET /api/books/:id`, `POST`, `PUT` and `DELETE`, the validation, the error handler and CORS. **Do not change** `check.ts`, `types.ts`, `seed.json` or the interface in `booksStore.ts`.

### The API contract

Base path `/api`, port 3001. All bodies are JSON. A `Book` has exactly the fields `id`, `title`, `author`, `status`, `rating` and `notes`. The `id` is always a string.

| Request                                   | Success                                           | Errors                                   |
| ----------------------------------------- | ------------------------------------------------- | ---------------------------------------- |
| `GET /api/health`                         | 200 `{ "status": "ok" }`                          |                                          |
| `GET /api/books?status=<status>&q=<text>` | 200 `Book[]`                                      |                                          |
| `GET /api/books/count`                    | 200 `{ "count": <number> }` (from Backend Basics) |                                          |
| `GET /api/books/:id`                      | 200 `Book`                                        | 404 `{ "error": "Book not found" }`      |
| `POST /api/books`                         | 201 `Book`                                        | 400 `{ "error": "<message>" }`           |
| `PUT /api/books/:id`                      | 200 `Book`                                        | 404 `{ "error": "Book not found" }`, 400 |
| `DELETE /api/books/:id`                   | 204 (no body)                                     | 404 `{ "error": "Book not found" }`      |
| any other route                           |                                                   | 404 `{ "error": "Not found" }`           |

Details:

- `status` is one of `want-to-read`, `reading`, `done`. Both filters of `GET /api/books` are optional. An unknown `status` is a 400. `q` matches the title, ignores upper and lower case and spaces around the text. Both together: the book must match both.
- `POST` takes `{ title, author, status?, rating?, notes? }`. The defaults are `status` `"want-to-read"`, `rating` `null` and `notes` `""`. The server creates the `id`.
- `PUT` replaces the editable fields (`title`, `author`, `status`, `rating`, `notes`) and follows the same rules as `POST`. The `id` never changes, an `id` in the body is ignored.
- **400** when: `title` or `author` is missing or empty, `status` is not one of the three values, `rating` is not `null` and not an integer from 1 to 5, or the body is not valid JSON.
- Every error has the form `{ "error": "<message>" }`.

### Part 2: The React app

The app in `client/` shows the books from `localStorage`. Change it so it uses your API with `fetch`:

- Load the books from `GET /api/books` and show them. Show a loading text and an error message (the `error` of the API, and a clear text when the server is not reachable).
- A status filter that sends `?status=` to the API.
- Add a book (title and author) with `POST`, mark a book as done with `PUT`, delete a book with `DELETE`. After a change, show the new state of the server.
- Put the `fetch` calls in `client/src/api.ts`, not in the components.
- The UI stays unstyled. Styling is not part of this task.

The browser will block the first request. Read the error in the console, and ask Claude to explain it before it fixes it. It is a CORS problem. The fix belongs on the server: the `cors` package, for the origin of the React app only.

### Steps

1. Work in a git repository (`git init -b main`, `git add .`, `git commit -m "Initial commit"`). Install and start:

   ```bash
   npm i
   npm run dev          # keep it running
   npm run check        # in a second terminal
   ```

   Read the result: which rules fail, and why? Some pass already, they come from Backend Basics.

2. Read `CLAUDE.md` and `src/store/booksStore.ts`.
3. Start Claude Code in the project root. Use **plan mode** and ask for a plan for part 1 that builds the API in small slices, for example: the router and the read routes, then `POST` with validation, then `PUT` and `DELETE`, then the error handler and CORS. Read the plan. Correct at least one thing before you approve it.
4. Build slice by slice. After every slice run `npm run check` and read the diff. The number of passing rules must grow, and no rule that passed may fail again.
5. Try the routes yourself, not only with the script: use `curl` or `requests.http` (VS Code with the REST Client extension, or the HTTP client of WebStorm). Send one invalid body and one broken JSON.
6. Part 2: in `client/` run `npm i` and `npm run dev` (the API must run). Plan the change with the agent, build it, and use the app in the browser. Add a book, mark it as done, delete it and reload the page. What stays, what is gone? Restart the server: what happens to your data?
7. Run `npm run typecheck`, `npm run test:run` and `npm run check` in the project root, and `npm run typecheck` and `npm run test:run` in `client/`. Commit when everything passes.

### Review your result

Review the code the agent wrote, not only the result of the script. The script checks what the contract says, it does not check everything on this list.

**Validation**

- Does the validation check the **type** of every field (a title that is the number `5`, a `rating` that is the text `"4"`)? Or does it only check whether the value is truthy?
- Is a body that is not an object (`null`, a list, no body) handled, without a crash?
- Is the same validation used for `POST` and `PUT`, in one place?
- Are unknown fields ignored, so a client cannot set the `id`?

**Status codes and format**

- 201 for create, 204 without a body for delete, 404 for an unknown id, 400 for invalid input. No 200 with an error in the body.
- Does every error have the form `{ "error": "<message>" }`? Do the 404 handler and the error handler come after all routes?
- Does a broken request or a thrown error ever send a stack trace or an internal message to the client?

**Design**

- Does `GET /api/books/count` still work after `GET /api/books/:id` was added? (Express checks routes in order.)
- Do the routes only talk to `booksStore`, and not to a list of their own?
- Are the route paths nouns in plural (`/api/books`), with the id in the path and the filters in the query?
- Is there a dependency you did not expect? Is there an `any` in the diff?

**No secrets, safe defaults**

- No keys, passwords or tokens in the code, no `.env` file in the commit.
- Is CORS limited to the origin of the React app, and not open to every origin (`cors()` without options)?
- Does the server log request bodies or other data that should not be in a log?

### Bonus

- **Unit tests for the validation:** ask the agent for Vitest tests of the validation function. Which cases did it forget? (Tests of the whole API with Supertest come in a later session.)
- **Sorting and paging:** add `?sort=title` and `?limit=` and `?offset=` to `GET /api/books`. What must the validation do with `?limit=abc`?
- **PATCH:** add `PATCH /api/books/:id` that changes only the fields in the body. When is `PATCH` better than `PUT`? Which rules of the contract does it need?
- **Read the other side:** open the network tab in the browser, find the preflight request (`OPTIONS`) for a `POST` and explain why it is sent.

## What is in the starter

- The API: `src/store` (finished), `src/app.ts` and `src/index.ts`, `scripts/check.ts`.
- `client/`: the React app with `useBooks` (localStorage) and tests. It is a separate project with its own `package.json`.
- `CLAUDE.md`: project rules for the coding agent.
- `requests.http`: example requests.

## Development

Node.js 22.22 or newer is required. Install the dependencies with `npm i` in the project root and in `client/`.

In the project root:

- `npm run dev` starts the API on http://localhost:3001 and restarts it on changes
- `npm run check` checks the running server against the contract
- `npm run typecheck` checks the types, `npm run test:run` runs the unit tests once

In `client/`:

- `npm run dev` starts the app on http://localhost:3000
- `npm run typecheck`, `npm run test:run` and `npm run build`
