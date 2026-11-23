# Backend Testing: Books API Start

The demo start of the session: the Reading List API (Express 5, TypeScript, mongoose) from the MongoDB session. The routes call `BookModel` directly. There are **no tests yet**, `vitest` is installed.

In the demo you install `supertest` and write the first route test. The result is `books-api-tests`.

## Run it

```bash
npm i
npm run typecheck
npm run test:run   # "No test files found": there is nothing to run yet
```

The API itself needs a `.env` with `MONGODB_URI` (`npm start`). **The tests never need it.**
