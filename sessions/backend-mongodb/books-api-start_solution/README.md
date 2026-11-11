# Backend MongoDB: Books API Solution

The Reading List API with MongoDB (mongoose). Compared with the starter, these files changed or are new:

- `src/db.ts` (new): `connectToDatabase()` reads `MONGODB_URI`, connects and logs the database name.
- `src/models/Book.ts` (new): schema, model and the `toJSON` transform (`_id` to `id`, no `__v`).
- `src/booksStore.ts`: the five functions now use the model.
- `src/index.ts`: connects first, then listens. Stops with exit code 1 if the connection fails.
- `src/app.ts`: the error handler also maps a `CastError` for `_id` to 404 and a mongoose `ValidationError` to 400.
- `scripts/seed.ts`: deletes all books, inserts the seed data, closes the connection.
- `package.json`: the `mongoose` dependency.
- `CLAUDE.md`: the MongoDB rules.

`src/routes/books.ts` and `src/validation.ts` did not change.

## Run it

```bash
npm i
cp .env.example .env   # then put your own MONGODB_URI into .env
npm run seed
npm start
npm run check
```

`npm run seed` deletes **all** books of the database in `MONGODB_URI`. Never run it against data you want to keep.
