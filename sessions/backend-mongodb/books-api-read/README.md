# Backend MongoDB: Books API Read

An Express 5 API for the Reading List with TypeScript. It is connected to your Atlas database and **reads** from it: `GET /api/books` and `GET /api/books/count` work. The other four routes (`GET /api/books/:id`, `POST`, `PUT`, `DELETE`) are still empty. Your first challenge is a **minimal implementation of the CRUD functions**. Everything after that is optional.

This README describes the whole task. Read it completely before you start.

## The task

| Challenge | Goal                                       |          |
| --------- | ------------------------------------------ | -------- |
| 1         | Minimal CRUD: get, create, replace, remove | required |
| 2         | A clear start                              | optional |

You validate the API yourself with **Bruno**. There is no Bruno collection in this project: you build your own, request by request, from the API contract below. After every challenge, run your requests again. Challenge 2 is optional.

You can write the code by hand or direct Claude Code. If you use the agent, work in a git repository, read its plan and its diffs, and decide what is accepted.

## The API contract

This contract does not change. The frontend of the Recap Project will rely on it.

| Request                  | Success                                                                                                                      | Errors                              |
| ------------------------ | ---------------------------------------------------------------------------------------------------------------------------- | ----------------------------------- |
| `GET /api/health`        | 200 `{ "status": "ok" }`                                                                                                     |                                     |
| `GET /api/books?status=` | 200 `Book[]`. The filter is optional.                                                                                        |                                     |
| `GET /api/books/count`   | 200 `{ "count": <number of books> }` (from Backend Basics)                                                                   |                                     |
| `GET /api/books/:id`     | 200 `Book`                                                                                                                   | 404 `{ "error": "Book not found" }` |
| `POST /api/books`        | 201 `Book`. Body: `{ title, author, status?, rating?, notes? }`. Defaults: status `want-to-read`, rating `null`, notes `""`. |                                     |
| `PUT /api/books/:id`     | 200 `Book`. Replaces the editable fields. An `id` in the body is ignored.                                                    | 404                                 |
| `DELETE /api/books/:id`  | 204 without a body                                                                                                           | 404                                 |
| any other route          |                                                                                                                              | 404 `{ "error": "Not found" }`      |
| invalid JSON body        |                                                                                                                              | 400 `{ "error": ... }`              |

`Book`: `{ id, title, author, status, rating, notes }`. The `id` is always a string. With MongoDB it is the ObjectId as a hex string. The response has **no** `_id` and **no** `__v`.

There is no input validation in this project, on purpose: the API trusts the client. Only the schema defaults (status, rating, notes) are applied.

## What is in the project

```
src/
  app.ts                      cors, express.json, routes, 404 handler, error handler
  index.ts                    connects to the database, then starts the server (PORT or 3001)
  db.ts                       loads .env, connectToDatabase(): mongoose.connect with MONGODB_URI
  models/Book.ts              the schema, the model BookModel, toBook() (_id becomes id)
  routes/books.ts             booksRouter: calls BookModel directly (this is where you work)
  middleware/errors.ts        notFound and errorHandler
  types.ts                    STATUSES, Status, Book, NewBook
  seed.json                   ten books (the same books as books.json of the last session), nothing imports it
.env.example                  the variables of the app, without secrets
CLAUDE.md                     rules for the agent
```

The routes call the mongoose model `BookModel` directly. There is no store or repository layer in between: a route reads the request, calls one model method, and sends the response. `list` and `count` are done, the other four routes are yours.

## Your React app

The React app from "Backend API Routes" (the folder `client/`) needs no change. The contract and the address (`http://localhost:3001/api`) stay the same, only the data is now kept in MongoDB. Keep `cors` in `src/app.ts`: it allows the ports 3000 and 5173.

## Challenge 1: Minimal CRUD (required)

### Run what exists

