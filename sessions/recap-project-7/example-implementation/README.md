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
npm run seed             # fills the database with 10 books (deletes all books)
npm run dev              # http://localhost:3001/api

# 2. Frontend (terminal 2)
cd frontend
npm install
npm run dev              # http://localhost:5173, forwards /api to the backend
```

The frontend dev server proxies `/api` to `http://localhost:3001`. Set `API_URL` if the backend runs elsewhere, for example `API_URL=http://localhost:3101 npm run dev`. The backend also allows CORS for `localhost:3000` and `localhost:5173`, as in Backend MongoDB. The proxy makes it unnecessary.

## Scripts

| Folder     | Script                    | What it does                                               |
| ---------- | ------------------------- | ---------------------------------------------------------- |
| `backend`  | `dev`, `start`            | start with restart on changes, start once                  |
| `backend`  | `seed`                    | replace all books with `src/seed.json`                     |
| `backend`  | `typecheck`, `test:run`   | type check, unit tests (once)                              |
| `backend`  | `check`                   | contract test (own server on port 3101, or `BASE_URL=...`) |
| `frontend` | `dev`, `build`, `preview` | dev server, type check and build, preview                  |
| `frontend` | `check`, `test:run`       | type check, unit tests (once)                              |

## Structure

```
backend/
  src/app.ts                  exports app: no listen, no database connection
  src/index.ts                connects, then listens on 3001
  src/db.ts                   connectToDatabase()
  src/routes/books.ts         URL to code
  src/validation.ts           parseBookInput (pure function, unit tests)
  src/middleware/errors.ts    notFound and the central errorHandler
  src/store/booksStore.ts     the BooksStore interface (+ in-memory version for tests)
  src/store/mongoBooksStore.ts  the only code that queries the database
  src/models/Book.ts          mongoose model, JSON shape of the API
  scripts/seed.ts, scripts/check.ts
frontend/src/
  api.ts                      the only place that calls fetch
  useBooks.ts                 loading, error and reload state
  components/                 BookCard, BookForm, DeleteBookDialog, Stats, ApiStatus, ui/ (shadcn/ui)
docs/api-contract.md          endpoints, examples, deviations
```

The backend is the solution of Backend MongoDB with the name changed: students arrive with this layout.

## What this leaves for Recap Project 8

- **Owner:** all queries are in `store/mongoBooksStore.ts` (behind the `BooksStore` interface), so a `userId` filter is a change in one place.
- **Auth and validation hardening:** a middleware can go between `express.json()` and the router in `app.ts`. Validation is in `validation.ts`.
- **API tests:** `app` can be imported without a server or a database (the `check` script is a first contract test).
- **CORS:** not needed in development because of the proxy. A deployment with two origins needs it.
- **Component tests:** jsdom and Testing Library are installed and configured, there are no component tests yet.
