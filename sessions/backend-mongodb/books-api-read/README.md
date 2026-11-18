# Backend MongoDB: Books API Read

An Express 5 API for the Reading List with TypeScript. It is connected to your Atlas database and **reads** from it: `GET /api/books` and `GET /api/books/count` work. The other four store functions are still empty. Your first challenge is a **minimal implementation of the CRUD functions**. Everything after that is optional.

This README describes the whole task. Read it completely before you start.

## The task

| Challenge | Goal                                       |          |
| --------- | ------------------------------------------ | -------- |
| 1         | Minimal CRUD: get, create, replace, remove | required |
| 2         | A bad id is a 404, not a 500               | optional |
| 3         | Search text is text, not a pattern         | optional |
| 4         | The schema checks the data                 | optional |
| 5         | A clear start                              | optional |

You validate the API yourself with **Bruno**. There is no Bruno collection in this project: you build your own, request by request, from the API contract below. After every challenge, run your requests again. Challenges 2 to 5 are optional: do them in order if you have time.

You can write the code by hand or direct Claude Code. If you use the agent, work in a git repository, read its plan and its diffs, and decide what is accepted.

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

## What is in the project

```
src/
  app.ts                      cors, express.json, routes, 404 handler, error handler
  index.ts                    connects to the database, then starts the server (PORT or 3001)
  db.ts                       loads .env, connectToDatabase(): mongoose.connect with MONGODB_URI
  models/Book.ts              the schema, the model BookModel, toBook() (_id becomes id)
  routes/books.ts             booksRouter: list, count, get, create, replace, delete
  middleware/errors.ts        notFound and errorHandler
  validation.ts               parseBookInput: checks the body of POST and PUT
  store/booksStore.ts         the BooksStore interface, the in-memory store (for the tests), the `booksStore` instance
  store/mongoBooksStore.ts    the BooksStore on top of MongoDB (this is where you work)
  types.ts                    STATUSES, Status, Book, NewBook
  seed.json                   ten books (the same books as books.json of the last session)
.env.example                  the variables of the app, without secrets
CLAUDE.md                     rules for the agent
```

The routes only call the `booksStore`. It has this interface:

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

`mongoBooksStore` implements it with mongoose. Today `list` and `count` are done, the rest is yours. The in-memory `createBooksStore` stays, the unit tests use it. The routes and `validation.ts` do not change in this session.

## Your React app

The React app from "Backend API Routes" (the folder `client/`) needs no change. The contract and the address (`http://localhost:3001/api`) stay the same, only the data is now kept in MongoDB. Keep `cors` in `src/app.ts`: it allows the ports 3000 and 5173.

## Challenge 1: Minimal CRUD (required)

### Run what exists

1. `npm i`
2. Copy `.env.example` to `.env`. Paste your Atlas connection string as `MONGODB_URI` and add the database name before the `?`:
   `mongodb+srv://<user>:<password>@<cluster-host>/reading-list?retryWrites=true&w=majority`
3. Check that git ignores the file: `git check-ignore .env` prints `.env`.
4. `npm start`. You should see `Connected to MongoDB database "reading-list"`.
5. Open `http://localhost:3001/api/books`. You see the books you imported in Compass. `POST` and `GET /api/books/:id` fail with a 500, because the store functions throw "not implemented".

### Implement the four functions

In `src/store/mongoBooksStore.ts`, implement `get`, `create`, `replace` and `remove` with the model methods `findById`, `create`, `findByIdAndUpdate` and `findByIdAndDelete`. Use `list` as your example, and `toBook` to turn a document into the `Book` the API sends.

- `get` resolves to the book, or `undefined` if there is none.
- `create` resolves to the new book.
- `replace` resolves to the updated book (`returnDocument: "after"`), or `undefined`.
- `remove` resolves to `true` if a book was deleted, `false` if there was none.

Keep it minimal. Do not add any checks yet.

### Validate with Bruno

Create a Bruno collection `books-api` (you decide the folder, keep it **outside** the repository or without secrets: there are none in these requests). Add one request per row of the contract and run them against `http://localhost:3001`. For every request, check the **status code** and the **body** against the contract. Use the Tests tab of Bruno if you like, for example `expect(res.status).to.equal(201)`.

Requests to build for challenge 1:

| Request                                                                      | Expected                                                       |
| ---------------------------------------------------------------------------- | -------------------------------------------------------------- |
| `GET /api/health`                                                            | 200 `{ "status": "ok" }`                                       |
| `GET /api/books`                                                             | 200, an array of books, each with `id` and without `_id`       |
| `GET /api/books/count`                                                       | 200 `{ "count": <number> }`, the same as the list length       |
| `GET /api/books?status=done`                                                 | 200, only books with the status `done`                         |
| `GET /api/books?q=dune`                                                      | 200, only books whose title contains "dune", ignoring case     |
| `POST /api/books` with `{ "title": "Piranesi", "author": "Susanna Clarke" }` | 201, the book with the defaults (`want-to-read`, `null`, `""`) |
| `GET /api/books/:id` with the id of the new book                             | 200, the same book                                             |
| `GET /api/books/000000000000000000000000`                                    | 404 `{ "error": "Book not found" }`                            |
| `PUT /api/books/:id` with a changed title, status and rating                 | 200, the replaced book, the same `id`                          |
| `DELETE /api/books/:id`                                                      | 204 without a body                                             |
| `GET /api/books/:id` again                                                   | 404                                                            |
| `POST /api/books` with `{ "author": "A" }`                                   | 400 `{ "error": ... }`                                         |
| `POST /api/books` with `{ "title": "x", "author": "A", "rating": 6 }`        | 400 `{ "error": ... }`                                         |

