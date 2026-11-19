# Recap Project 7: Todo App, Full Stack

In this recap project, you build a **todo app** with a **backend** (Express, MongoDB with mongoose) and a **frontend** (React). Users can see, add, tick off, edit and delete todos, and the todos are stored in a database.

The app is small on purpose. The point is that you connect the three parts you learned so far: **React talks to Express, and Express talks to MongoDB.** Build it with Claude Code, as you learned in the AI sessions: plan first, work in small steps and read everything the agent writes.

This is an **individual project** in **your own repository**. You start from the [template repository sd-recap-project-7](https://github.com/wd-bootcamp/sd-recap-project-7) (see [Template](#template)). It creates 9 issues: one setup issue (1), seven core stories (2 to 8) and one bonus story (9).

At the end of the project you have:

- a backend with a documented API and full CRUD (create, read, update, delete), connected to MongoDB
- a frontend that uses every endpoint
- a project that **Recap Project 8 can build on**: there, you add security and tests to this code base
- code that you reviewed and can explain: a route and a component that you did not write yourself

Login, automated tests and deployment are **not** part of this project.

## Template

This folder contains the description of the project and a copy of the starter. Do not work in this folder. Create your own **public** repository from the GitHub template [sd-recap-project-7](https://github.com/wd-bootcamp/sd-recap-project-7) and follow the [guide to set up your repository](https://github.com/wd-bootcamp/sd-recap-project-7/blob/main/docs/github-repository-template.md). The template contains:

- the 9 issues (created by a GitHub Action), identical to the user stories below
- the starter project (see [Starter project](#starter-project))
- `CLAUDE.md` for Claude Code and `docs/api-contract.md` (the API contract, the same as in [The API](#the-api))

> 📝 **Note for coaches**: The stories below are generated from the issue templates in [`.github/templates`](https://github.com/wd-bootcamp/sd-recap-project-7/tree/main/.github/templates) of the template repository. If you change a story, change it in both places. The contract is also in `docs/api-contract.md` there.

> 💡 **Reminder**: Work on one feature branch per issue.

## Starter project

The starter has two folders. Run `npm i` in both.

**`backend/`**: Express 5, TypeScript, mongoose. It is the same layout as your Backend MongoDB project. What is already there:

- `src/index.ts` connects to the database and starts the server on port 3001. `src/db.ts` reads `.env`.
- `src/app.ts` sets up the app with **CORS**, the JSON body parser, a health route (`/api/health`), the todos router, a 404 handler and an error handler.
- `src/middleware/errors.ts` sends every error as `{ "error": "..." }`: invalid JSON gives 400, invalid data gives 400, an invalid id gives 404, an unexpected error gives 500.
- `src/types.ts` has the types `Todo` and `NewTodo`.
- **You write** `src/models/Todo.ts` and `src/routes/todos.ts`.

**`frontend/`**: Vite, React 19, TypeScript and [SWR](https://swr.vercel.app/), with some basic styles in `src/styles.css`.

- `src/api.ts` has the address of the API. Put all functions that call the API here.
- `src/App.tsx` is your starting point. You write the components.

Run `npm run typecheck` (backend) and `npm run check` (frontend) regularly.

### CORS

The frontend (`http://localhost:5173`) and the backend (`http://localhost:3001`) have different origins. The browser **blocks** requests from one to the other unless the backend says it is fine. Without it, you see `blocked by CORS policy` in the browser console.

The starter already does this in `backend/src/app.ts`. If you ever need it in another Express project, this is the code to copy:

```bash
npm i cors
npm i -D @types/cors
```

```ts
import cors from "cors";
import express from "express";

const app = express();

// Allow requests from the React app. `cors()` must come before the routes.
app.use(cors({ origin: "http://localhost:5173" }));
app.use(express.json());
```

> 💡 The browser sends an extra "preflight" request (`OPTIONS`) before `PUT` and `DELETE` requests, and before requests with a JSON body. The `cors` package answers it for you.

## Working with Claude Code

- **Plan before you code.** Use Plan mode for each issue, read the plan, remove what the issue does not ask for, then let Claude implement it. One issue is one conversation: run `/clear` between issues.
- **Read what Claude writes.** You have to be able to explain every route and every component. Use the [review checklist](#review-checklist).
- **Only what the issue asks for.** Claude likes to add extras (login, validation libraries, a state library, tests). Your answer: "No, only what the issue asks for."
- **Secrets.** The connection string lives only in `backend/.env`. Never paste it into a prompt, an issue or a pull request. Set up your security baseline from Recap Project 6 (it denies reading `.env` files) before you start Claude Code in this project. If the connection string ever ends up in a commit, change the database password in Atlas first, then ask a coach.
- **Check it yourself.** Check the API in Bruno and the app in the browser, and reload the page to see that the data comes from the database.

## The API

The contract is the same for everybody and also in `docs/api-contract.md` of your repository. Base path `/api`, port `3001`. A todo has exactly the fields `id`, `title` and `done`.

```ts
type Todo = {
  id: string; // the MongoDB ObjectId as a string
  title: string;
  done: boolean;
};
```

| Method and path         | Body                  | Success                  | Errors                                               |
| ----------------------- | --------------------- | ------------------------ | ---------------------------------------------------- |
| `GET /api/health`       |                       | 200 `{ "status": "ok" }` |                                                      |
| `GET /api/todos`        |                       | 200 `Todo[]`             |                                                      |
| `POST /api/todos`       | `{ "title" }`         | 201 `Todo`               | 400 `{ "error": "<message>" }`                       |
| `PUT /api/todos/:id`    | `{ "title", "done" }` | 200 `Todo`               | 400 `{ "error": "<message>" }`, 404 `Todo not found` |
| `DELETE /api/todos/:id` |                       | 204, no body             | 404 `{ "error": "Todo not found" }`                  |
| any other route         |                       |                          | 404 `{ "error": "Not found" }`                       |

- `POST` creates a todo with `done: false`. The title is trimmed. A missing or empty title gives 400.
- `PUT` replaces `title` and `done`: send both.
- All errors look like `{ "error": "<message>" }`.

## Setup Issue

Work on issue 1 first.

### 1: Setup - Run the Starter

The starter has a backend and a frontend that do not know each other yet. In this issue you run both and check that they can talk. No todo feature yet.

#### Value Proposition

**As a** developer

**I want to** run the backend and the frontend on my machine, connected to my own database

**so that** every story can build on a working setup.

#### Acceptance Criteria

- [ ] You have a MongoDB database (Atlas or local) and `backend/.env` with your `MONGODB_URI`. `.env` is **not** in the repository (check `git status`).
- [ ] `npm run dev` in `backend/` prints that it is connected to the database and that the API is running on port 3001.
- [ ] `GET http://localhost:3001/api/health` answers `{ "status": "ok" }` (check it in Bruno or in the browser).
- [ ] `npm run dev` in `frontend/` shows the page "Todos" on http://localhost:5173.
- [ ] You can explain in one sentence why `backend/src/app.ts` contains `cors(...)`.
- [ ] You read the root `CLAUDE.md` and `docs/api-contract.md`.

#### Tasks

- [ ] Create `backend/.env` from `backend/.env.example` and put in your connection string. Use the database name `todos`. **Never paste the connection string into a prompt.**
- [ ] Run `npm i` in `backend/` and in `frontend/`.
- [ ] Start both parts in two terminals.
- [ ] Create a Bruno collection "Todo API" with an environment variable `baseUrl = http://localhost:3001` and a first request for `/api/health`.

<details>
<summary>Hint ✨</summary>

Atlas says "connection refused" or the server stops at start? Check "Network Access" in Atlas (your IP address may have changed) and that the password in the connection string has no special characters that need URL encoding.

</details>

## User Stories

The core stories are issues 2 to 8, the bonus story is issue 9. Every story is a vertical slice: the API and the UI for one feature. Work on them in the order of their numbers.

### 2: See All Todos

The first full slice: the todos come from MongoDB, through your API, into the app.

#### Value Proposition

**As a** user

**I want to** see all my todos

**so that** I know what I still have to do.

#### Acceptance Criteria

- [ ] **Model:** `backend/src/models/Todo.ts` has the schema (`title`: required string, trimmed, `done`: boolean, default `false`), the model and the function `toTodo` that sends `id` instead of `_id` and no `__v`.
- [ ] **API:** `GET /api/todos` answers 200 with the list of todos. Every todo has exactly `id`, `title` and `done`.
- [ ] **UI:** the todos are shown as a list. A done todo is shown as done (a checked checkbox and a struck-through title).
- [ ] **UI:** `src/api.ts` has the fetcher, and the list is loaded with `useSWR`. Components do not call `fetch`.
- [ ] **UI:** a loading message is shown while the todos load.
- [ ] **UI:** when there are no todos, a friendly message is shown.

#### Tasks

- [ ] Check the endpoint in Bruno first (the list is empty), then fill your database with two or three todos in Atlas or Compass (a todo is `{ "title": "...", "done": false }`) and check again.
- [ ] Open the Network tab in the browser and look at the request to `/api/todos`.

### 3: Add a Todo

Create a todo through the app.

#### Value Proposition

**As a** user

**I want to** add a todo

**so that** I do not forget what I have to do.

#### Acceptance Criteria

- [ ] **API:** `POST /api/todos` with `{ "title": "..." }` answers 201 with the new todo (`done` is `false`). The title is trimmed.
- [ ] **API:** a missing or empty title answers 400 `{ "error": "<message>" }`. A body that is not valid JSON answers 400, too.
- [ ] **UI:** a form with a text field and an "Add" button is shown above the list.
- [ ] **UI:** the form does not send an empty title (the button is disabled or a message is shown).
- [ ] **UI:** after saving, the field is empty and the new todo is in the list.
- [ ] The new todo is still there after a reload of the page, and you see it in the database.

#### Tasks

- [ ] Check the 201 and the 400 cases in Bruno. Look at the response body, not only at the status code.
- [ ] The API call is a function in `src/api.ts`.
- [ ] After the request, tell SWR to load the list again (`mutate`).

<details>
<summary>Hint ✨</summary>

Send `Content-Type: application/json` and a `JSON.stringify`d body with `fetch`, otherwise `express.json()` does not read the body.

</details>

### 4: Mark a Todo as Done

Update a todo.

#### Value Proposition

**As a** user

**I want to** tick off a todo, and untick it again

**so that** I can see what is done and what is not.

#### Acceptance Criteria

- [ ] **API:** `PUT /api/todos/:id` with `{ "title": "...", "done": true }` replaces the todo and answers 200 with the updated todo (the new values, not the old ones).
- [ ] **API:** an unknown `id` answers 404 `{ "error": "Todo not found" }`. An `id` like `abc` answers 404, too, not 500.
- [ ] **API:** an empty title answers 400, also for `PUT`.
- [ ] **UI:** every todo has a checkbox. Clicking it sends the request and the todo changes in the list.
- [ ] The state is still the same after a reload of the page.

#### Tasks

- [ ] Check the 200, 404 (unknown and invalid id) and 400 cases in Bruno.
- [ ] `PUT` replaces the whole todo: send the current `title` together with the new `done`.

<details>
<summary>Hint ✨</summary>

`findByIdAndUpdate` returns the **old** document unless you pass `returnDocument: "after"`. An update also skips the schema rules unless you pass `runValidators: true`.

</details>

### 5: Edit a Todo

Change the title of a todo. The API route is the one from issue 4.

#### Value Proposition

**As a** user

**I want to** change the title of a todo

**so that** I can fix a typo or a changed plan.

#### Acceptance Criteria

- [ ] **UI:** every todo has an "Edit" button. It turns the title into a text field with the buttons "Save" and "Cancel".
- [ ] **UI:** "Save" sends the new title (and keeps the `done` state). The todo shows the new title.
- [ ] **UI:** "Cancel" closes the field and keeps the old title.
- [ ] **UI:** an empty title is not sent.
- [ ] The new title is still there after a reload of the page.

#### Tasks

- [ ] Use the existing `updateTodo` function and the existing route. This story needs no change in the backend.
- [ ] Try it with an empty title and see what happens.

### 6: Delete a Todo

Complete the CRUD operations.

#### Value Proposition

**As a** user

**I want to** delete a todo

**so that** my list only has todos that matter.

#### Acceptance Criteria

- [ ] **API:** `DELETE /api/todos/:id` answers 204 without a body and removes the todo.
- [ ] **API:** an unknown or invalid `id` answers 404 `{ "error": "Todo not found" }`. Deleting the same todo twice gives 404 the second time.
- [ ] **UI:** every todo has a "Delete" button. The todo is gone from the list after the click.
- [ ] The todo is still gone after a reload of the page, and also in the database.

#### Tasks

- [ ] Check the 204 and the 404 in Bruno (send the request twice).
- [ ] A 204 response has **no body**: do not call `response.json()` on it.

### 7: Loading, Error and Empty States

The backend can be down or slow, and a request can fail. The app has to say what is going on.

#### Value Proposition

**As a** user

**I want to** see what the app is doing and what went wrong

**so that** I am never left with a blank page or a button that does nothing.

#### Acceptance Criteria

- [ ] **UI:** while the list loads, a loading message is shown.
- [ ] **UI:** when the backend is not reachable, an error message and a button "Try again" replace the list. Nothing crashes. After you start the backend again, "Try again" shows the todos.
- [ ] **UI:** when the API answers an error for add, edit or delete, its message is shown and the list stays as it was.
- [ ] **UI:** after a failed save, the text you typed is still there.
- [ ] **UI:** an empty list shows a friendly message with a hint to add the first todo.
- [ ] **UI:** the "Add" button is disabled while the request runs, so a double click does not create two todos.

#### Tasks

- [ ] Stop the backend, reload the page, start the backend, and press "Try again".
- [ ] Add a todo and stop the backend before you press "Add": what does the user see?

### 8: Hand Over - Ready for Recap Project 8

In Recap Project 8, you add security and tests to this project. This issue makes sure that someone who has never seen it can start it, and that it can be extended.

#### Value Proposition

**As a** developer

**I want to** leave the project documented and clean

**so that** I can start it, understand it and extend it in the next project.

#### Acceptance Criteria

- [ ] The `README.md` explains how to start the project from a fresh clone: install, create `backend/.env` from `backend/.env.example`, start the backend and the frontend, and which URLs to open. A classmate can follow it without asking you.
- [ ] `docs/api-contract.md` matches your API: every endpoint and every error. You checked each example in Bruno.
- [ ] `backend/.env.example` lists every variable that the code reads, with placeholders only. No connection string or password is in the repository (search the code and the history).
- [ ] The structure is clean: routes, the model and the error handlers are in separate files, all API calls of the frontend are in `src/api.ts`, and there is no leftover code and no unused file.
- [ ] `npm run typecheck` (backend) and `npm run check` and `npm run build` (frontend) run without errors.
- [ ] In the `README.md`, write two or three sentences on where you would add an owner for each todo (a user who owns it) in the backend and in the frontend.
- [ ] Every user story works end to end in the browser.

#### Tasks

- [ ] Ask a classmate to start your project from a fresh clone with only your README.
- [ ] Prepare your demo: add, tick off, edit and delete a todo, and show the error state with the backend stopped.

### 9: Bonus - Filter the Todos

This story is optional. Do it after the core stories.

#### Value Proposition

**As a** user

**I want to** show only the open or only the done todos

**so that** I can focus on what is left.

#### Acceptance Criteria

- [ ] **API:** `GET /api/todos?done=true` answers only the done todos, `?done=false` only the open ones. Without `done`, all todos are returned.
- [ ] **UI:** three buttons "All", "Open" and "Done" filter the list. The active one is visible.
- [ ] **UI:** the app asks the API for the filtered list (look at the Network tab). It does not filter in the browser.
- [ ] **UI:** an empty result shows a message that fits the filter.
- [ ] `docs/api-contract.md` describes the new query parameter.

#### Tasks

- [ ] Check `?done=true`, `?done=false` and no parameter in Bruno.
- [ ] Put the filter into the key of `useSWR`, so that every filter has its own request.

## Review Checklist

Use it for every pull request, before you merge:

- **Secrets:** no connection string, password or token in any file of the diff. `.env` is not part of it.
- **Scope:** every changed file belongs to the issue. No new dependency that you did not agree to.
- **Errors:** each error case of the contract has the right status code and the shape `{ "error": ... }`. No `500` for bad input.
- **Structure:** no `fetch` in a component (only in `src/api.ts`), no database code in `app.ts`.
- **Frontend:** the list shows what the database has after a reload. A failed request shows a message.
- **You can explain** the route and the component of this story: which request comes in, where it goes and what is sent back.

## Left Behind for Recap Project 8

In Recap Project 8, you add security and tests to **this** project. These points make that possible. Issue 8 checks them.

- [ ] `src/app.ts` exports `app` and does not listen, so that tests can import it.
- [ ] Routes, model and error handlers are in separate files. Middleware can be added before the router.
- [ ] Every error leaves the API as `{ "error": "<message>" }` with the right status code.
- [ ] All configuration is in environment variables. `.env.example` lists them, `.env` is not committed.
- [ ] `docs/api-contract.md` matches the code.
- [ ] All API calls of the frontend are in `src/api.ts`, so that a token can be added in one place later.
- [ ] You do **not** add a user or login now.

## Helpful Tips

- Look things up in the curriculum: Backend MongoDB (mongoose), Backend API Routes, React Data Fetching (SWR) and the AI sessions.
- Commit before every task, so `git diff` shows what the agent did.
- `blocked by CORS policy` in the browser console: the backend is not running, or the origin in `cors({ origin })` is not the address of your frontend (check the port).
- Atlas says "connection refused" or times out? Your IP address changed. Check "Network Access" in Atlas.
- A request that fails in the browser but works in Bruno is almost always CORS or a missing `Content-Type: application/json` header.

## Demo

At the end of the project, you show your app to the coaches and to each other: add a todo, tick it off, edit it, delete it, and show what happens when the backend is stopped. Then show one route and one component that you did not write yourself and explain them.

## Your General Learnings

- Connect a React frontend, an Express backend and a MongoDB database into one app.
- Explain what CORS is and why the browser needs it.
- Build the four CRUD operations through all three layers.
- Check an API in Bruno, status codes and error cases included.
- Plan and review the work of a coding agent.
- Keep secrets out of prompts, code and the repository.
