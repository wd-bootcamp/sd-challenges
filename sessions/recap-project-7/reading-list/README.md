# Recap Project 7: Reading List, Full Stack with a Coding Agent 🤖📚

In this recap project, you build the **Reading List** as a full-stack app: a **backend** (Express 5, TypeScript, MongoDB with mongoose) and a **frontend** (a framework of your choice with a shadcn-style component library). **Claude Code writes the code.** You plan, steer, check and review.

You know the Reading List from the CSS Frameworks Landscape and the Frontend Alternatives sessions, where it kept its data in the browser. Now the data lives in a database behind your own API.

This is an **individual project** in **your own repository**. You start from the [template repository sd-recap-project-7](https://github.com/wd-bootcamp/sd-recap-project-7) (see [Template](#template)). It creates 12 issues: three setup issues (1 to 3), eight core stories (4 to 11) and one bonus story (12).

At the end of the project you have:

- a backend with a documented API, connected to MongoDB, with a seed script
- a frontend that uses every endpoint: see, add, edit, delete, filter and search books
- a project that **Recap Project 8 can build on**: in Recap Project 8, you add security and tests to this code base (see [Left behind for Recap Project 8](#left-behind-for-recap-project-8))
- code that you reviewed and can explain: a route and a component that you did not write yourself

The focus is the work with the agent on **two projects that talk to each other**, like in Recap Project 6. Security (login, protected routes), automated API and E2E tests, and deployment are **not** part of this project. You build without them, **but so that they can be added**.

## The Rule: You Do Not Write Code

The rule of Recap Project 6 applies again. You do **not** write or change by hand:

- TypeScript, TSX, Vue, Svelte or HTML templates, and CSS
- tests
- configuration files such as `package.json`, `tsconfig.json`, `vite.config.*` or `components.json`
- changes the agent made, not even for "just a quick fix"

You **do** yourself:

- write prompts, give feedback on plans, and review diffs and pull requests
- read and change the texts of issues and Markdown for the agent (`CLAUDE.md`, skills, the reviewer)
- create the database, the connection string and the file `backend/.env` (a file with a secret is not code, and the agent must not read it)
- click in GitHub, MongoDB Atlas and the browser
- run any terminal command: `npm run dev`, `npm run seed`, `curl`, `git switch`, `gh pr merge`. The steps of your workflow (branch, commit, pull request) still go through your skills.

> 💡 When the agent gets stuck, do not type the fix yourself. Give it better context, show it the exact error, go back with `/rewind`, or ask a coach.

## Keep an Eye on Context and Usage

> ⚠️ This project has two code bases and more files than Recap Project 6. If you do not watch your context and your usage, your limit for the day can be gone early.

- Check `/usage` at the start and after every story.
- One story, one conversation: run `/clear` after every story. Your plan is in a file, so a new conversation can pick up from there.
- Work in one folder at a time. Start a story with the backend, check it, then do the frontend. Do not ask for both in one prompt.
- Keep the three `CLAUDE.md` files short. When the answers get slow or worse, check `/context`.
- Never let the agent run the tests in watch mode (`npm test`). Use `npm run test:run`.
- Do not paste long logs. Give Claude only the part that failed.

## Only Do What the Step Asks For

- One step is one issue, one branch and one pull request.
- Claude often suggests extras ("I could also add authentication", "Should I add pagination?"). Your answer: "No, only what the issue asks for." Write good ideas down.
- No new dependencies unless you agreed. No refactoring of code that does not belong to the issue.
- In the review, check that every changed file belongs to the issue.

## Template

This folder only contains the description of the project. Create your own **public** repository from the GitHub template [sd-recap-project-7](https://github.com/wd-bootcamp/sd-recap-project-7) and follow the [guide to set up your repository](https://github.com/wd-bootcamp/sd-recap-project-7/blob/main/docs/github-repository-template.md). The template contains:

- the 12 issues (they are created by a GitHub Action, see the guide), identical to the setup issues and user stories below
- a start for `CLAUDE.md`
- `docs/api-contract.md`: the API contract, the same as in [The API](#the-api) below
- empty folders `backend/` and `frontend/`: the backend comes from your Backend MongoDB project, you build the frontend with the agent

> 📝 **Note for coaches**: The setup issues and user stories below are a copy of the issue templates in [`.github/templates`](https://github.com/wd-bootcamp/sd-recap-project-7/tree/main/.github/templates) of the template repository, and the contract is a copy of `docs/api-contract.md` there. If you change one, change both.

> 💡 **Reminder**: Work on one feature branch per issue.

## Step 0: Before Your First Prompt

1. Create your repository from the template and choose **Public**. Check that the 12 issues appeared, create a project board and import the issues.
2. Clone the repository (Node.js 22.22 or newer is required).
3. Set up your security baseline **before you start Claude Code in the project for the first time**. Copy `.claude/settings.json` and `docs/agent-security.md` from your Recap Project 6 repository, and read both again. The baseline denies reading `.env` files and switches on the sandbox: this is exactly what you need for a project with a database connection string.
4. Commit and push the baseline.
5. Create your **MongoDB Atlas** cluster, as in the Databases and MongoDB session: a database user, access from your IP address and the connection string. You use it in issue 2.

> 💡 **The agent does not run servers and does not call the network.** The sandbox blocks network access, the baseline blocks `curl`, and the agent must not read `backend/.env`. So **you** start the backend and the frontend in two terminals, and **you** check the API with `curl` and the app in the browser. When a command needs the network (`npm install`, `git push`, `gh`, `npx shadcn@latest ...`), Claude asks to run it outside the sandbox: read the command, and only agree to what you expected.

> 🔐 **Secrets:** the connection string is a secret. It lives only in `backend/.env`. Never paste it into a prompt, an issue or a pull request. If it ever ends up in a commit, change the database password in Atlas first, then ask a coach.

## Step 1: Build Your Skills

Copy your skills and the reviewer from Recap Project 6 into the new repository (`.claude/skills/` and `.claude/agents/reviewer.md`) and read them again. Change what is different in this project:

- **`plan-feature`** (argument: issue number): same as before, plus: the plan says **which part** (backend, frontend) each file belongs to, how you check each acceptance criterion by hand (`curl` command or click path) and what is out of scope.
- **`build-feature`** (replaces `tdd-feature`, argument: plan file): implements the approved plan **in small steps, backend first, then frontend**. It runs the checks of the **Commands** section of the `CLAUDE.md` of the folder it changed. For logic without Express, the database or the UI (for example the validation function) it works **test-first**: one failing test, the failure checked, then the code. Routes and UI components do not need automated tests in this project: you check them by hand. It never changes an existing test unless the plan says so, and does nothing that is not in the plan.
- **`open-pr`** and **`create-issue`**: as before. The pull request description lists how **you** checked the story (the `curl` commands and what you clicked), not only what the agent did.
- **The reviewer:** as before (it reads `git diff main...HEAD`). Add two checks to it: secrets and connection strings in the diff, and whether every error case of the contract is handled.

> 💡 Automated tests for the API (Supertest), for the components and for the whole flow (Playwright) come in Backend Advanced and Recap Project 8. This is why the project keeps the Express app importable without a server (issue 2) and the validation in a pure function (issue 2 and 5).

## Step 2: Set Up the Project

Work on the setup issues 1, 2 and 3 first, in this order. Use the loop from Step 3, without `build-feature` where there is nothing to test:

- **Issue 1:** the structure and `CLAUDE.md` (root, `backend/`, `frontend/`)
- **Issue 2:** the backend: bring in your Backend MongoDB project, connect it to your database, check the layout and the contract
- **Issue 3:** the frontend skeleton: framework, component library, proxy to the API

Read the acceptance criteria and the hints of each issue carefully.

## Step 3: Build the Features

When the setup issues are done, work on the eight core stories 4 to 11 in the order of their numbers. The bonus story 12 is optional. Every story goes through the same loop:

1. **Clean start:** `git switch main` and `git pull`, check that `git status` is clean, run `/clear`, check the mode and `/usage`. Move the issue to "In Progress".
2. **Plan:** switch to Plan mode and run `/plan-feature <n>`. Read the plan like a pull request and remove everything that the issue does not ask for. Check that routes, validation and the store stay in separate files. Approve it and choose to review each edit.
3. **Branch and plan file:** Claude creates `feature/<n>-<slug>`, saves and commits the plan as `docs/plans/<n>-<slug>.md`, and stops.
4. **Implement:** run `/build-feature` with the plan file. Backend first.
5. **Check the API yourself:** start the backend (`npm run dev` in `backend/`) and check every acceptance criterion of the API with `curl -i`: status code, headers and body. Check the error cases, too.
6. **Check the app yourself:** start the frontend and check every acceptance criterion in the browser. Reload the page to see that the data comes from the database. Look at the network tab.
7. **Open the pull request:** run `/open-pr <n>`.
8. **Review:** read the "Files changed" tab yourself with the [review checklist](#review-checklist) below. Then let the reviewer sub-agent review the branch. Claude fixes the findings on the same branch (read the diff first).
9. **Finish:** merge the pull request, delete the branch and move the issue to "Done". `Closes #<n>` closes the issue.

Then start again with step 1 and the next issue.

## Step 4: Your Own Features

This step is optional. When all core stories are done, come up with your own features, for example a sort order, a "currently reading" page or reading dates. Describe your idea, run `/create-issue`, check the text and build it with the loop from Step 3. If your feature changes the API, change `docs/api-contract.md` in the same pull request.

## The Stack

**Backend** (`backend/`)

- Node.js 22, ES modules, TypeScript (`strict`), Express 5, mongoose, `tsx` to run it. No build step.
- Port `3001`, base path `/api`. Only JSON.
- Configuration in environment variables: `PORT`, `MONGODB_URI`. `.env` is not committed, `.env.example` is. The scripts load `.env` with `--env-file-if-exists=.env`.
- Structure (the layout of Backend MongoDB): `src/app.ts` exports `app` (no `listen`), `src/index.ts` connects and listens, `routes/books.ts`, `validation.ts`, `middleware/errors.ts`, `store/` (the `BooksStore` interface and the MongoDB implementation), `models/Book.ts`, `db.ts`, `scripts/seed.ts` and `scripts/check.ts`.
- You start from **your own** Backend MongoDB result. If it does not run, ask a coach for the solution of Backend MongoDB. The agent checks it against the criteria of issue 2 and fixes the gaps: you do not rebuild it.

**Frontend** (`frontend/`)

- TypeScript, a dev server with a proxy for `/api` to `http://localhost:3001`, Tailwind CSS and a **shadcn-style component library**: components are copied into your project and you own them.
- **You choose the framework** from the Week 10 landscape. The user stories do not depend on the framework. The library has to match:

| Framework | Library                                                                | Installed with                                                                             |
| --------- | ---------------------------------------------------------------------- | ------------------------------------------------------------------------------------------ |
| React     | [shadcn/ui](https://ui.shadcn.com) (the original, React only)          | `npx shadcn@latest init`, then `npx shadcn@latest add <component>`                         |
| Vue       | [shadcn-vue](https://www.shadcn-vue.com)                               | `npx shadcn-vue@latest init`, then `npx shadcn-vue@latest add <component>`                 |
| Svelte    | [shadcn-svelte](https://www.shadcn-svelte.com)                         | `npx shadcn-svelte@latest init`, then `npx shadcn-svelte@latest add <component>`           |
| Angular   | [spartan/ui](https://www.spartan.ng) (shadcn-style, not a direct port) | `npm i -D @spartan-ng/cli`, then `ng g @spartan-ng/cli:init` and `ng g @spartan-ng/cli:ui` |

All of them need Tailwind CSS first. Let the agent read the official installation guide of your library and plan the setup before it installs anything. You need these components: button, card, badge, input, textarea, select, dialog (and a confirmation dialog), a toast, and a way to switch the status filter (tabs, toggle group or select).

> ⚠️ You review code in a framework that you may not know well. That is part of the project: read what the agent wrote, ask it to explain what you do not understand, and check the result in the browser. If you pick a framework you did not use in Week 10, plan more time for the review.

## The API

The contract is the same for everybody and also in `docs/api-contract.md` of your repository. Base path `/api`, port `3001`. Responses contain exactly the fields `id, title, author, status, rating, notes`: `id` is a string (the MongoDB ObjectId as hex string), there is no `_id` and no `__v`.

```ts
type Status = "want-to-read" | "reading" | "done";

type Book = {
  id: string;
  title: string;
  author: string;
  status: Status;
  rating: number | null; // integer 1 to 5, null = not rated
  notes: string;
};
```

| Method and path         | Success                   | Errors                                               |
| ----------------------- | ------------------------- | ---------------------------------------------------- |
| `GET /api/health`       | 200 `{ "status": "ok" }`  |                                                      |
| `GET /api/books`        | 200 `Book[]`              | 400 for an unknown `status` or a repeated `q`        |
| `GET /api/books/count`  | 200 `{ "count": number }` |                                                      |
| `GET /api/books/:id`    | 200 `Book`                | 404 `{ "error": "Book not found" }`                  |
| `POST /api/books`       | 201 `Book`                | 400 `{ "error": "<message>" }`                       |
| `PUT /api/books/:id`    | 200 `Book`                | 400 `{ "error": "<message>" }`, 404 `Book not found` |
| `DELETE /api/books/:id` | 204, no body              | 404 `{ "error": "Book not found" }`                  |
| any other route         |                           | 404 `{ "error": "Not found" }`                       |

- `GET /api/books?status=<status>&q=<text>`: both parameters are optional and can be combined. `q` matches the title, ignores case and is trimmed.
- `POST` and `PUT` take `{ title, author, status?, rating?, notes? }`. Defaults: status `want-to-read`, rating `null`, notes `""`. 400 when the title or the author is missing or empty, the status is not one of the three values, or the rating is not `null` or an integer from 1 to 5. `PUT` replaces all editable fields (a missing field gets its default).
- All errors look like `{ "error": "<message>" }`. A body that is not valid JSON gives 400. An unexpected error gives 500 `{ "error": "Internal server error" }` without details.

Where this goes beyond the shared Reading List contract of the course (this is what your Backend MongoDB API does): `GET /api/books/count` exists, an unknown `status` filter and a repeated `q` give 400, an `id` that is not a valid ObjectId gives 404, unknown body fields are ignored, and the order of the list is the order of the database. The frontend does not need `count`.

If you change the API in a later step, change `docs/api-contract.md` in the same pull request.

## Setup Issues

The repository has three setup issues. Work on them first, in this order, before the user stories.

### 1: Setup - Repository, CLAUDE.md and Project Structure

This is the first setup issue: work on the setup issues 1, 2 and 3 before the user stories. The project gets its structure, and Claude gets the instructions for it.

#### Value Proposition

**As a** developer

**I want to** have a clear project structure and a `CLAUDE.md` for the whole project and for each part

**so that** the agent and I work on the backend and the frontend with the same rules.

#### Acceptance Criteria

- [ ] The repository has the folders `backend/` and `frontend/`, and the `README.md` says what the project is and how to run each part (a section "Run it" with the commands, filled in by issues 2 and 3).
- [ ] The root `CLAUDE.md` has the four parts **Stack**, **Commands**, **Conventions** and **Off limits**.
- [ ] Off limits contains at least: never read or write `.env`, never put a secret or a connection string in code or documents, never use `npm test` (watch mode), never change a test to make it pass, no new dependencies without asking, and only do what the current issue asks for.
- [ ] `backend/CLAUDE.md` and `frontend/CLAUDE.md` exist. They describe the structure and the rules of that part, as far as it is known now. Issues 2 and 3 complete them.
- [ ] `CLAUDE.md` says that `docs/api-contract.md` is the source of truth for the API and has to change together with the code.

#### Tasks

- [ ] Create the root `CLAUDE.md` with `/init`, then shorten it. The template contains a start: check it and complete it.
- [ ] Write the first version of `backend/CLAUDE.md` and `frontend/CLAUDE.md`.
- [ ] Keep every file short. The agent reads them in every conversation.

### 2: Setup - Backend Foundation from Backend MongoDB

The backend is the Express 5 API with MongoDB that you built in Backend MongoDB. This issue brings it into your repository and makes sure that it has the structure that all later stories (and Recap Project 8) rely on. No new feature yet.

#### Value Proposition

**As a** developer

**I want to** have the backend of Backend MongoDB in `backend/`, connected to my own database and checked against the API contract

**so that** every story has a working API under it and security and tests can be added later.

#### Acceptance Criteria

- [ ] `backend/` contains your API from Backend MongoDB: Express 5, TypeScript (`strict`), ES modules, run with `tsx`, mongoose. If you do not have a working version, ask a coach for the solution of Backend MongoDB.
- [ ] The scripts `dev`, `start`, `seed`, `typecheck`, `test`, `test:run` and `check` exist, and `typecheck` and `test:run` run without errors.
- [ ] The layout is: `src/app.ts` (exports `app`, no `listen`), `src/index.ts` (connects to the database, then listens on port 3001), `src/db.ts`, `src/routes/books.ts`, `src/middleware/errors.ts` (not found handler and central error handler), `src/validation.ts` (`parseBookInput`), `src/types.ts`, `src/models/Book.ts`, `src/store/` (the `BooksStore` interface and the MongoDB implementation: the only code that queries the database), `scripts/seed.ts` and `scripts/check.ts`. A different layout is fine if routes, validation, error handling and database access are separate and the app can be imported without listening.
- [ ] The configuration comes from environment variables (`PORT`, `MONGODB_URI`). `.env.example` is committed and lists every variable with a placeholder. `.env` is not committed (check `git status`). The repository contains no connection string, password or secret.
- [ ] The server connects to your MongoDB Atlas cluster, in the database `reading-list`, and stops with a clear message when `MONGODB_URI` is missing or the database is not reachable.
- [ ] `npm run seed` fills the database with the ten books of `src/seed.json` (it deletes all books first).
- [ ] `npm run check` (the contract test of Backend MongoDB, or your own) passes against the running server. If you use your own test script, it covers every rule of the contract.
- [ ] All errors leave the API as `{ "error": ... }`: unknown routes 404, invalid JSON 400, invalid data 400, unexpected errors 500 `{ "error": "Internal server error" }` without details. This happens in one central error handler.
- [ ] CORS allows only the origins of the frontend dev servers (a list, not `*`), or is not used at all, because the frontend uses the proxy of its dev server (issue 3).
- [ ] `backend/CLAUDE.md` is complete: stack, commands, structure, conventions, off limits.

#### Tasks

- [ ] Copy your Backend MongoDB project into `backend/` (without `node_modules` and without `.env`). Then let Claude **plan** the comparison with the criteria above in Plan mode, and check the plan before it changes anything.
- [ ] Create the MongoDB Atlas cluster, a database user and the connection string yourself (see your Databases and MongoDB session). Allow access from your IP address. Put the connection string, with the database name `reading-list`, into `backend/.env` yourself. **Never paste it into a prompt.** The agent cannot read `.env` (your baseline denies it): it only writes `.env.example`.
- [ ] Start the server yourself in a terminal (`npm run dev`), run `npm run seed` and `npm run check` yourself, and look at the responses with `curl -i` (the baseline blocks `curl` for the agent, and the sandbox has no network access).

<details>
<summary>Hint ✨</summary>

Check these cases with `curl -i` yourself:

```bash
curl -i http://localhost:3001/api/health
curl -i http://localhost:3001/api/nothing
curl -i -X POST http://localhost:3001/api/books -H "Content-Type: application/json" -d '{bad'
```

Express 5 forwards errors of `async` handlers to the error handler on its own. You do not need a wrapper.

</details>

### 3: Setup - Frontend Skeleton with a shadcn-style Component Library

The frontend is a single-page app in a framework of your choice from the Week 10 landscape, with a shadcn-style component library. This issue sets it up and connects it to the backend. No book feature yet.

#### Value Proposition

**As a** developer

**I want to** have a frontend skeleton with a component library that talks to the backend

**so that** every story can use ready-made, accessible components and the same way to call the API.

#### Acceptance Criteria

- [ ] The framework and the component library are written in `frontend/CLAUDE.md` and in the `README.md` (see the table of libraries in the project README).
- [ ] `frontend/` is a TypeScript project with its own dev server. The scripts `dev`, `build` and `check` (type check) exist and run without errors.
- [ ] The component library and Tailwind CSS are installed with the official CLI of the library. At least a button and a card from the library are used on the page.
- [ ] The dev server forwards requests to `/api` to the backend on port 3001 (a proxy). The frontend code only uses relative URLs like `/api/books`.
- [ ] All calls to the API are in one module (for example `api.ts` or a service). Components do not call `fetch` or `HttpClient` themselves.
- [ ] The page shows the title "Reading List" and the state of the backend, taken from `GET /api/health`: "API: ok" or "API not reachable".
- [ ] `frontend/CLAUDE.md` is complete: stack, commands, structure, conventions, off limits.

#### Tasks

- [ ] Decide on the framework and the library, and let Claude plan the setup before it installs anything.
- [ ] Read the commands that install packages before you approve them. The setup commands of the CLIs run code from the network.
- [ ] Start backend and frontend yourself, in two terminals, and check the page in the browser.

<details>
<summary>Hint ✨</summary>

The libraries need Tailwind CSS first and a path alias (`@/` or `$lib`) that matches in `tsconfig` and in the build tool. If the init command of the library fails, read its error message: it names what is missing. Give the agent the message, not your guess.

</details>

## User Stories

The core stories are issues 4 to 11, the bonus story is issue 12. Every story is a vertical slice: the API and the UI for one feature. Work on them in the order of their numbers.

### 4: See All Books

The first full slice: the books come from MongoDB, through the API, into the app.

#### Value Proposition

**As a** reader

**I want to** see all my books as cards with title, author, status and rating

**so that** I can get an overview of my reading list.

#### Acceptance Criteria

- [ ] **Database:** after `npm run seed` in `backend/`, the database contains the 10 books of `src/seed.json`. The script can run more than once and prints how many books it inserted.
- [ ] **Model:** the `Book` model has the fields of the API contract. A book can later get an owner without a rewrite of the model.
- [ ] **API:** `GET /api/books` answers 200 with the list of books. Every book has exactly the fields `id, title, author, status, rating, notes`: `id` is a string, there is no `_id` and no `__v`. (You check this: the API comes from issue 2.)
- [ ] **Code structure:** the route, the validation and the database access stay in separate files. Only the store talks to the database about books.
- [ ] **UI:** the books are shown as cards with the title, the author, a status badge ("Want to read", "Reading", "Done"), the rating (stars, or "Not rated") and the notes if there are any.
- [ ] **UI:** a loading state is shown while the books are loaded.
- [ ] **UI:** the layout has one column on a phone (360px) and more columns on a large screen.

#### Tasks

- [ ] Plan first: which part of this story already works through issue 2, and what is missing in the frontend? Check that nothing else is in the plan.
- [ ] Run `npm run seed` yourself. Check the books in Atlas (the data browser) and with `curl http://localhost:3001/api/books`.
- [ ] If the API differs from `docs/api-contract.md`, decide which one is right and change the other in the same pull request.

### 5: Add a Book

Create a book through the app. This story adds the first validation: it has to exist in the backend, because the frontend is not the only client of an API.

#### Value Proposition

**As a** reader

**I want to** add a book with title, author, status, rating and notes

**so that** I can keep track of what I want to read.

#### Acceptance Criteria

- [ ] **API (check it, fix it if it fails):** `POST /api/books` with `{ title, author, status?, rating?, notes? }` answers 201 with the new book. The defaults are status `want-to-read`, rating `null` and notes `""`. Title and author are trimmed.
- [ ] **API:** the request answers 400 `{ "error": "<message>" }` when the title or the author is missing or empty, the status is not `want-to-read`, `reading` or `done`, or the rating is not `null` or an integer from 1 to 5 (for example 0, 6, 2.5 or `"3"`). A body without JSON content answers 400, not 500.
- [ ] **API:** fields that are not editable (for example `id`) in the request body are ignored.
- [ ] **Code structure:** the validation is a separate function (`parseBookInput` in `src/validation.ts`) that does not depend on Express or the database, and it has unit tests that cover every rule above. If your backend misses a rule, the agent adds the rule and its test first.
- [ ] **UI:** the button "Add book" opens a dialog with the fields title, author, status (select), rating (1 to 5 or none) and notes. The buttons are "Save" and "Cancel".
- [ ] **UI:** the form does not send when the title or the author is empty and shows a message. When the API answers an error, its message is shown in the dialog.
- [ ] **UI:** after a successful save, the dialog closes, the new book is in the list and a toast like "Book added" appears. No toast appears when the request failed.
- [ ] **UI:** the Save button is disabled while the request runs.
- [ ] The new book is still there after a reload of the page.

#### Tasks

- [ ] Check every rule with `curl` against your API from issue 2. Plan fixes as test cases first: one test per missing rule.
- [ ] Check the 400 cases with `curl` yourself (see the contract). Look at the response, not only at the status code.
- [ ] Check in Atlas that the book is stored with the right types (`rating` is a number or null).

<details>
<summary>Hint ✨</summary>

Mongoose casts values: it turns the text `"3"` into the number 3 on its own. Your contract says `"3"` is invalid. Check the rating in your validation function, before the data reaches mongoose.

</details>

### 6: Edit a Book

Change a book.

#### Value Proposition

**As a** reader

**I want to** edit a book

**so that** I can correct details, change the status and add my rating when I finished it.

#### Acceptance Criteria

- [ ] **API (check it, fix it if it fails):** `GET /api/books/:id` answers 200 with the book, or 404 `{ "error": "Book not found" }`. An `id` that is not a valid ObjectId also answers 404, not 500.
- [ ] **API (check it, fix it if it fails):** `PUT /api/books/:id` replaces the editable fields with the same validation as `POST` and answers 200 with the updated book. It answers 400 for invalid data and 404 for an unknown `id`.
- [ ] **UI:** every card has an "Edit" button. It opens the same dialog as "Add book", filled with the current values of the book from `GET /api/books/:id`.
- [ ] **UI:** after a successful save, the dialog closes, the card shows the new values and a toast like "Book saved" appears.
- [ ] **UI:** when the book does not exist any more (for example deleted in another tab), an error message is shown and the list is refreshed.
- [ ] The change is still there after a reload of the page.
- [ ] The form code is not copied: add and edit share one form component.

#### Tasks

- [ ] Check `GET`, `PUT` and the 404 and 400 cases with `curl` yourself.
- [ ] Try the edit in two browser tabs: delete a book in tab 1, then save it in tab 2.

### 7: Delete a Book

Remove a book, after a confirmation.

#### Value Proposition

**As a** reader

**I want to** delete a book after I confirmed it

**so that** my list only contains books that I care about.

#### Acceptance Criteria

- [ ] **API (check it, fix it if it fails):** `DELETE /api/books/:id` answers 204 without a body and removes the book. An unknown or invalid `id` answers 404 `{ "error": "Book not found" }`.
- [ ] **UI:** every card has a "Delete" button. It opens a confirmation dialog with the title of the book and the buttons "Delete" and "Cancel".
- [ ] **UI:** "Cancel" closes the dialog and keeps the book. "Delete" removes the book from the list and shows a toast like "Book deleted".
- [ ] **UI:** when the request fails, the book stays in the list and an error message is shown.
- [ ] The book is gone after a reload of the page, and also in Atlas.
- [ ] The dialog can be used with the keyboard only (Tab, Enter, Escape).

#### Tasks

- [ ] Check the 204 (no body) and the 404 with `curl -i` yourself.

### 8: Filter by Status

The filter is done by the backend: the frontend sends the status as a query parameter.

#### Value Proposition

**As a** reader

**I want to** filter my books by status

**so that** I can see what I am reading right now or what is next.

#### Acceptance Criteria

- [ ] **API (check it, fix it if it fails):** `GET /api/books?status=<want-to-read|reading|done>` answers only the books with that status. Without `status`, all books are returned.
- [ ] **API:** an unknown status (for example `?status=nope`) answers 400 `{ "error": "<message>" }`, not an empty list.
- [ ] **UI:** a control with "All" and the three statuses (tabs, toggle group or select) filters the list. The active filter is visible.
- [ ] **UI:** the app asks the API for the filtered list. It does not load all books and filter in the browser.
- [ ] **UI:** an empty state is shown when no book has this status.

#### Tasks

- [ ] Check `?status=reading` and `?status=nope` with `curl` yourself.
- [ ] Watch the network tab of the browser: there is one request with the query parameter when you change the filter.

### 9: Search by Title

Search is also done by the backend. The filter and the search work together.

#### Value Proposition

**As a** reader

**I want to** search my books by title

**so that** I can find a book quickly.

#### Acceptance Criteria

- [ ] **API (check it, fix it if it fails):** `GET /api/books?q=<text>` answers the books whose title contains the text. The match ignores case, and the text is trimmed. An empty `q` means no filter. `status` and `q` can be combined.
- [ ] **API:** special characters in `q` are matched as text: a search for `C++` or `(` does not fail with a 500 error and does not match everything.
- [ ] **UI:** a search field filters the list while typing. The app does not send a request for every key stroke (wait until the typing pauses for a moment).
- [ ] **UI:** the search works together with the status filter.
- [ ] **UI:** the empty state says that no books match, and suggests another title or status.

#### Tasks

- [ ] Check `?q=dune`, `?q=%20DUNE%20`, `?q=C%2B%2B` and `?status=done&q=the` with `curl` yourself.
- [ ] Add a book with the title `C++ Primer` and search for `C++`.

<details>
<summary>Hint ✨</summary>

Searching with a regular expression in MongoDB is the easy way, but the text of the user becomes part of the pattern. Ask the agent how the characters `+`, `(` and `*` behave in a pattern and how to escape them.

</details>

### 10: Loading, Error and Empty States

The backend can be down, slow or wrong. The app has to say what is going on.

#### Value Proposition

**As a** reader

**I want to** see what the app is doing and what went wrong

**so that** I am never left with a blank page or a button that does nothing.

#### Acceptance Criteria

- [ ] **UI:** while the list loads, a loading state is shown (skeletons or a message).
- [ ] **UI:** when the backend is not reachable, the list is replaced by an error message and a button "Try again". Nothing crashes. After the backend is back, "Try again" shows the books.
- [ ] **UI:** when the API answers an error (400, 404, 500), the message of the API is shown for add, edit and delete: in the dialog for forms, in a toast for delete.
- [ ] **UI:** an empty database shows an empty state with a friendly message and a hint to add the first book. An empty result of a filter or a search shows a different message.
- [ ] **UI:** buttons that start a request are disabled while the request runs, so a double click does not create two books.
- [ ] **API:** an unexpected error answers 500 `{ "error": "Internal server error" }`. The response contains no stack trace and no details of the database.

#### Tasks

- [ ] Test it yourself: stop the backend and reload the page, start it again and press "Try again". Run `npm run seed` after you emptied the collection in Atlas to see the empty state.
- [ ] Ask the agent how you could cause a 500 error on purpose (for example in a copy of the code). Do not leave the change in the project.

### 11: Hand Over - Ready for Recap Project 8

In Recap Project 8, you add security and tests to this project. This issue makes sure that your project is ready for that, and that someone who has never seen it can start it.

#### Value Proposition

**As a** developer

**I want to** leave the project documented and clean

**so that** I and my teammates can start it, understand it and extend it in the next project.

#### Acceptance Criteria

- [ ] The `README.md` explains how to start the project from a fresh clone: install, create `backend/.env` from `backend/.env.example`, seed, start backend and frontend, and which URLs to open. A classmate can follow it without asking you.
- [ ] `docs/api-contract.md` describes every endpoint with an example request and response and every error, and it matches the code. You checked every example with `curl`.
- [ ] `backend/.env.example` lists every variable that the code reads. No secret is in the repository: search the code and the history for your connection string and your database password.
- [ ] The structure is as described in the project README (checklist "Left behind for Recap Project 8"): routes, validation, models and the store are separate, there is one central error handler, and the app can be imported without a server and a database.
- [ ] All books of the database belong to nobody yet, but the model and the database access are in one place each, so that an owner can be added later. Write down in `README.md`, in two or three sentences, where you would add an owner.
- [ ] `CLAUDE.md` (root, `backend/`, `frontend/`) is up to date: the commands work, the structure is correct.
- [ ] `npm run typecheck`, `npm run test:run` and `npm run check` in `backend/`, and `npm run check` and `npm run build` in `frontend/` run without errors.
- [ ] Every user story of this project works end to end, in the browser, after a fresh `npm run seed`.

#### Tasks

- [ ] Let Claude check the list above and report what is missing. Check the answer yourself.
- [ ] Ask a classmate to start your project from a fresh clone with only your README.
- [ ] Prepare your demo: add a book, edit it, filter, search, delete it, and show the error state.

### 12: Bonus - Reading Statistics

This story is optional. Do it after the core stories.

#### Value Proposition

**As a** reader

**I want to** see a short summary of my reading list

**so that** I know how much I read and how I rate my books.

#### Acceptance Criteria

- [ ] **UI:** above the list, a summary shows the number of books, the number per status and the average rating of the rated books (or a hint when no book is rated).
- [ ] **UI:** the summary updates after add, edit and delete, and follows the active filter and search.
- [ ] The summary is calculated in the frontend from the list that is shown. The API does not change.

#### Tasks

- [ ] Plan where the calculation lives, so that it is a function that can be tested later.

## Left Behind for Recap Project 8

In Recap Project 8, you add security and tests to **this** project, and deploy it. These points make that possible. Issue 11 checks them.

- [ ] **Layers:** routes, validation, the store (`BooksStore`) and the model are in separate files. Middleware can be added between `express.json()` and the router.
- [ ] **Importable app:** `src/app.ts` exports `app` without `listen` and without a database connection (`src/index.ts` connects and listens), so that tests can import it.
- [ ] **Central error handler:** every error leaves the API as `{ "error": "<message>" }` with the right status code. Routes only answer expected cases (400, 404) and let everything else reach the handler. The 500 response contains no details.
- [ ] **Configuration:** all configuration comes from environment variables. `.env.example` lists them all, `.env` is not committed, and the repository (also its history) contains no secret.
- [ ] **Scripts:** `backend/` has `dev`, `start`, `typecheck`, `test:run`, `check` and `seed`. `frontend/` has `dev`, `build` and `check`. They are documented in the `README.md`.
- [ ] **API contract:** `docs/api-contract.md` matches the code and has an example for every endpoint and every error.
- [ ] **Seed script:** `npm run seed` fills an empty database with the books of `src/seed.json`.
- [ ] **Validation and a contract test:** the validation of book data is a pure function with unit tests, and `npm run check` tests the whole contract against a server. Supertest tests in Recap Project 8 can build on both.
- [ ] **One place for the frontend API calls:** a module that all components use, so that a token can be added in one place.
- [ ] **`CLAUDE.md`:** root, `backend/` and `frontend/` are complete and correct.
- [ ] **Owner-ready data model:** only the store (`store/mongoBooksStore.ts`) queries books. Adding a `userId` to the model and to the queries later is a change in a few places, not a rewrite. (You do **not** add a `userId` now.)

## Review Checklist

Use it for every pull request, before you merge:

- **Secrets:** no connection string, password or token in any file of the diff. `.env` is not part of it. New variables are in `.env.example` with a placeholder.
- **Scope:** every changed file belongs to the issue. No new dependency that you did not agree to.
- **Validation:** the backend checks the data itself. The frontend validation is a convenience, not the protection.
- **Errors:** each error case of the contract has the right status code and the shape `{ "error": ... }`. No `500` for bad input. No stack traces in responses.
- **Structure:** no database call in a route file (only the store), no `fetch` in a component.
- **Frontend:** loading, error and empty states exist. A success toast only appears after the API call succeeded. Everything works with the keyboard.
- **You can explain** the route and the component of this story: which request comes in, where it goes and what is sent back.

## Helpful Tips

- Look things up in the curriculum: Backend MongoDB (mongoose), Backend API Routes, Databases and MongoDB, the Frontend Alternatives session, the CSS Frameworks Landscape session and the four AI sessions.
- Read the plan before you approve it. A wrong plan is cheap, wrong code is not.
- Commit before every task, so `git diff` shows what the agent did.
- You cannot reach the API from the browser console of another site, and the browser blocks requests to another origin without CORS. This is why the dev server forwards `/api`: the browser only talks to one origin. A deployment needs another solution (Recap Project 8).
- Atlas says "connection refused" or times out? Your IP address changed. Check "Network Access" in Atlas.

## Demo

At the end of the project, you show your app to the coaches and to each other: add a book, edit it, filter and search, delete it, and show what happens when the backend is stopped. Then show one route and one component that you did not write yourself and explain them.

## Your General Learnings

- Steer a coding agent through a project with a backend and a frontend that talk to each other.
- Plan in small vertical slices and review each plan before any code is written.
- Check an API yourself with `curl`, status codes and error cases included.
- Keep secrets out of prompts, code and the repository.
- Review code in a framework you do not know well.
- Leave a project in a state that others can start, understand and extend.
