# Backend MongoDB: Books API Solution

The Reading List API with MongoDB (mongoose). Compared with the starter, these files changed or are new:

- `src/db.ts` (new): `connectToDatabase()` reads `MONGODB_URI`, connects and logs the database name.
- `src/models/Book.ts` (new): schema, model and the `toJSON` transform (`_id` to `id`, no `__v`).
- `src/store/mongoBooksStore.ts` (new): the six functions of `BooksStore` on top of the model. A malformed id resolves to `undefined` or `false`.
- `src/store/booksStore.ts`: the exported `booksStore` is now `mongoBooksStore`. The interface and the in-memory `createBooksStore` stay, the unit tests use them.
- `src/index.ts`: connects first, then listens. Stops with exit code 1 if the connection fails.
- `src/middleware/errors.ts`: a mongoose `ValidationError` becomes a 400.
- `scripts/seed.ts`: deletes all books, inserts the seed data, closes the connection.
- `package.json`: the `mongoose` dependency.
- `CLAUDE.md`: the MongoDB rules.

`src/routes/books.ts`, `src/validation.ts` and `scripts/check.ts` did not change.

## Run it

```bash
npm i
cp .env.example .env   # then put your own MONGODB_URI into .env
npm run seed
npm run dev
npm run check
```

`npm run seed` deletes **all** books of the database in `MONGODB_URI`. Never run it against data you want to keep.
