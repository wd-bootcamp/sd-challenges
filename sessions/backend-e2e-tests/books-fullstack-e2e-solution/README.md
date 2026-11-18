# Backend E2E Tests: Books Fullstack E2E Solution

The solution of challenge 1 (required): `books-fullstack-e2e-first-test` plus the flow test "add a book, then delete it" in `e2e/books.spec.ts`. Nothing else changed. The optional challenges are short diffs, see `solutions.md` of the session.

## Run it

```bash
npm i
cd client && npm i && cd ..
cp .env.example .env     # then put your connection string with the database reading-list-e2e into E2E_MONGODB_URI
npx playwright install --only-shell chromium
npm run e2e
```

You need the database `reading-list-e2e` with at least one book (the import of `books.json`).
