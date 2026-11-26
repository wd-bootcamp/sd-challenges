# Backend OAuth Basic: Todo App with Login

The todo app of Recap Project 7 with a **login with GitHub** (Better Auth). This is the solution of the required challenges of "Backend OAuth Basic":

- The page calls the API through the Vite proxy (`frontend/vite.config.ts`, `API_URL = "/api"`).
- `backend/src/auth.ts` sets up Better Auth with GitHub. There is no database for the login yet: Better Auth keeps it in a cookie. The todos stay in MongoDB as before.
- `backend/src/middleware/auth.ts` has `requireAuth`: `POST`, `PUT` and `DELETE` answer 401 without a login. Reading stays public.
- `frontend/src/components/LoginBar.tsx` shows "Log in with GitHub", or your picture, your name and "Log out".

## Run it

You need Node.js 22.22 or newer, a MongoDB (local or Atlas) and your own **GitHub OAuth App**:

| Field | Value |
|---|---|
| Homepage URL | `http://localhost:5173` |
| Authorization callback URL | `http://localhost:5173/api/auth/callback/github` |

```bash
# Terminal 1: the API on http://localhost:3001
cd backend
cp .env.example .env   # then fill in MONGODB_URI, the GitHub values and BETTER_AUTH_SECRET
npm i
npm run dev

# Terminal 2: the app on http://localhost:5173
cd frontend
npm i
npm run dev
```

Open `http://localhost:5173`. Without a login you see the todos, but adding, changing and deleting shows `Not logged in`. Log in with GitHub and try again.

`npm run typecheck` (backend) and `npm run check` (frontend) check the types. The API contract is in `docs/api-contract.md`.
