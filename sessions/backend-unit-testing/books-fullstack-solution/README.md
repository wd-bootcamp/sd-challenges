# Backend Unit Testing: Books Fullstack Solution

The Reading List API with route tests, after all challenges. Compared with `books-fullstack-tests`, these files changed or are new:

- `src/app.test.ts`: the required part. The demo test and the three tests of **challenge 1** (create and get, 404, 400).
- `src/app.ts` and `src/routes/books.ts` (**challenge 2**, the seam): `createApp(store)` and `createBooksRouter(store)`. `export const app = createApp(booksStore)` is what the server uses. The routes work exactly as before.
- `src/app.errors.test.ts` (**challenge 2**): a fresh store for every test, more error cases, a store that throws.
- `src/middleware/errors.test.ts` and `src/models/Book.test.ts` (**challenge 3**): the error handler with a stub response, the schema with `validate()`.
- `src/store/mongoBooksStore.test.ts` (**challenge 4**): the real store against `mongodb-memory-server`. The first run downloads a `mongod` binary of about 140 MB.
- `package.json` (**challenges 4 and 5**): `mongodb-memory-server`, `@vitest/coverage-v8` and the script `test:coverage`.

Only `src/app.test.ts` is needed for the required part.

## Run it

```bash
npm i
npm run typecheck
npm run test:run        # 61 tests
npm run test:coverage   # the same, with a coverage table
```

The tests need no `.env`. `vitest.config.ts` sets a dummy `MONGODB_URI`, so no test can reach your database.
