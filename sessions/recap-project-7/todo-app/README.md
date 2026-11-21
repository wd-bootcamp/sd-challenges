# Recap Project 7: Todo App, Full Stack

In this project, you will create a todo app with a backend (Express, MongoDB with mongoose) and a frontend (React). Users can see, add, tick off, edit and delete todos, and the todos are stored in a database. The point is that you connect the three parts you learned so far: **React talks to Express, and Express talks to MongoDB.**

This is an individual project in your own repository. Login, automated tests and deployment are not part of it: in Recap Project 8, you add security and tests to this code base.

## Setup

Do not work in this folder: it only contains the description of the project and a copy of the starter.

1. Create your own **public** repository from the GitHub template [sd-recap-project-7](https://github.com/wd-bootcamp/sd-recap-project-7) ("Use this template") and follow the [guide to setup your repository](https://github.com/wd-bootcamp/sd-recap-project-7/blob/main/docs/github-repository-template.md). After a moment, 12 issues appear in your repository.
2. Clone the repository and install the dependencies of both parts (Node.js 22.22 or newer is required):

   ```bash
   cd backend && npm i
   cd ../frontend && npm i
   ```

3. Create `backend/.env` from `backend/.env.example` and put in your MongoDB connection string (database name `todos`). `.env` must not be committed.
4. Start both parts in two terminals:

   ```bash
   cd backend && npm run dev    # API on http://localhost:3001
   cd frontend && npm run dev   # app on http://localhost:5173
   ```

Then follow the issues below, starting with issue 1.

### Scripts

- Backend (`backend/`): `npm run dev` starts the API, `npm run typecheck` type-checks it.
- Frontend (`frontend/`): `npm run dev` starts the app, `npm run build` builds it, `npm run check` type-checks it.

## Issues

Your repository has 12 issues, created from the template. Each issue has a value proposition, acceptance criteria and tasks. Work on them in the order of their numbers.

| #   | Issue                                | What you build                                                |
| --- | ------------------------------------ | ------------------------------------------------------------- |
| 1   | Setup: Run the Starter               | Database, `.env`, backend and frontend running, Bruno         |
| 2   | See All Todos                        | Model, `GET /api/todos`, list in the app                      |
| 3   | Add a Todo                           | `POST /api/todos`, form                                       |
| 4   | Mark a Todo as Done                  | `PUT /api/todos/:id`, checkbox                                |
| 5   | Edit a Todo                          | Edit the title in the list                                    |
| 6   | Delete a Todo                        | `DELETE /api/todos/:id`, delete button                        |
| 7   | Loading, Error and Empty States      | Messages for loading, failed requests and an empty list       |
| 8   | Hand Over: Ready for Recap Project 8 | README, API contract and structure ready for the next project |
| 9   | Bonus: Filter the Todos              | `GET /api/todos?done=true`, filter buttons                    |
| 10  | Bonus: Move the Routes into a Router | `routes/todos.ts` with an Express `Router` (with Claude Code) |
| 11  | Bonus: Input Validation              | 400 for bad input (with Claude Code)                          |
| 12  | Bonus: Error Handling                | 404 handler and error handler, no 500 for bad ids (with Claude Code) |

## Working on Your Own

- Issues 1 to 8 are required. The bonus issues 9 to 12 are optional: do them after the core stories, if you have time. In the issues 10 to 12, you use Claude Code.
- Only one issue should be in the "In Progress" column at any given time.
- Use one feature branch and one pull request for every issue. Check the API in Bruno and the app in the browser, and reload the page to see that the data comes from the database.
- You have to be able to explain every route and every component.
- **Secrets.** The connection string lives only in `backend/.env`. Never put it into an issue or a pull request.
- At the end, you show your app: add, tick off, edit and delete a todo, and show what happens when the backend is stopped. Then you explain one route and one component that you did not write yourself.

## API

The contract is the same for everybody and also in `docs/api-contract.md` of your repository. Base path `/api`, port `3001`. A todo has exactly the fields `id`, `title` and `done`:

```ts
type Todo = {
  id: string; // the MongoDB ObjectId as a string
  title: string;
  done: boolean;
};
```

| Method and path         | Body                  | Success                  | Errors                              |
| ----------------------- | --------------------- | ------------------------ | ----------------------------------- |
| `GET /api/health`       |                       | 200 `{ "status": "ok" }` |                                     |
| `GET /api/todos`        |                       | 200 `Todo[]`             |                                     |
| `POST /api/todos`       | `{ "title" }`         | 201 `Todo`               |                                     |
| `PUT /api/todos/:id`    | `{ "title", "done" }` | 200 `Todo`               | 404 `{ "error": "Todo not found" }` |
| `DELETE /api/todos/:id` |                       | 204, no body             | 404 `{ "error": "Todo not found" }` |

- `POST` creates a todo with `done: false`. The title is trimmed.
- `PUT` replaces `title` and `done`: send both.
- All errors look like `{ "error": "<message>" }`.
- The optional issues 11 and 12 add 400 for bad input, 404 for unknown routes and ids like `abc`, and 500 for unexpected errors. They are listed in `docs/api-contract.md`.

## Starter project

**`backend/`** (Express 5, TypeScript, mongoose, the same layout as your Backend MongoDB project):

- `src/app.ts` sets up the app with **CORS**, the JSON body parser and the health route.
- `src/index.ts` and `src/db.ts` connect to the database and start the server. `src/types.ts` has the types `Todo` and `NewTodo`.
- **You write** `src/models/Todo.ts` and the todo routes in `src/app.ts` (issue 2 and following). The router, the validation and the error handling are optional bonus issues.

**`frontend/`** (Vite, React 19, TypeScript and [SWR](https://swr.vercel.app/)):

- `src/api.ts` has the address of the API. Put all functions that call the API here.
- `src/styles.css` contains some basic styles. Feel free to change them.
- `src/App.tsx` is your starting point. You write the components.

### CORS

The frontend (`http://localhost:5173`) and the backend (`http://localhost:3001`) have different origins. The browser **blocks** requests from one to the other unless the backend says it is fine: without it, you see `blocked by CORS policy` in the browser console. The starter already does this in `backend/src/app.ts`. If you ever need it in another Express project, this is the code to copy (`npm i cors` and `npm i -D @types/cors`):

```ts
import cors from "cors";
import express from "express";

const app = express();

// Allow requests from the React app. `cors()` must come before the routes.
app.use(cors({ origin: "http://localhost:5173" }));
app.use(express.json());
```

> 📝 **Note for coaches**: The stories only exist as issue templates in [`.github/templates`](https://github.com/wd-bootcamp/sd-recap-project-7/tree/main/.github/templates) of the template repository. If you rename or add an issue, change the table above. The API contract is also in `docs/api-contract.md` there.
