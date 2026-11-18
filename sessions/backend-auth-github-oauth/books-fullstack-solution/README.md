# Backend Auth with GitHub OAuth: Books Fullstack Solution

The solution of challenge 1 (required). Compared with `books-fullstack-login`, these files changed or are new:

- `src/middleware/auth.ts` (new): `requireAuth`, typed as `RequestHandler<Record<string, string>>`. It answers 401 `{ "error": "Not logged in" }` without a valid session.
- `src/routes/books.ts`: `requireAuth` on `POST`, `PUT` and `DELETE`. `GET` stays public.
- `src/routes/auth.ts`: `POST /api/auth/logout` answers 204 and clears the cookie with the options of the login.

The optional challenges 2 to 4 (owner, helmet and body limit, rate limit) are shown as short diffs in `solutions.md` of the session, not as a folder.

## Run it

```bash
npm i
cp .env.example .env   # fill in your values, see the README of books-fullstack-login
npm run dev            # API on http://localhost:3001

cd client
npm i
npm run dev            # page on http://localhost:5173
```
