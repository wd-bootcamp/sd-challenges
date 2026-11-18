# Backend Deployment: Books Fullstack Solution

The result of the optional challenges: a build step, the CORS origins from an environment variable, a CI workflow. The Books API of "Backend MongoDB" (Express 5, TypeScript, mongoose, the six routes of the contract) plus the small React client in `client/`. Compared with `books-fullstack-live`:

- `package.json`: `npm run build` type checks and bundles `src/index.ts` with `esbuild` into `dist/index.js`, `npm start` runs `node dist/index.js`. `tsx` and `esbuild` are in `devDependencies` (`npm run dev` still uses `tsx`). `dist` is in `.gitignore`.
- `src/app.ts`: the allowed origins come from `CORS_ORIGINS` (comma separated), with `credentials: true` next to them.
- `src/loadEnv.ts`: reads `.env`, imported first by `app.ts` and `db.ts`, so `CORS_ORIGINS` is known when `app.ts` runs.
- `.github/workflows/ci.yml`: `npm ci`, `npm run typecheck`, `npm run test:run`. It needs `package-lock.json` in the repository.
- `.env.example`, `CLAUDE.md`: updated.

Run the built version locally:

```bash
npm run build
npm start
```

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

## Deploy it (Render)

The labels of the platform change. If a label differs from this README, trust the screen.

| Setting       | Value                                                                                                                     |
| ------------- | ------------------------------------------------------------------------------------------------------------------------- |
| Service type  | Web Service, from your GitHub repository (this folder is the repository)                                                  |
| Region        | The one closest to your Atlas cluster                                                                                     |
| Branch        | `main`, root directory empty                                                                                              |
| Runtime       | Node                                                                                                                      |
| Build command | `npm install && npm run build`                                                                                            |
| Start command | `npm start`                                                                                                               |
| Instance type | Free                                                                                                                      |
| Environment   | `MONGODB_URI` (your Atlas string **with** `/reading-list` before the `?`), `NODE_VERSION` = `22`, optional `CORS_ORIGINS` |
| Health check  | `/api/health`                                                                                                             |

Do **not** set `PORT` (the platform sets it) and do **not** set `NODE_ENV`. The `.env` file is never deployed: on the platform the variables are real environment variables.

## Check it

Replace `<name>` with the name of your service. The first request after a pause can take up to a minute (free instances sleep).

Build a Bruno collection `books-api-deployed` with an environment variable `baseUrl` = `https://<name>.onrender.com`. No secrets in it.

| #   | Request                                                                            | Expected                                                                    |
| --- | ---------------------------------------------------------------------------------- | --------------------------------------------------------------------------- |
| 1   | `GET {{baseUrl}}/api/health`                                                       | 200 `{ "status": "ok" }`                                                    |
| 2   | `GET {{baseUrl}}/api/books`                                                        | 200, an array, each book has `id`, no `_id`, no `__v`. The books of Compass |
| 3   | `GET {{baseUrl}}/api/books/count`                                                  | 200 `{ "count": n }`, n is the length of the list                           |
| 4   | `GET {{baseUrl}}/api/books?status=done`                                            | 200, only `done`                                                            |
| 5   | `GET {{baseUrl}}/api/books?q=dune`                                                 | 200, titles containing "dune", ignoring case                                |
| 6   | `POST {{baseUrl}}/api/books` `{ "title": "Piranesi", "author": "Susanna Clarke" }` | 201, defaults `want-to-read`, `null`, `""`. The book is in Compass          |
| 7   | `GET {{baseUrl}}/api/books/<new id>`                                               | 200, the same book                                                          |
| 8   | `PUT {{baseUrl}}/api/books/<new id>` with a changed title, status and rating       | 200, the same `id`                                                          |
| 9   | `DELETE {{baseUrl}}/api/books/<new id>`                                            | 204, no body. Gone in Compass                                               |
| 10  | `GET {{baseUrl}}/api/books/000000000000000000000000`                               | 404 `{ "error": "Book not found" }`                                         |

Requests 1 to 10 are required. Optional: `GET /api/books/abc` is 404, `POST` with `{ "title": "", "author": "x" }` is 400, `GET /api/unknown` is 404 `{ "error": "Not found" }`, `GET /api/books?status=nope` is 400.

### Visual check with the client

Create `client/.env` (it is ignored by git, the value is not a secret):

```
VITE_API_URL=https://<name>.onrender.com/api
```

Start the client (`npm run dev` in `client/`, restart it after every change of `.env`) and open `http://localhost:5173`.

| #   | Action in the page                                       | Expected                                                                                   |
| --- | -------------------------------------------------------- | ------------------------------------------------------------------------------------------ |
| 1   | Open the page                                            | The books of your Atlas database. After a pause of 15 minutes or more it can take a minute |
| 2   | Add a book                                               | It appears. The `POST` is in the log of the platform and the book is in Compass            |
| 3   | Delete it                                                | It disappears, also in Compass                                                             |
| 4   | Remove `VITE_API_URL` from `client/.env`, restart `vite` | The list shows your local data (or nothing if no local API runs)                           |
| 5   | DevTools, Network                                        | The requests go to `onrender.com`, `https`, status 200                                     |

The API answers the browser because the client runs on `http://localhost:5173`, which is in the default of `CORS_ORIGINS`. A client on another origin (for example on Vercel) must be added to `CORS_ORIGINS` on the platform, exact scheme and host, no trailing slash, and the API must be redeployed. `credentials: true` stays next to the list, because the client sends `credentials: "include"`.
