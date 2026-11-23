# Backend Auth with GitHub OAuth: Books Fullstack Start

The start of the live demo. A fullstack Reading List: the **Books API** (Express 5, TypeScript, MongoDB) in the project root and a small **React page** in `client/`. There is no login yet: anyone can add and delete books. In the demo you add the login with GitHub step by step.

## What is in the project

```
src/             the Books API from "Backend MongoDB"
client/          the React page (Vite, TypeScript): book list, add, delete, log in, log out
.env.example     the variables of the app, without secrets
CLAUDE.md        rules for the agent
```

The page is given. Nobody types frontend code in this session, and `client/` is the same in all three folders of the session. It shows "Not logged in" and a button "Log in with GitHub". The button does nothing useful until the demo has built the login. The page talks to the login with the client of Better Auth (`authClient` in `client/src/api.ts`).

The API address comes from `VITE_API_URL` (default `http://localhost:3001/api`). `credentials: true` in `cors(...)` of `src/app.ts` is the one line that is already prepared for the login: the page runs on port 5173, the API on port 3001 (two origins), and the browser only sends cookies to another origin when both sides agree.

## Run it

Two terminals, one for each project.

```bash
# terminal 1: the API on http://localhost:3001
npm i
cp .env.example .env   # put your MONGODB_URI into .env
npm run dev

# terminal 2: the page on http://localhost:5173
cd client
npm i
npm run dev
```

Open `http://localhost:5173`. You see the books of your database. "Add book" and "Delete" work for everyone. The browser console shows one error for `GET /api/auth/get-session` (a 404): the page already asks "who is logged in?", and the API does not know the route yet.

`GITHUB_CLIENT_ID`, `GITHUB_CLIENT_SECRET` and `BETTER_AUTH_SECRET` in `.env` stay placeholders until you register your OAuth App in the session. `.env` is not committed.

## Development

Node.js 22.22 or newer is required.

- `npm run dev` restarts the API on changes, `npm start` starts it once
- `npm run typecheck` checks the types, `npm run test:run` runs the unit tests once
- in `client/`: `npm run dev` starts the page, `npm run build` builds it, `npm run typecheck` checks the types
