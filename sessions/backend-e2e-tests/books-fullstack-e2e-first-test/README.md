# Backend E2E Tests: Books Fullstack E2E First Test

The Reading List as a fullstack app (Express API in the root, React app in `client/`) with **one browser test**: the end of the demo. Playwright starts the API and the React app against a **separate test database**, opens the page in a headless Chromium and checks that the heading and the form are there. Your challenge is a second test: a whole user flow.

Read this README completely before you start. **Only challenge 1 is required. Challenge 2 and 3 are optional.**

## The task

| Challenge | Goal                                 |          |
| --------- | ------------------------------------ | -------- |
| 1         | A flow test: add a book, delete it   | required |
| 2         | A book is still there after a reload | optional |
| 3         | Locators and the trace viewer        | optional |

You can write the code by hand or direct Claude Code. If you use the agent, work in a git repository, read its diffs, and decide what is accepted. **A green test is not proof that the test can fail.** After challenge 1 you break the app on purpose and watch the test turn red.

## What is in the project

```
playwright.config.ts   starts the API (port 3101) and the React app (port 3000), then runs the tests
e2e/database.ts        reads E2E_MONGODB_URI and refuses a database name that does not end with -e2e
e2e/books.spec.ts      the tests (one so far)
src/                   the API
client/                the React app
CLAUDE.md              rules for the agent, including the E2E rules
```

The tests have no database code. They can only do what a user can do in the page.

## Set up

1. **`.env`.** Add one line with your connection string and the **other** database name (see `.env.example`):
   `E2E_MONGODB_URI=mongodb+srv://<user>:<password>@<cluster-host>/reading-list-e2e?retryWrites=true&w=majority`
   The database `reading-list-e2e` does not exist yet, MongoDB creates it with the first book. Check that git still ignores `.env`: `git check-ignore .env` prints `.env`.
2. `npm i`, then `cd client && npm i`.
3. The browser, once (about 100 MiB): `npx playwright install --only-shell chromium`
4. Stop your own dev servers (`npm start`, `npm run dev`), so that nothing runs on the ports 3000 and 3101. Then `npm run e2e`. You should see `1 passed`.

## Challenge 1: A flow test, add a book and delete it (required)

Write a second test in `e2e/books.spec.ts` that does what a user does:

1. Open the page.
2. Fill in the title and the author, click "Add book".
3. Expect the new book in the list.
4. Click its delete button.
5. Expect the book to be gone.

Rules for the test:

- **Its own data.** The title is unique (for example with `Date.now()`), so it never clashes with other data and you never count on the number of books.
- **It cleans up after itself.** The delete is part of the flow, so no book stays behind. The test has no database code.
- **Locators like a user.** `getByLabel`, `getByRole` (the page gives the fields the labels "Title" and "Author", the delete button is named `Delete <title>`). No CSS selectors, no `waitForTimeout`.
- **Assertions that wait.** `await expect(locator)...` retries until it is true or the timeout is over.

Run it: `npm run e2e`. Run it twice in a row: it must be green both times. Run it alone: `npx playwright test -g "add a book"`.

### Break it on purpose

Make the app wrong, run `npm run e2e`, and look at what you see. Then undo it with `git restore <file>`. Do these one after the other, and write down for each: red or green? Which line fails? Why?

| Change                                                                                      | Result                                                                                                                                                                                        |
| ------------------------------------------------------------------------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| In `src/models/Book.ts`, `toBook` does not return `id` any more (comment the line out)      | **Red.** The flow test fails at `toHaveCount(0)`. Open `test-results/.../error-context.md`: the page shows the alert `500 Internal server error`. The delete button calls `/books/undefined`. |
| In `src/routes/books.ts`, `POST` answers `200` instead of `201`                             | **Still green.** The page only checks `response.ok`. Who checks the status code then? (A route test, see "Backend Testing".)                                                                  |
| In `playwright.config.ts`, set `VITE_API_URL` to `http://localhost:9/api` (nothing listens) | **Red, the flow test.** The page shows the alert `Failed to fetch`. The first test stays green: it does not call the API.                                                                     |

Then choose one more way to break the app yourself, and predict first: which test notices? If your test stays green, what does that tell you about the test?

> 💡 A test that fails in the middle does not clean up. It can leave a book with a title like `E2E Book 1795...` in the E2E database. It is harmless. Delete it in Compass.

## Challenge 2 (optional): A book is still there after a reload

Add a book, reload the page (`page.reload()`), and expect the book to still be in the list. Then delete it. What does this test prove that the flow test does not? (The list comes from the database, not from the memory of the page.)

## Challenge 3 (optional): Locators and the trace viewer

Make one locator wrong on purpose (a heading name with a typo). Read the **call log** of the failing test. Open the trace of the failed run: `npx playwright show-trace test-results/<folder>/trace.zip` (the config writes a trace for every failed test). Then try `npx playwright test --ui`. These two open a window and may need the full browser: `npx playwright install chromium`. Compare `getByRole("button", { name: "Add book" })` with a CSS selector like `form button`: what happens to each when the page changes?

## Review your tests

- Does each test create and delete its own data?
- Does each test pass alone (`-g`)?
- Is there a `waitForTimeout` anywhere? (There must not be.)

Write down what you found and fix one thing.

## Development

Node.js 22.22 or newer is required. `npm run e2e` runs the browser tests (starts and stops the API and the React app itself). `npm start` starts the API, `npm run typecheck` checks the types.
