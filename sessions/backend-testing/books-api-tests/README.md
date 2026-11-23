# Backend Testing: Books API Tests

The end of the demo and the **start of the exercise**: the Reading List API with its first route test. The test file replaces `BookModel` with stubs (`vi.mock`), so a test needs no port and no database. The app code did not change.

Read this README completely before you start. **Only challenge 1 and "Break it" are required. Challenge 2 and 3 are optional.**

## Run it

```bash
npm i
npm run typecheck
npm run test:run   # 1 test
```

Use `npm run test:run`: `npm test` starts the watch mode and never ends. The tests need no `.env`.

## The task

| Challenge | Goal                                              |          |
| --------- | ------------------------------------------------- | -------- |
| 1         | Three more tests: get one, a 404, create one      | required |
| Break it  | Break `src/` three times and see a test go red    | required |
| 2         | `PUT`, `DELETE`, broken JSON and a database error | optional |
| 3         | Coverage as a map of what is not tested           | optional |

You can write the tests by hand or direct Claude Code. If you use the agent, work in a git repository, read every diff, and let "Break it" decide whether a test is good.

## The API contract

The tests check this contract. It does not change.

| Request                 | Success                     | Errors                                 |
| ----------------------- | --------------------------- | -------------------------------------- |
| `GET /api/books`        | 200 `Book[]`                |                                        |
| `GET /api/books/count`  | 200 `{ "count": <number> }` |                                        |
| `GET /api/books/:id`    | 200 `Book`                  | 404 `{ "error": "Book not found" }`    |
| `POST /api/books`       | 201 `Book`                  |                                        |
| `PUT /api/books/:id`    | 200 `Book`                  | 404 `{ "error": "Book not found" }`    |
| `DELETE /api/books/:id` | 204 without a body          | 404 `{ "error": "Book not found" }`    |
| body is not valid JSON  |                             | 400 `{ "error": "Invalid JSON body" }` |

`Book`: `{ id, title, author, status, rating, notes }`. There is no input validation, on purpose.

## Challenge 1: Three more tests (required)

Read `src/app.test.ts` first. Add three tests to the same `describe`. Each has an `await` and checks the status **and** the body:

1. **Get one.** `findById` resolves with a book: `GET /api/books/1` answers 200 with the book.
2. **A book that does not exist.** `findById` resolves with `null`: `GET /api/books/missing` answers 404 `{ "error": "Book not found" }`.
3. **Create one.** `create` resolves with a book: `POST /api/books` answers 201 with the book. Also check that `model.create` was called with the body you sent.

Hints: `request(app).post("/api/books").send({ ... })` sends JSON. `model.findById.mockResolvedValue(...)` sets the answer of the stub. `beforeEach` resets all stubs.

Run `npm run test:run`: 4 tests are green.

## Break it (required)

A green test proves nothing until you have seen it fail. For each row: make the change in `src/`, run `npm run test:run`, check that **a test is red**, then undo the change (`git checkout src` or by hand).

| #   | Break                                                                 | Caught by   |
| --- | --------------------------------------------------------------------- | ----------- |
| 1   | In `POST`, change `status(201)` to `status(200)`                      | create test |
| 2   | `GET /:id` answers 200 for a missing book (remove the 404 `if` block) | 404 test    |
| 3   | Remove `app.use(express.json())` in `src/app.ts`                      | create test |

If a row stays green, your test is too weak or it misses an `await`. Fix the test, not the code.

## Challenge 2 (optional): More cases

Test `PUT` (200 and 404), `DELETE` (204 and 404), a body that is not valid JSON (400 `Invalid JSON body`), and a database error: `model.find.mockRejectedValue(new Error("..."))` becomes a 500 `{ "error": "Internal server error" }` without details. The error handler logs with `console.error`, silence it in that test with `vi.spyOn`.

## Challenge 3 (optional): Coverage

`npm i -D @vitest/coverage-v8@2.1.9`, then `npx vitest run --coverage`. Which lines of `src/routes/books.ts` does no test reach? Write one test for a line you find. Coverage tells you what is **not** tested. It does not tell you that the rest is tested well.

## Review your tests

- Which of your tests would still pass if the **real** query was wrong (for example a wrong filter)? All of them: the model is a stub.
- Does every `request(app)` have an `await`? Does every test check a body, not only a status?
- Did you change anything in `src/` to make a test green? Why?
