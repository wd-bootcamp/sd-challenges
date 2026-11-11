# Reading List: Reference Implementation

Reference solution of Recap Project 7 for coaches: an Express 5 + MongoDB backend and a React + shadcn/ui frontend. It is not handed out to students.

## Requirements

- Node.js 22.22 or newer
- A MongoDB database, local or Atlas

## Run it

```bash
# 1. Backend (terminal 1)
cd backend
npm install
cp .env.example .env     # set MONGODB_URI
npm run seed             # optional: fill the database with 10 books (deletes all books)
npm run dev              # http://localhost:3001/api

# 2. Frontend (terminal 2)
cd frontend
npm install
npm run dev              # http://localhost:5173, forwards /api to the backend
```

The frontend dev server proxies `/api` to `http://localhost:3001`. Set `API_URL` if the backend runs elsewhere, for example `API_URL=http://localhost:3101 npm run dev`.

## Scripts

| Folder     | Script                    | What it does                                  |
| ---------- | ------------------------- | --------------------------------------------- |
| `backend`  | `dev`                     | start with restart on changes (`tsx watch`)   |
| `backend`  | `start`                   | start once                                    |
| `backend`  | `seed`                    | replace all books with `data/books.seed.json` |
| `backend`  | `typecheck`, `test:run`   | type check, unit tests (once)                 |
| `frontend` | `dev`, `build`, `preview` | dev server, type check and build, preview     |
| `frontend` | `check`, `test:run`       | type check, unit tests (once)                 |

## Structure

```
backend/src/
  index.ts             connects to MongoDB and starts the app
  app.ts               createApp(): the Express app, no listen, no database
  config.ts            reads environment variables, fails fast
  routes/              URL to handler
  handlers/            read the request, call the store, write the response
  models/book.ts       mongoose schema and the JSON shape of the API
  models/bookStore.ts  the only module that queries the database
  validation/          pure functions with unit tests
  middleware/errors.ts not found handler and central error handler
  seed.ts              seed script
frontend/src/
  api.ts               the only place that calls fetch
  useBooks.ts          loading, error and reload state
  components/          BookCard, BookForm, DeleteBookDialog, Stats, ui/ (shadcn/ui)
docs/api-contract.md   endpoints, examples, decisions
```

## What this leaves for Recap Project 8

- **Owner:** all queries are in `models/bookStore.ts`, so a `userId` filter is a change in one file.
- **Auth and validation hardening:** a middleware can go between `express.json()` and the router in `app.ts`. Validation is in `validation/`.
- **API tests:** `createApp()` can be imported without a server or a database.
- **CORS:** not needed in development because of the proxy. A deployment with two origins needs it.
- **Component tests:** jsdom and Testing Library are installed and configured, there are no component tests yet.
