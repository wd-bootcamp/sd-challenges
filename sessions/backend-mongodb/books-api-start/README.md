# Backend MongoDB: Books API Start

An Express 5 API for the Reading List with TypeScript. All routes work, but the books live **in memory**: stop the server and they are gone. Today you replace the in-memory store with **MongoDB**, using Claude Code, and you review the result.

This README describes the whole task. Read it completely before you start.

## The task

Make the books persistent. After your change:

- The API talks to MongoDB with `mongoose`. The connection string comes from `.env`.
- `npm run seed` fills the database with the ten books of `src/seed.json`.
- The API behaves **exactly** as before (see the contract below). `npm run check`, `npm run typecheck` and `npm run test:run` pass.
- No secret is in the repository.

You do not write the code by hand. You direct the agent, read its plan and its diffs, and decide what is accepted.

## The API contract

This contract does not change. The frontend of the Recap Project will rely on it.

| Request                     | Success                                                                                                                                              | Errors                                                                                                                                                                                     |
| --------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| `GET /api/health`           | 200 `{ "status": "ok" }`                                                                                                                             |                                                                                                                                                                                            |
| `GET /api/books?status=&q=` | 200 `Book[]`. Both filters are optional. `q` matches the title only, case-insensitive, trimmed.                                                      | 400 `{ "error": ... }` for an unknown `status` or for a `q` that is not a single text (`?q=a&q=b`)                                                                                         |
| `GET /api/books/count`      | 200 `{ "count": <number of books> }` (from Backend Basics)                                                                                           |                                                                                                                                                                                            |
| `GET /api/books/:id`        | 200 `Book`                                                                                                                                           | 404 `{ "error": "Book not found" }`                                                                                                                                                        |
| `POST /api/books`           | 201 `Book`. Body: `{ title, author, status?, rating?, notes? }`. Defaults: status `want-to-read`, rating `null`, notes `""`.                         | 400 `{ "error": ... }` if title or author is missing or empty, status is not `want-to-read`, `reading` or `done`, rating is not `null` or an integer from 1 to 5, or notes is not a string |
| `PUT /api/books/:id`        | 200 `Book`. Replaces the editable fields, same validation as POST. An `id` in the body is ignored. The body is validated before the id is looked up. | 400, 404                                                                                                                                                                                   |
| `DELETE /api/books/:id`     | 204 without a body                                                                                                                                   | 404                                                                                                                                                                                        |
| any other route             |                                                                                                                                                      | 404 `{ "error": "Not found" }`                                                                                                                                                             |
| invalid JSON body           |                                                                                                                                                      | 400 `{ "error": ... }`                                                                                                                                                                     |

`Book`: `{ id, title, author, status, rating, notes }`. The `id` is always a string. With MongoDB it is the ObjectId as a hex string. The response has **no** `_id` and **no** `__v`.

An id that MongoDB cannot read as an ObjectId (for example `/api/books/abc`) is a book that does not exist: 404, never 500. `title` and `author` are stored trimmed.

## What is in the starter

This is the solution of the session "Backend API Routes", plus a few files for MongoDB. The API works, but the books live **in memory**.

```
src/
  app.ts                   cors, express.json, routes, 404 handler, error handler
  index.ts                 starts the server (PORT or 3001)
  routes/books.ts          booksRouter: list, count, get, create, replace, delete
  middleware/errors.ts     notFound and errorHandler
  validation.ts            parseBookInput: checks the body of POST and PUT
  store/booksStore.ts      the BooksStore interface, the in-memory store, the `booksStore` instance
  types.ts                 STATUSES, Status, Book, NewBook
  seed.json                ten books (the same books as books.json of the last session)
scripts/
  check.ts                 checks every rule of the contract (npm run check)
  seed.ts                  loads the seed data into the store (useless while the store is in memory)
.env.example               the variables of the app, without secrets
CLAUDE.md                  rules for the agent
requests.http              example requests for the REST Client extension of VS Code
```

The routes only call the singleton `booksStore`. It has this interface (the same as in "Backend API Routes"):

```ts
export interface BooksStore {
  list(filter?: { status?: Status; q?: string }): Promise<Book[]>;
  count(): Promise<number>;
  get(id: string): Promise<Book | undefined>;
  create(input: NewBook): Promise<Book>;
  replace(id: string, input: NewBook): Promise<Book | undefined>; // undefined: id not found
  remove(id: string): Promise<boolean>; // false: id not found
}
```

`createBooksStore(initial)` builds the in-memory version, the unit tests use it. Your MongoDB store keeps the interface: an unknown **or malformed** id resolves to `undefined` or `false` and never throws.

## Your React app

The React app from "Backend API Routes" (the folder `client/`) needs no change. The contract and the address (`http://localhost:3001/api`) stay the same, only the data is now kept in MongoDB. Stop the old API, start the new one on port 3001 and start your client as before (`npm run dev` in `client/`). Keep `cors` in `src/app.ts`: it allows the origins of the client (ports 3000 and 5173). If your client lives in another folder, it only needs the API on port 3001 (or `VITE_API_URL`).

## Steps

### 1. Look at the starter

```bash
npm i
npm start
```

In a second terminal, call the API (for example `curl localhost:3001/api/books`). Add a book with `POST`, stop the server, start it again: the book is gone.

Run the check. It starts its own server on port 3101, so you can stop the first one:

```bash
npm run check
```

It runs 52 rules and **one fails**: "a book created before a restart is still there after the restart". Your goal is to make it pass without breaking the other 51.