Then look in **Compass**:

1. After the `POST`, **refresh Compass**: the document is there.
2. After the `PUT` and the `DELETE`, refresh again.
3. Edit a title in Compass and `GET` the book again.
4. Stop the server and start it again: the books are still there.

> 💡 Save the collection, you reuse it in the next challenges. Your requests that fail now (a malformed id, special characters in `q`) show what the optional challenges fix.

## Challenge 2 (optional): A bad id is a 404

`GET /api/books/abc` fails with a 500: mongoose cannot turn `abc` into an ObjectId and throws a `CastError`. A book with the id `abc` does not exist, so the answer is 404.

Change `mongoBooksStore` so that `get`, `replace` and `remove` resolve to `undefined` or `false` for an id that is not an ObjectId (24 hexadecimal characters). They must never throw. Do not change the routes.

Add these requests to your Bruno collection. You are done when all of them answer with a 404 `{ "error": "Book not found" }`:

- `GET /api/books/abc`
- `PUT /api/books/abc` with a valid body
- `DELETE /api/books/abc`
- `GET /api/books/12345`

## Challenge 3 (optional): Search text is text

`GET /api/books?q=(` fails and `?q=.*` matches every book, because the text of the user becomes a regular expression. Escape the text before you use it in `$regex`.

Add these requests to your Bruno collection. You are done when the first answers with a 200 and an empty array, and the second does not return every book:

- `GET /api/books?q=(`
- `GET /api/books?q=.*`
- `GET /api/books?q=dune` still works

Then answer: what could an attacker do with an unescaped pattern?

## Challenge 4 (optional): The schema checks the data

Right now the schema only lists the fields. `parseBookInput` in Express checks the input, but other writers do not use it: a script, a later job, and **you in Compass**. Prove it: in Compass, insert a book with `"title": 42` and `"rating": 9`. Does the API still return it?

Make the schema the second line of defense:

- `title` and `author`: required, trimmed.
- `status`: only the values of `STATUSES`, default `want-to-read`.
- `rating`: default `null`, between 1 and 5, an integer (a `null` stays allowed).
- `notes`: default `""`.
- `replace` uses `runValidators: true`. Without it, an update skips the schema rules.
- In `src/middleware/errors.ts`, a mongoose `ValidationError` becomes a 400 `{ "error": "..." }`.

Check in Bruno that the contract still holds (`POST` with a missing title, an invalid status and a rating of 6 are 400, the valid requests of challenge 1 still work). Then check the schema on its own: call `booksStore.replace` with an empty title from a small script (not through the route). Is the document changed? Remove `runValidators` and try again.

## Challenge 5 (optional): A clear start

Start the server with a wrong password in `.env`. What do you see? Check it by hand (Bruno cannot help when the server does not start). Make `connectToDatabase` fail after 5 seconds instead of 30 (`serverSelectionTimeoutMS`), say that `MONGODB_URI` is missing when it is not set, and make `src/index.ts` stop with a clear message and exit code 1. The message must never contain the connection string.

## Review your result (optional)

Read the whole diff, not only the answers of Bruno.

**Secrets**

- Is `.env` in `.gitignore`? Does `git status` show it? Does `git log -p` contain a connection string?
- Does `.env.example` hold only placeholders?
- Does any code, log message or error response print the connection string?
- Is there a fallback like `process.env.MONGODB_URI ?? "mongodb+srv://..."`?

**Validation and errors**

- Does `PUT` write an empty title if you remove `runValidators`?
- Is `request.body` or `request.query` passed to a query as it is? A query value must be a string, not an object.
- Does a database error give the client a generic 500 and not the internal message?
- Are errors handled in one place (the error middleware) and not copied into every route?

**Code**

- Did the routes stay untouched? Is there an unused dependency, an `any` or leftover debug logging?

Write down two findings. Fix at least one.

## Bonus (optional)

- **`toJSON` instead of `toBook`.** Set a `toJSON` transform on the schema (`versionKey: false`, `_id` to `id`). What is better, what is worse than the `toBook` function?
- **Timestamps.** Add `createdAt` and `updatedAt` to the schema, but keep them out of the JSON, because the contract has fixed fields.
- **Shutdown.** Close the HTTP server and the database connection when the process gets `SIGINT` or `SIGTERM`.
- **Second collection.** Design a `notes` collection for several notes per book. Write the schema with a reference to the book.

## Development

Node.js 22.22 or newer is required. Install the dependencies with `npm i` first.

- `npm start` starts the API, `npm run dev` restarts it on changes
- `npm run typecheck` checks the types, `npm run test:run` runs the unit tests once

> 💡 To test against another database, set `MONGODB_URI` in the terminal: a value from the terminal wins over `.env`.
