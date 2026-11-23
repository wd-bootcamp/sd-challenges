# Backend Auth with GitHub OAuth: Books Fullstack Login

The end of the live demo and the **start of the exercise**. "Log in with GitHub" works in the page, and the page shows your name. Everything else is still open: **anyone can still add and delete books**. Your challenge closes that.

This README describes the whole task. Read it completely before you start.

## The task

| Challenge | Goal                                     |          |
| --------- | ---------------------------------------- | -------- |
| 1         | `requireAuth` on the write routes        | required |
| 2         | Books belong to a user                   | optional |
| 3         | Helmet and a body limit                  | optional |
| 4         | Rate limit the login                     | optional |
| Review    | Secrets checklist on your own repository | optional |

You validate in the **React page** (the login needs a browser). **Bruno** checks the API requests that need no login. There is no Bruno collection in this project: build your own.

You can write the code by hand or direct Claude Code. If you use the agent, work in a git repository, read its plan and its diffs. **Never give it your `.env`, your GitHub client secret or your `BETTER_AUTH_SECRET`.**

## The API contract

The contract of the Books API stays as it is. Everything under `/api/auth` is answered by Better Auth, you do not write it. These routes matter today:

| Request                                           | Answer                                                                            |
| ------------------------------------------------- | --------------------------------------------------------------------------------- |
| `POST /api/auth/sign-in/social`                   | 200 `{ "url": "https://github.com/login/oauth/authorize?...", "redirect": true }` |
| `GET /api/auth/callback/github`                   | 302 to the page and sets the cookie `better-auth.session_token`                   |
| `GET /api/auth/get-session`                       | 200 `{ session, user }`, or 200 `null` when nobody is logged in                   |
| `POST /api/auth/sign-out`                         | 200 `{ "success": true }`, ends the session in the database                       |
| `POST`, `PUT`, `DELETE /api/books…` (challenge 1) | 401 `{ "error": "Not logged in" }` without a login. `GET` stays public.           |

## What is in the project

```
src/
  env.ts                     reads .env, requireEnv(name)
  auth.ts                    the Better Auth setup: database, GitHub, secret
  app.ts                     cors with credentials, the Better Auth handler, the routers
  routes/books.ts            the books routes (no login yet)
client/                      the React page (authClient in src/api.ts)
.env.example                 all variables, without secrets
CLAUDE.md                    rules for the agent
```

## Set up

1. Register your own **GitHub OAuth App** (GitHub, Settings, Developer settings, OAuth Apps, New OAuth App). Name `books-api-local`, Homepage URL `http://localhost:3001`, Authorization callback URL `http://localhost:3001/api/auth/callback/github`. Then "Generate a new client secret" and copy it once.
2. `npm i` here and in `client/`.
3. Copy `.env.example` to `.env` and fill in `MONGODB_URI`, `GITHUB_CLIENT_ID`, `GITHUB_CLIENT_SECRET` and `BETTER_AUTH_SECRET` (create it with `node -p "require('crypto').randomBytes(32).toString('hex')"`).
4. `git check-ignore .env` prints `.env`.
5. `npm run dev` here, `npm run dev` in `client/`, open `http://localhost:5173`.

## Challenge 1: `requireAuth` (required)

Add a middleware `requireAuth` in `src/middleware/auth.ts`. It asks Better Auth for the session of the request (`auth.api.getSession`) and answers `401 { "error": "Not logged in" }` when there is none. Put it on `POST`, `PUT` and `DELETE` in `src/routes/books.ts`. The logout already works: the page calls `authClient.signOut()`.

> 💡 Type the middleware as `RequestHandler<Record<string, string>>`. With a plain `RequestHandler`, `request.params.id` becomes `string | string[]` and the typecheck of the books routes fails.

### Check it in the page

| #   | Action in the page           | Expected                                                           |
| --- | ---------------------------- | ------------------------------------------------------------------ |
| 1   | Open the page, not logged in | "Not logged in", the button is visible, the book list loads        |
| 2   | "Add book" without a login   | an alert `401 Not logged in`, the list does not change             |
| 3   | Click "Log in with GitHub"   | back on the page, "Logged in as <your name>", the button "Log out" |
| 4   | "Add book"                   | the book appears, no message                                       |
| 5   | "Delete" on it               | it disappears                                                      |
| 6   | Reload                       | still logged in                                                    |
| 7   | "Log out", then "Add book"   | "Not logged in", then the alert `401 Not logged in`                |

The session of the demo login is still valid. Click "Log out" first, and begin with step 1.

### Check it in Bruno (no login needed)

| #   | Request                                                                                                 | Expected                                                                           |
| --- | ------------------------------------------------------------------------------------------------------- | ---------------------------------------------------------------------------------- |
| 1   | `GET /api/auth/get-session`                                                                             | 200 `null`                                                                         |
| 2   | `GET /api/books`                                                                                        | 200, the list                                                                      |
| 3   | `POST /api/books` with `{ "title": "x", "author": "A" }`                                                | 401 `{ "error": "Not logged in" }`                                                 |
| 4   | `PUT /api/books/:id` (any id)                                                                           | 401                                                                                |
| 5   | `DELETE /api/books/:id` (any id)                                                                        | 401                                                                                |
| 6   | `POST /api/auth/sign-in/social` with `{ "provider": "github", "callbackURL": "http://localhost:5173" }` | 200, `url` starts with `https://github.com/login/oauth/authorize` and has `state=` |
| 7   | the same request with `"callbackURL": "http://evil.example"`                                            | 403 `INVALID_CALLBACK_URL`                                                         |

## Challenge 2 (optional): Books belong to a user

Add an `owner` to the book schema (not to the API response). Set it when a book is created. Every `/api/books` route needs a login and only sees the books of the logged-in user. A book of another user is a 404. The unit tests of the in-memory store must keep passing.

The books you imported in Compass have no owner. They disappear from the API. Say it in your commit message.

## Challenge 3 (optional): Helmet and a body limit

Add `helmet()` and limit the JSON body to 10 kB (`express.json({ limit: "10kb" })`). A body that is too large must answer 413 (it is a 500 until the error handler knows `entity.too.large`).

## Challenge 4 (optional): Rate limit the login

Better Auth has a rate limit built in, but it is **off outside production**. Turn it on in `src/auth.ts` (see `rateLimit` in the docs) and check it: after the limit, `POST /api/auth/sign-in/social` answers 429.

## Review your result (optional)

Go through the secrets checklist on your own repository.

- `.env` is in `.gitignore` (`git check-ignore .env` prints `.env`). `.env.example` has placeholders only.
- No client secret, `BETTER_AUTH_SECRET` or GitHub token in code, logs, error messages, README, screenshots or committed Bruno files.
- `git log -p -S"client_secret"` is empty. If a secret was pushed: **regenerate it in GitHub** (and change `BETTER_AUTH_SECRET`). Deleting the commit is not enough.
- The agent never saw `.env`, and nobody pasted a secret into a chat.

Write down two findings. Fix at least one.

## Development

Node.js 22.22 or newer is required.

- `npm run dev` restarts the API on changes, `npm start` starts it once
- `npm run typecheck` checks the types, `npm run test:run` runs the unit tests once
- in `client/`: `npm run dev` starts the page, `npm run typecheck` checks the types