### 2. Get a database

Use the MongoDB Atlas cluster from the session "Databases and MongoDB".

1. Create a database user for this app (Database Access) and allow your IP address (Network Access).
2. Copy the connection string of your cluster (Connect, Drivers) and add the database name before the `?`: `mongodb+srv://<user>:<password>@<cluster-host>/reading-list?retryWrites=true&w=majority`.
3. Copy `.env.example` to `.env` and paste the string as `MONGODB_URI`.
4. Check that git ignores the file: `git check-ignore .env` prints `.env`.

> 💡 Your cluster may already hold the exercise data of the last session: the database `reading-list` with the collection `books`. Your app uses the same names. `npm run seed` (once it exists) **deletes all books** in that database and inserts the ten books of `src/seed.json`, the same books as in the last session. If you prefer not to touch your old data, use another database name in `MONGODB_URI`, for example `reading-list-api`.

> 💡 You can also run MongoDB locally: `mongod --dbpath <an empty folder>` and `MONGODB_URI=mongodb://127.0.0.1:27017/reading-list`.

### 3. Prepare the agent

Open the project in a git repository (`git init -b main`, add everything, commit). Start Claude Code and add the MongoDB decisions to `CLAUDE.md` **before** you build. At least:

- which library and which version (`mongoose`),
- that the data layer stays behind the `booksStore` of `src/store/booksStore.ts`,
- how the id is returned (`id`, not `_id`, and no `__v`).

The agent does **not** need to read your `.env`. The `CLAUDE.md` of the starter forbids it. You can also deny it in the permissions (Week 9).

### 4. Plan, then build

1. Ask the agent for a plan in **plan mode**. Read the plan. It should name the files to change, and it should leave `src/routes/books.ts` and `src/validation.ts` alone. Correct what is wrong before you approve.
2. Build in small steps and commit after each one: connect to the database, schema and model, the store, error handling for bad ids and failed validation, the seed script.
3. The server must **connect first and then listen**. If the connection fails, it must stop with a clear message that does not contain the connection string.

### 5. Verify

- `npm run seed` twice. Look at the data in Atlas (Browse Collections) or with `mongosh`. The collection must hold ten books, not twenty.
- `npm run check` shows no failure.
- Call the API yourself: `GET /api/books/abc` and `GET /api/books/000000000000000000000000` are both 404. `POST` with a missing title is 400.
- Start the server with a wrong password in `.env`. What do you see?
- `npm run typecheck` has no type errors.

### 6. Review the result

Read the whole diff, not only the green check. Go through this list:

**Secrets**

- Is `.env` in `.gitignore`? Does `git status` show it? Does `git log -p` contain a connection string anywhere?
- Does `.env.example` hold only placeholders?
- Does any code, log message or error response print the connection string or the password?
- Did the agent hard-code a connection string as a fallback (`process.env.MONGODB_URI ?? "mongodb+srv://..."`)?

**Validation**

- Are the rules of the contract still checked? Where: in Express, in the schema, in both?
- Does the schema have `required`, `enum` for the status, `min` and `max` for the rating, and defaults?
- Does the update call use `runValidators: true`? Without it, `PUT` can write an empty title.
- Is `request.body` or `request.query` passed to a query as it is? A query value must be a string, not an object.
- Is the `q` filter escaped before it becomes a regular expression? Try `?q=.*` and `?q=(`.

**Error handling**

- Does an invalid id (`/api/books/abc`) end in 404 and not in 500, for `GET`, `PUT` and `DELETE`? Does the store resolve to `undefined` or `false` instead of throwing?
- Does `count()` ask the database (`countDocuments`) and not load every book?
- Does the server connect before it listens? What happens if the database is down at start?
- Does a database error give the client a generic 500 and not the internal message?
- Are errors handled in one place (the error middleware) and not copied into every route?
- Did the agent wrap every route in `try/catch` that Express 5 already handles?

**Id mapping**

- Is there an `id` string in every response and no `_id` and no `__v`? Also in the list, after `POST` and after `PUT`?
- Is the mapping done once (the `toJSON` transform of the schema) and not by hand in every route?

**Code**

- Did the routes stay untouched? Is there an unused dependency, an `any` or leftover debug logging in the diff?
- Does the agent's summary match the diff?

Write down two findings. Fix at least one with the agent.

## Bonus

- **Break it on purpose.** Remove `runValidators: true` and send a `PUT` with an empty title straight to the store (not through `parseBookInput`). What happens? Put it back.
- **Index.** Add an index for `status`. Check with `mongosh` (`db.books.getIndexes()`) that it exists. Why does an index on `title` not help the case-insensitive search?
- **Shutdown.** Close the HTTP server and the database connection when the process gets `SIGINT` or `SIGTERM`.
- **Timestamps.** Add `createdAt` and `updatedAt` to the schema, but keep them out of the JSON, because the contract has fixed fields.

## Development

Node.js 22.22 or newer is required. Install the dependencies with `npm i` first.

- `npm start` starts the API, `npm run dev` restarts it on changes
- `npm run seed` replaces all books with the seed data
- `npm run typecheck` checks the types, `npm run test:run` runs the unit tests once
- `npm run check` checks the API contract. It starts its own server on port 3101. With `BASE_URL=http://localhost:3001 npm run check` it checks a server that is already running, without the restart check.

> 💡 `npm run check` creates and deletes its own books (title starts with `check-api`). It uses the database of your `.env`. To test against another database, set `MONGODB_URI` in the terminal: a value from the terminal wins over `.env`.
