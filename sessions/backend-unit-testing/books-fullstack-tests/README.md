# Backend Unit Testing: Books Fullstack Tests

The Reading List API with its first route test. This is the end of the demo and the **start of the exercise**. The routes call `booksStore`, and the test file replaces it with the in-memory store (`vi.mock`), so a test needs no port and no database. The app code did not change.

This README describes the whole task. Read it completely before you start. **Only challenge 1 and the break-it check are required. Everything else is optional.**

## Run it

```bash
npm i
npm run typecheck
npm run test:run   # 40 tests: 39 existing ones and the route test
```

The tests need no `.env`. Use `npm run test:run`: `npm test` starts the watch mode and never ends. The page in `client/` is given and not used today.

## The task

| Challenge | Goal                                                              |          |
| --------- | ----------------------------------------------------------------- | -------- |
| 1         | Three more route tests: create and get one, a 404, a 400          | required |
| Break it  | Break `src/` four times on purpose and check that a test goes red | required |
| 2         | More error cases, with a fresh store for every test               | optional |
| 3         | Test the error handler and the schema                             | optional |
| 4         | The real MongoDB store with `mongodb-memory-server`               | optional |
| 5         | Coverage as a map of what is not tested                           | optional |

You can write the tests by hand or direct Claude Code. If you use the agent, work in a git repository, read every diff, and let the break-it table decide whether a test is good.

## The API contract

The tests check this contract. It does not change.

| Request                     | Success                                                         | Errors                                                                 |
| --------------------------- | --------------------------------------------------------------- | ---------------------------------------------------------------------- |
| `GET /api/books?status=&q=` | 200 `Book[]`                                                    | 400 `{ "error": ... }` for an unknown `status`                         |
| `GET /api/books/count`      | 200 `{ "count": <number> }`                                     |                                                                        |
| `GET /api/books/:id`        | 200 `Book`                                                      | 404 `{ "error": "Book not found" }`                                    |
| `POST /api/books`           | 201 `Book`. Body: `{ title, author, status?, rating?, notes? }` | 400 `{ "error": ... }`, for example `{ "error": "title is required" }` |
| `PUT /api/books/:id`        | 200 `Book`                                                      | 400, 404                                                               |
| `DELETE /api/books/:id`     | 204 without a body                                              | 404                                                                    |
| invalid JSON body           |                                                                 | 400 `{ "error": "Invalid JSON body" }`                                 |

`Book`: `{ id, title, author, status, rating, notes }`.

## What is in the project

```
src/
  app.test.ts                 the route test (you add three more here)
  app.ts                      cors, express.json, routes, 404 handler, error handler
  routes/books.ts             the routes (not changed in this session)
  store/booksStore.ts         the BooksStore interface, the in-memory store, the `booksStore` instance (MongoDB)
  validation.ts               parseBookInput
  validation.test.ts          28 unit tests (exist)
  store/booksStore.test.ts    11 unit tests (exist)
vitest.config.ts              only src/**/*.test.ts, and a dummy MONGODB_URI (tests never use your .env)
CLAUDE.md                     rules for the agent, including the test rules
```

## Challenge 1: Three more route tests (required)

Read `src/app.test.ts` first. Add three tests to the same `describe`, each with `await`, each checking the status **and** the body:

1. **Create and get one.** `POST /api/books` with a title and an author answers 201 with the title. Then `GET /api/books/:id` with the new `id` answers 200 with the same title.
2. **A book that does not exist.** `GET /api/books/missing` answers 404 `{ "error": "Book not found" }`.
3. **Invalid input.** `POST /api/books` without a title answers 400 `{ "error": "title is required" }`.

Hints: `request(app).post("/api/books").send({ ... })` sends JSON. All tests of the file share one store (the mock is created once). **Do not count books** in a test, another test may have changed the number.

Run `npm run test:run`: 43 tests are green.

## Break it (required)

A green test proves nothing until you have seen it fail. For each row: make the change in `src/`, run `npm run test:run`, check that **a test of `src/app.test.ts` is red**, then revert the change with `git checkout src` or by hand.

| #   | Break                                                                        | Caught by   |
| --- | ---------------------------------------------------------------------------- | ----------- |
| 1   | In `POST`, change `status(201)` to `status(200)`                             | create test |
| 2   | `GET /:id` answers 200 for a missing book (remove the 404 `if` block)        | 404 test    |
| 3   | Remove `app.use(express.json())` in `src/app.ts`                             | create test |
| 4   | The check `"error" in result` in `POST` never fires (for example `&& false`) | 400 test    |

If a row stays green, your test is too weak or it misses an `await`. Fix the test, not the code.

## Challenge 2 (optional): More error cases with a fresh store

All tests share one store, so a test that expects "ten books" breaks when the order changes: run `npx vitest run --sequence.shuffle` a few times. Fix it: change `src/app.ts` and `src/routes/books.ts` so that `createApp(store)` and `createBooksRouter(store)` receive the store, and keep `export const app = createApp(booksStore)`. A test then calls `createApp(createBooksStore())` in `beforeEach`.

Then test: an invalid JSON body (400 `Invalid JSON body`), `PUT` (200, 404), `DELETE` (204, then 404), `?status=finished` (400), nothing is stored after a 400, and a store that throws becomes a 500 `{ "error": "Internal server error" }` without details (silence the `console.error` of the error handler with `vi.spyOn`).

## Challenge 3 (optional): The error handler and the schema

Test `errorHandler` of `src/middleware/errors.ts` with a stub response: `{ status: vi.fn(), json: vi.fn() }`, where `status` returns the object. Get a mongoose `ValidationError` with `await new BookModel({ title: "", author: "" }).validate().catch((e) => e)` (use `validate()`, not `validateSync()`). Test the defaults and invalid values of the schema (`rating: 9`, `rating: 2.5`, `status: "finished"`). No database is needed.

## Challenge 4 (optional): The real store in memory

Every test so far uses the in-memory fake, so none of them would notice a bug in `mongoBooksStore`. `mongodb-memory-server` starts a real `mongod` in memory on a random port. The data is gone after the run, and it cannot touch Atlas. `npm i -D mongodb-memory-server` downloads a binary of about 140 MB, so start it early.

Test `src/store/mongoBooksStore.ts`: `id` instead of `_id`, a malformed id (`abc`) resolves to `undefined` or `false`, the search text `(` is escaped, `replace` validates. Connect with `mongoose.connect(server.getUri("reading-list-test"))`, **never** with `connectToDatabase()`. In `beforeEach`, check that the database name ends with `-test` before `deleteMany`. Stop the server in `afterAll`.

## Challenge 5 (optional): Coverage

`npm i -D @vitest/coverage-v8@2.1.9`, then `npx vitest run --coverage`. Read the table as a map: which lines of `src/routes/books.ts` are not run by any test? Write one test for a line you find. Coverage tells you what is **not** tested. It does not tell you that the rest is tested well.

## Review your tests (optional)

- Which of your tests would still pass if `mongoBooksStore` were broken? (All of them: the fake is not MongoDB.)
- What happened when you ran the tests with `--sequence.shuffle`?
- Does every `request(app)` have an `await`? Does every test check a body, not only a status?
- Did you change anything in `src/routes` or `src/validation.ts` to make a test green? Why?
- Does a test import `src/index.ts` or `src/db.ts`? Could a test reach your Atlas database?

Write down two findings. Fix at least one.

## Development

Node.js 22.22 or newer is required. `npm run typecheck` checks the types, `npm run test:run` runs the tests once.
