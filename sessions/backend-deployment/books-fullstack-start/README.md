# Backend Deployment: Books Fullstack Start

The start of the demo. The Books API of "Backend MongoDB" (Express 5, TypeScript, mongoose, the six routes of the contract) plus the small React client in `client/`. Nothing in this folder knows about a hosting platform yet.

In this session you move the API from your laptop to a hosting platform (Render).

## Run it on your laptop

The API (in this folder):

```bash
npm i
cp .env.example .env   # then put your Atlas connection string into .env
npm start              # API on http://localhost:3001
```

The client (in a second terminal):

```bash
cd client
npm i
npm run dev            # page on http://localhost:5173
```

The page shows the books of your database. You can add and delete books. The link "Log in with GitHub" leads nowhere in this project (the login is another session), ignore it.

## What is in the project

```
src/            the API (routes, store, mongoose model, db.ts, index.ts)
client/         the React app (Vite, port 5173), its own package.json
.env.example    the variables of the API, without secrets
CLAUDE.md       rules for the agent
```

The address of the API comes from `VITE_API_URL` in the client (default `http://localhost:3001/api`). `VITE_` values are built into the page and visible to everyone: an address, never a secret.

## Before you push to GitHub

- `git ls-files | grep env` prints only `.env.example`.
- Run `npm i` in this folder and **commit `package-lock.json`** (the platform and a CI workflow use it).
