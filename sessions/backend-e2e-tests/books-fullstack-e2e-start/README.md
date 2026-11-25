# Backend E2E Tests: Books Fullstack E2E Start

The Reading List as a fullstack monorepo (npm workspaces): the Express 5 API in `backend/` (MongoDB with mongoose, the result of Backend MongoDB) and a small React app in `frontend/` (Vite, TypeScript). **There are no tests in this folder.** It is the start of the demo of "Backend E2E Tests": in the demo you add Playwright and write the first browser test.

## What is in the project

```
package.json         the root of the workspaces, scripts for both apps
backend/             the API: routes call the mongoose model directly, no validation
  src/               the code of the API
  .env.example       the variables (MONGODB_URI, PORT)
frontend/            the React app
  src/api.ts         the address of the API (VITE_API_URL, default http://localhost:3001/api) and the fetch helper
  src/App.tsx        the page: heading, form, list of books, delete buttons
CLAUDE.md            rules for the agent
```

## Run it

You need your `.env` from Backend MongoDB (`MONGODB_URI` for your Atlas database `reading-list`). Copy it to `backend/.env`, or copy `backend/.env.example` to `backend/.env` and fill it in.

```bash
npm i                   # once, in the root: installs backend and frontend
npm run dev:backend     # API on http://localhost:3001
```

In a second terminal:

```bash
npm run dev:frontend    # the page on http://localhost:5173
```

Open `http://localhost:5173`: you see your books. Add one and delete it again.

## Development

Node.js 22.22 or newer is required. `npm run typecheck` checks the types of the API and of the page.
