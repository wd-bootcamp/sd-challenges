# Backend Unit Testing: Books Fullstack Start

The start of the demo. The Reading List API with MongoDB (the result of Backend MongoDB) and the given React page in `client/`. The API has 39 unit tests (`src/validation.test.ts`, `src/store/booksStore.test.ts`) and **no test for a route yet**. In the demo you add the first one.

## Run it

```bash
npm i
npm run typecheck
npm run test:run   # 39 tests
```

The tests need no database and no `.env`. To start the API and the page you need your own `.env` (`cp .env.example .env`) and `npm i` in `client/` as well. The page is not used in this session.
