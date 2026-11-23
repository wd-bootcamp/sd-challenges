# Backend E2E Tests: Books Fullstack E2E Start

The Reading List as a fullstack app: the Express 5 API in the project root (MongoDB with mongoose, the result of Backend MongoDB) and a small React app in `client/` (Vite, TypeScript). **There are no tests in this folder.** It is the start of the demo of "Backend E2E Tests": in the demo you add Playwright and write the first browser test.

## What is in the project

```
src/                 the API: routes call the mongoose model directly, no validation
client/              the React app
  src/api.ts         the address of the API (VITE_API_URL, default http://localhost:3001/api) and the fetch helper
  src/App.tsx        the page: heading, form, list of books, delete buttons
.env.example         the variables, with the new E2E_MONGODB_URI
CLAUDE.md            rules for the agent
```

## Run it

You need your `.env` from Backend MongoDB (`MONGODB_URI` for your Atlas database `reading-list`). Copy it into this folder, or copy `.env.example` and fill it in.

```bash
npm i
npm start               # API on http://localhost:3001
```

In a second terminal:

```bash
cd client
npm i
npm run dev             # the page on http://localhost:5173
```

Open `http://localhost:5173`: you see your books. Add one and delete it again.

## Development

Node.js 22.22 or newer is required. `npm run typecheck` checks the types of the API, `cd client && npm run typecheck` those of the page.
