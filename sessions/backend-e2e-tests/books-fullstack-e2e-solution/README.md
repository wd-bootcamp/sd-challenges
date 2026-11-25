# Backend E2E Tests: Books Fullstack E2E Solution

The solution of challenge 1 (required): `books-fullstack-e2e-first-test` plus the flow test "add a book, then delete it" in `e2e/books.spec.ts`. Nothing else changed. The optional challenges (2, 3 and 4: an own test database) are short, see `solutions.md` of the session.

## Run it

```bash
npm i
cp backend/.env.example backend/.env     # then put your connection string into MONGODB_URI
npx playwright install --only-shell chromium
npm run e2e              # 2 tests
```

The tests run against the database of your `backend/.env` and delete their own data again.
