# Backend E2E Tests: Books Fullstack E2E First Test

The Reading List as a fullstack app (Express API in the root, React app in `client/`) with **one browser test**: the end of the demo. Playwright starts the API and the React app against a **separate test database**, opens the page in a headless Chromium and checks that the list of books is visible. Your first challenge is a second test: a whole user flow. Everything after that is optional.

This README describes the whole task. Read it completely before you start.

## The task

| Challenge | Goal                                      |          |
| --------- | ----------------------------------------- | -------- |
| 1         | A flow test: add a book, delete it        | required |
| 2         | A failure case: the error shown in the UI | optional |
| 3         | Locators and the trace viewer             | optional |
| 4         | Run it in CI                              | optional |
| 5         | A test with login                         | optional |

You can write the code by hand or direct Claude Code. If you use the agent, work in a git repository, read its plan and its diffs, and decide what is accepted. **A green test is not proof that the test can fail.** After challenge 1 you break the app on purpose and watch the test turn red.

## What is in the project

```
playwright.config.ts   starts the API (port 3101) and the React app (port 3000), then runs the tests
e2e/database.ts        reads E2E_MONGODB_URI and refuses a database name that does not end with -e2e
e2e/books.spec.ts      the tests (one so far)
src/                   the API
client/                the React app
CLAUDE.md              rules for the agent, including the E2E rules
```

The tests have no database code. They can only do what a user can do in the page. Vitest (`npm run test:run`) does not pick up `e2e/`.

## Set up

1. **The E2E database.** In Compass, on the same cluster as before, create the database `reading-list-e2e` with the collection `books`. Import `books.json` (the file of "Databases and MongoDB") once. Compass shows `1 – 10 of 10`. If you do not have the file any more:
   `npx ghcd@latest wd-bootcamp/sd-challenges/tree/main/sessions/databases-and-mongodb/reading-list-db`
2. **`.env`.** Add one line with your connection string and the other database name (see `.env.example`):
   `E2E_MONGODB_URI=mongodb+srv://<user>:<password>@<cluster-host>/reading-list-e2e?retryWrites=true&w=majority`
   Check that git still ignores `.env`: `git check-ignore .env` prints `.env`.
3. `npm i`, then `cd client && npm i`.
4. The browser, once (about 100 MiB): `npx playwright install --only-shell chromium`
5. Stop your own dev servers (`npm start`, `npm run dev`), so that nothing runs on the ports 3000 and 3101. Then `npm run e2e`. You should see `1 passed`.

## Challenge 1: A flow test, add a book and delete it (required)

Write a second test in `e2e/books.spec.ts` that does what a user does:

1. Open the page.
2. Fill in the title and the author, click "Add book".
3. Expect the new book in the list.
4. Click its delete button.
5. Expect the book to be gone.

Rules for the test:

- **Its own data.** The title is unique (for example with `Date.now()`), so it never clashes with other data and you never count on the ten books of the start data.
- **It cleans up after itself.** The delete is part of the flow, so no book stays behind. The test has no database code.
- **Locators like a user.** `getByLabel`, `getByRole` (the page gives the fields the labels "Title" and "Author", the delete button is named `Delete <title>`). No CSS selectors, no `waitForTimeout`.
- **Assertions that wait.** `await expect(locator)...` retries until it is true or the timeout is over.

Run it: `npm run e2e`. Run it twice in a row: it must be green both times. Run it alone: `npx playwright test -g "add a book"`.

### Break it on purpose

Make the app wrong, run `npm run e2e`, and look at what you see. Then undo it with `git restore <file>`. Do these one after the other, and write down for each: red or green? Which line fails? Why?

| Change                                                                                       | Result                                                                                                                                                                                                 |
| -------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| In `src/models/Book.ts`, `toBook` does not return `id` any more (comment the line out)       | **Red.** The flow test fails at `toHaveCount(0)`. Open `test-results/.../error-context.md`: the page shows the alert `404 Book not found`. The delete button calls `/books/undefined`.                  |
| In `src/routes/books.ts`, `POST` answers `200` instead of `201`                              | **Still green.** The page only checks `response.ok`. Who checks the status code then? (A route test, see "Backend Unit Testing".)                                                                      |
| In `playwright.config.ts`, set `VITE_API_URL` to `http://localhost:9/api` (nothing listens)  | **Red, both tests.** The list stays empty and the page shows no error for it. The flow test's page shows the alert `Failed to fetch`.                                                                  |

Then choose one more way to break the app yourself, and predict first: which test notices? If your test stays green, what does that tell you about the test?

> 💡 A test that fails in the middle does not clean up. It can leave a book with a title like `E2E Book 1795...` in the E2E database. It is harmless. Delete it in Compass.

## Challenge 2 (optional): A failure case, the error shown in the UI

Submit the empty form (nothing typed) and check what the page shows. When the API answers with an error, the page shows it in an element with the role `alert`, in the format `<status> <message>`. Write a test for it. What did you decide to assert, the whole text or a part of it, and what does each choice cost?

## Challenge 3 (optional): Locators and the trace viewer

Make one locator wrong on purpose (a heading name with a typo). Read the **call log** of the failing test. Open the trace of the failed run: `npx playwright show-trace test-results/<folder>/trace.zip` (the config writes a trace for every failed test). Then try `npx playwright test --ui`. These two open a window and may need the full browser: `npx playwright install chromium`. Compare `getByRole("button", { name: "Add book" })` with a CSS selector like `form button`: what happens to each when the page changes?

## Challenge 4 (optional): Run it in CI

Write `.github/workflows/e2e.yml` for GitHub Actions that runs the tests on every push. The workflow needs a MongoDB service (`mongo:7`, so `E2E_MONGODB_URI=mongodb://127.0.0.1:27017/reading-list-e2e`), `npm ci` in the root and in `client/`, the browser install (`npx playwright install --with-deps --only-shell chromium`), `npm run e2e`, and an upload of `test-results` when the run fails. The CI database starts empty: what does the first test need? (The solution has an answer.) You never put the Atlas connection string into a workflow file.

## Challenge 5 (optional): A test with login

The login with GitHub cannot be automated: it leaves your app for github.com, with 2FA and bot protection. **Never** add a test login or a bypass to the real app. Instead the test gives the browser a session cookie that it makes itself. This works only with the code of the session "Backend Security": download its solution (`books-fullstack-solution`) as a second project, copy `playwright.config.ts`, `e2e/` and the Playwright dev dependency into it, pass made-up values for `JWT_SECRET`, `GITHUB_CLIENT_ID` and `GITHUB_CLIENT_SECRET` to the test backend in `webServer.env`, create a user in the E2E database, sign a session token with the same test secret, and add it with `context.addCookies`. Expect "Logged in as ..." in the page. An anonymous visit shows "Not logged in".

## Review your tests (optional)

- Does each test create and delete its own data?
- Does each test pass alone (`-g`)?
- Is there a `waitForTimeout` anywhere? (There must not be.)

Write down what you found and fix one thing.

## Development

Node.js 22.22 or newer is required.

- `npm run e2e` runs the browser tests (starts and stops the API and the React app itself)
- `npm start` starts the API, `npm run typecheck` checks the types, `npm run test:run` runs the unit tests once
