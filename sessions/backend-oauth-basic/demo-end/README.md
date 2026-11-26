# Backend OAuth Basic: Demo End

The empty project of `demo-start` with a **login with GitHub** (Better Auth). There is no database: Better Auth keeps the login in an encrypted cookie ("stateless").

```
backend/
  src/auth.ts          Better Auth: the whole login in one file
  src/server.ts        the Better Auth handler (before express.json()) and GET /api/me (401 without login)
frontend/
  vite.config.ts       forwards /api to the backend (no CORS needed)
  src/auth-client.ts   the Better Auth client
  src/App.tsx          login button, picture, name, "Ask the backend: who am I?", logout
```

## Run it

Like `demo-start`: your own GitHub OAuth App (callback URL `http://localhost:5173/api/auth/callback/github`), `backend/.env` from `.env.example`, then `npm i` and `npm run dev` in `backend/` and in `frontend/`. Open `http://localhost:5173`.

**Try:** log in, note the `id` of "Ask the backend", restart the backend, log out and in again: the `id` is a new one. Without a database the server forgets its users at a restart.
