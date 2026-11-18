# Backend MongoDB: Books API Solution

The Reading List API with MongoDB (mongoose), after challenge 5. Compared with `books-api-minimal`, these files changed or are new:

- `src/db.ts`: `MONGODB_URI` is checked, the connection fails after 5 seconds, and only the database name is logged.
- `src/index.ts`: stops with a clear message and exit code 1 if the connection fails.
- `src/models/Book.ts`: the schema with `required`, `trim`, `enum`, `min`, `max`, an integer check and defaults.
- `src/store/mongoBooksStore.ts`: a malformed id resolves to `undefined` or `false` (`isObjectId`), the search text is escaped, `replace` uses `runValidators: true`.
- `src/middleware/errors.ts`: a mongoose `ValidationError` becomes a 400.

`src/routes/books.ts` and `src/validation.ts` did not change.

## Run it

```bash
npm i
cp .env.example .env   # then put your connection string into .env
npm start              # API on http://localhost:3001
```
