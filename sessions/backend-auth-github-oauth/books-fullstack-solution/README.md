# Backend Auth with GitHub OAuth: Books Fullstack Solution

The solution of challenge 1 (required). Compared with `books-fullstack-login`, two files changed or are new:

- `src/middleware/auth.ts` (new): `requireAuth`, typed as `RequestHandler<Record<string, string>>`. It asks Better Auth for the session and answers 401 `{ "error": "Not logged in" }` without one.
- `src/routes/books.ts`: `requireAuth` on `POST`, `PUT` and `DELETE`. `GET` stays public.

The logout needs no code: Better Auth answers `POST /api/auth/sign-out`. The optional challenges 2 to 4 (owner, helmet and body limit, rate limit) are shown as short diffs in `solutions.md` of the session, not as a folder.

## Run it

```bash
npm i
cp .env.example .env   # fill in your values, see the README of books-fullstack-login
npm run dev            # API on http://localhost:3001

cd client
npm i
npm run dev            # page on http://localhost:5173
```