1. `npm i`
2. Copy `.env.example` to `.env`. Paste your Atlas connection string as `MONGODB_URI` and add the database name before the `?`:
   `mongodb+srv://<user>:<password>@<cluster-host>/reading-list?retryWrites=true&w=majority`
3. Check that git ignores the file: `git check-ignore .env` prints `.env`.
4. `npm start`. You should see `Connected to MongoDB database "reading-list"`.
5. Open `http://localhost:3001/api/books`. You see the books you imported in Compass. `POST` and `GET /api/books/:id` fail with a 500, because those routes throw "not implemented".

### Implement the four routes

In `src/routes/books.ts`, replace the four `throw` lines with the model methods `findById`, `create`, `findByIdAndUpdate` and `findByIdAndDelete`. Use `GET /api/books` as your example, and `toBook` to turn a document into the `Book` the API sends.

- `GET /api/books/:id` answers with the book, or 404 `{ "error": "Book not found" }` if there is none.
- `POST /api/books` answers 201 with the new book.
- `PUT /api/books/:id` answers with the updated book (`returnDocument: "after"`), or 404.
- `DELETE /api/books/:id` answers 204 if a book was deleted, or 404.

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
| `POST /api/books` with `{ "title": "Piranesi", "author": "Susanna Clarke" }` | 201, the book with the defaults (`want-to-read`, `null`, `""`) |
| `GET /api/books/:id` with the id of the new book                             | 200, the same book                                             |
| `GET /api/books/000000000000000000000000`                                    | 404 `{ "error": "Book not found" }`                            |
| `PUT /api/books/:id` with a changed title, status and rating                 | 200, the replaced book, the same `id`                          |
| `DELETE /api/books/:id`                                                      | 204 without a body                                             |
| `GET /api/books/:id` again                                                   | 404                                                            |

Then look in **Compass**:

1. After the `POST`, **refresh Compass**: the document is there.
2. After the `PUT` and the `DELETE`, refresh again.
3. Edit a title in Compass and `GET` the book again.
4. Stop the server and start it again: the books are still there.

> 💡 Save the collection, you reuse it in the next challenges.

## Challenge 2 (optional): A clear start

Start the server with a wrong password in `.env`. What do you see? Check it by hand (Bruno cannot help when the server does not start). Make `connectToDatabase` fail after 5 seconds instead of 30 (`serverSelectionTimeoutMS`), say that `MONGODB_URI` is missing when it is not set, and make `src/index.ts` stop with a clear message and exit code 1. The message must never contain the connection string.

## Review your result (optional)

Read the whole diff, not only the answers of Bruno.

**Secrets**

- Is `.env` in `.gitignore`? Does `git status` show it? Does `git log -p` contain a connection string?
- Does `.env.example` hold only placeholders?
- Does any code, log message or error response print the connection string?
- Is there a fallback like `process.env.MONGODB_URI ?? "mongodb+srv://..."`?

**Errors**

- Does a database error give the client a generic 500 and not the internal message?
- Are errors handled in one place (the error middleware) and not copied into every route?

**Code**

- Is there a layer you did not need (a store, a repository, a service)? Is there an unused dependency, an `any` or leftover debug logging?

Write down two findings. Fix at least one.

## Bonus (optional)

- **`toJSON` instead of `toBook`.** Set a `toJSON` transform on the schema (`versionKey: false`, `_id` to `id`). What is better, what is worse than the `toBook` function?
- **Timestamps.** Add `createdAt` and `updatedAt` to the schema, but keep them out of the JSON, because the contract has fixed fields.
- **Shutdown.** Close the HTTP server and the database connection when the process gets `SIGINT` or `SIGTERM`.
- **Second collection.** Design a `notes` collection for several notes per book. Write the schema with a reference to the book.

## Development

Node.js 22.22 or newer is required. Install the dependencies with `npm i` first.

- `npm start` starts the API, `npm run dev` restarts it on changes
- `npm run typecheck` checks the types

> 💡 To test against another database, set `MONGODB_URI` in the terminal: a value from the terminal wins over `.env`.
