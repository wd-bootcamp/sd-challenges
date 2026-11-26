# Backend OAuth Advanced: Demo Start

The end of the demo of "Backend OAuth Basic": a page with a login with GitHub (Better Auth), **without a database**. After a restart of the backend, the same GitHub user gets a new id: the server forgot everybody. In the demo you add MongoDB. The result is `demo-end`.

## Run it

Your own GitHub OAuth App (callback URL `http://localhost:5173/api/auth/callback/github`), `backend/.env` from `.env.example`, then `npm i` and `npm run dev` in `backend/` and in `frontend/`. Open `http://localhost:5173`. `npm run typecheck` checks the types in both folders.
