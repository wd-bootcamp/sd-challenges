# Backend Auth with GitHub OAuth: Books Fullstack Login

The end of the live demo and the **start of the exercise**. "Log in with GitHub" works in the page, and the page shows your name. Everything else is still open: **anyone can still add and delete books**, and "Log out" does not work yet (the route is missing, the browser console shows a 404 for `POST /api/auth/logout`). Your first challenge closes both.

This README describes the whole task. Read it completely before you start.

## The task

| Challenge | Goal                                           |          |
| --------- | ---------------------------------------------- | -------- |
| 1         | `requireAuth` on the write routes, plus logout | required |
| 2         | Books belong to a user                         | optional |
| 3         | Helmet and a body limit                        | optional |
| 4         | Rate limit the login                           | optional |
| Review    | Secrets checklist on your own repository       | optional |

You validate in the **React page** (the login needs a browser). **Bruno** checks the API requests that need no login. There is no Bruno collection in this project: build your own. Challenges 2 to 4 are optional.

You can write the code by hand or direct Claude Code. If you use the agent, work in a git repository, read its plan and its diffs. **Never give it your `.env`, your GitHub client secret or your `JWT_SECRET`.**

## The API contract

The contract of the Books API stays as it is. New in this session:

| Request                                           | Answer                                                                                |
| ------------------------------------------------- | ------------------------------------------------------------------------------------- |
| `GET /api/auth/github`                            | 302 to GitHub. Sets the cookie `oauth_state`.                                         |
| `GET /api/auth/github/callback`                   | 302 to `FRONTEND_URL` and sets the cookie `session`. 400 for a bad `state` or `code`. |
| `GET /api/auth/me`                                | 200 `{ id, login, name, avatarUrl }`, or 401 `{ "error": "Not logged in" }`           |
| `POST /api/auth/logout` (challenge 1)             | 204, deletes the cookie `session`                                                     |
| `POST`, `PUT`, `DELETE /api/books…` (challenge 1) | 401 `{ "error": "Not logged in" }` without a login. `GET` stays public.               |

## What is in the project

```
src/
  env.ts                     requireEnv(name): reads a variable when it is needed
  models/User.ts             the User model (githubId, login, name, avatarUrl), toUser()
  auth/github.ts             the three GitHub calls: authorize URL, code for token, profile
  auth/session.ts            signSession, verifySession, the cookie options
  routes/auth.ts             /api/auth/github, /callback, /me
  routes/books.ts            the books routes (no login yet)
  app.ts                     cors with credentials, cookieParser, the routers
client/                      the React page
.env.example                 all variables, without secrets
CLAUDE.md                    rules for the agent
```

## Set up

1. Register your own **GitHub OAuth App** (GitHub, Settings, Developer settings, OAuth Apps, New OAuth App). Name `books-api-local`, Homepage URL `http://localhost:3001`, Authorization callback URL `http://localhost:3001/api/auth/github/callback`. Then "Generate a new client secret" and copy it once.
2. `npm i` here and in `client/`.
3. Copy `.env.example` to `.env` and fill in `MONGODB_URI`, `GITHUB_CLIENT_ID`, `GITHUB_CLIENT_SECRET`, and `JWT_SECRET` (create it with `node -p "require('crypto').randomBytes(32).toString('hex')"`).
4. `git check-ignore .env` prints `.env`.
5. `npm run dev` here, `npm run dev` in `client/`, open `http://localhost:5173`.

## Challenge 1: `requireAuth` and logout (required)

Add a middleware `requireAuth` in `src/middleware/auth.ts`. It reads the `session` cookie, checks it with `verifySession`, checks that the user exists, and answers `401 { "error": "Not logged in" }` otherwise. Put it on `POST`, `PUT` and `DELETE` in `src/routes/books.ts`. Add `POST /api/auth/logout` to `src/routes/auth.ts`: it answers 204 and clears the cookie with the **same options** as the login.

> 💡 Type the middleware as `RequestHandler<Record<string, string>>`. With a plain `RequestHandler`, `request.params.id` becomes `string | string[]` and the typecheck of the books routes fails.

### Check it in the page

| #   | Action in the page           | Expected                                                           |
| --- | ---------------------------- | ------------------------------------------------------------------ |
| 1   | Open the page, not logged in | "Not logged in", the link is visible, the book list loads          |
| 2   | "Add book" without a login   | an alert `401 Not logged in`, the list does not change             |
| 3   | Click "Log in with GitHub"   | back on the page, "Logged in as <your name>", the button "Log out" |
| 4   | "Add book"                   | the book appears, no message                                       |
| 5   | "Delete" on it               | it disappears                                                      |
| 6   | Reload                       | still logged in                                                    |
| 7   | "Log out", then "Add book"   | "Not logged in", then the alert `401 Not logged in`                |

The cookie of the demo login is still valid. Add the logout route first, click "Log out", and begin with step 1.

### Check it in Bruno (no login needed)

| #   | Request                                                  | Expected                                                                                           |
| --- | -------------------------------------------------------- | -------------------------------------------------------------------------------------------------- |
| 1   | `GET /api/auth/me`                                       | 401 `{ "error": "Not logged in" }`                                                                 |
| 2   | `GET /api/books`                                         | 200, the list                                                                                      |
| 3   | `POST /api/books` with `{ "title": "x", "author": "A" }` | 401 `{ "error": "Not logged in" }`                                                                 |
| 4   | `PUT /api/books/:id` (any id)                            | 401                                                                                                |
| 5   | `DELETE /api/books/:id` (any id)                         | 401                                                                                                |
| 6   | `GET /api/auth/github` (turn "follow redirects" off)     | 302, `Location` starts with `https://github.com/login/oauth/authorize?client_id=` and has `state=` |
| 7   | `GET /api/auth/github/callback?code=x&state=y`           | 400 `{ "error": "Invalid OAuth state or code" }`                                                   |

## Challenge 2 (optional): Books belong to a user

Add an `owner` to the book schema (not to the API response). Set it when a book is created. Every `/api/books` route needs a login and only sees the books of the logged-in user. A book of another user is a 404. The unit tests of the in-memory store must keep passing.

The books you imported in Compass have no owner. They disappear from the API. Say it in your commit message.

## Challenge 3 (optional): Helmet and a body limit

Add `helmet()` and limit the JSON body to 10 kB (`express.json({ limit: "10kb" })`). A body that is too large must answer 413 (it is a 500 until the error handler knows `entity.too.large`).

## Challenge 4 (optional): Rate limit the login

Add `express-rate-limit` to `/api/auth/github` and the callback (not to `/me`). After 10 requests in 15 minutes the answer is 429.

## Review your result (optional)

Go through the secrets checklist on your own repository.

- `.env` is in `.gitignore` (`git check-ignore .env` prints `.env`). `.env.example` has placeholders only.
- No client secret, `JWT_SECRET` or GitHub token in code, logs, error messages, README, screenshots or committed Bruno files.
- `git log -p -S"client_secret"` is empty. If a secret was pushed: **regenerate it in GitHub** (and change `JWT_SECRET`, which logs everybody out). Deleting the commit is not enough.
- The agent never saw `.env`, and nobody pasted a secret into a chat.

Write down two findings. Fix at least one.

## Development

Node.js 22.22 or newer is required.

- `npm run dev` restarts the API on changes, `npm start` starts it once
- `npm run typecheck` checks the types, `npm run test:run` runs the unit tests once
- in `client/`: `npm run dev` starts the page, `npm run typecheck` checks the types
