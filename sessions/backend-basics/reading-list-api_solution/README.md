# Reading List API (solution)

One possible solution of the starter `reading-list-api`, including the bonus. Compare it with your own code after you finished: it is not the only correct one. Run `npm i`, `npm run dev` and in a second terminal `npm run check -- --bonus`.

The task description of the starter follows.

You direct Claude Code to build a small **Express server** with TypeScript, then you **review** what it wrote. The server sends the data of the Reading List to anyone who asks. It is **read-only**: it has no routes to add, change or delete a book. That comes in the next session.

Read this README completely before you start.

## The task

Build a JSON API on **port 3001** with these routes:

| Request                | Response                                                        |
| ---------------------- | --------------------------------------------------------------- |
| `GET /api/health`      | status `200`, body `{ "status": "ok" }`                         |
| `GET /api/books`       | status `200`, body: the array of all books from `src/seed.json` |
| `GET /api/books/count` | status `200`, body `{ "count": <number of books> }`             |
| any other request      | status `404`, body `{ "error": "Not found" }`                   |

Rules:

- Use **Express 5** with TypeScript. Do not use any other server library.
- The books come from `src/seed.json`. The server must **read** the file, not copy the books into the code.
- Every response is JSON, with the right status code.
- Put the Express app in `src/app.ts` and the call of `listen` in `src/index.ts`.

### What is in the starter

- `src/seed.json` and `src/types.ts`: the books and the `Book` type, the same as in the Reading List app of the last days. **Do not change them.**
- `CLAUDE.md`: the project rules for the coding agent.
- `scripts/check.ts`: a script that calls your **running** server and reports `PASS` or `FAIL` for every route. It is your self-check, you do not write it.
- `package.json` and `tsconfig.json`: scripts and TypeScript settings. The server code is missing.

### Steps

1. Work in a git repository: `git init -b main`, `git add .`, `git commit -m "Initial commit"`. Run `npm i`.
2. Read `CLAUDE.md`. Is every rule true and clear? Start Claude Code in the project root.
3. Switch to **plan mode** (`Shift+Tab`). Describe the task in your own words (what, which routes, which rules) and ask for a plan. Do **not** paste this README.
4. **Review the plan** before you approve it. Which files will change? Which packages will be installed? Does it follow `CLAUDE.md`? Ask for at least one change.
5. Approve the plan and review every diff and every permission prompt. Claude will install packages, check what it installs.
6. Start the server in a terminal: `npm run dev`. The terminal must show a message with the address.
7. **Look at the requests yourself:**
   - Open `http://localhost:3001/api/books` in the browser. Open the dev tools, tab **Network**, reload, and click the request. Find the method, the status code, the `Content-Type` header and the response body.
   - Call every route with `curl -i`, for example `curl -i http://localhost:3001/api/health`. Call a route that does not exist.
8. Open a **second** terminal and run `npm run check`. Fix what fails: ask the agent, but first read the failing message and say what you think is wrong.
9. Run `npm run typecheck`. Commit when `npm run check` and `npm run typecheck` pass.

> 💡 `npm run check` needs the server to run. If it says it cannot reach the server, start `npm run dev` in another terminal.

### Review your result

Read the code the agent wrote, not only the result of the check:

- Does the server read `src/seed.json`, or did it copy the books? Is the count calculated or written as a number?
- Did it install anything besides `express` and its types? Is every package in `package.json` needed? (No `cors`, no `body-parser`, no `nodemon`.)
- Is every response sent with `response.json(...)`, with the right status code? Is the `404` handler placed **after** all routes?
- Is there an `any` or a `// @ts-ignore` in the diff?
- Is the port written in one place only? Does `src/index.ts` do nothing but start the server?
- Is there a `.env` file, a key or a password anywhere? (There should not be.)
- Does every route do what the table says, and **nothing more**? Is there a route you did not ask for?
- Does the server log the address when it starts? Does a failing request leak a stack trace in the response? It should not.

### Bonus

- **Filter by status:** `GET /api/books?status=done` returns only the books with this status. An unknown status returns `400` with `{ "error": "<message>" }`. Check it with `npm run check -- --bonus`. The part after `?` is the _query string_: find it in the dev tools.
- **Explain it:** ask the agent to explain `src/app.ts` line by line. Mark every statement that you could not have explained before you asked, and check one of them in the Express documentation.
- **What happens on `POST /api/books`?** Run `curl -i -X POST http://localhost:3001/api/books`. What does your server answer, and why? What would a useful answer be? You will build this in the next session.

## Development

Install the dependencies with `npm i` first (Node.js 22.22 or newer is required).

- `npm run dev` starts the server on http://localhost:3001 and restarts it when you change a file
- `npm run start` starts the server once
- `npm run check` calls the running server and reports pass or fail for every route (`-- --bonus` adds the bonus routes)
- `npm run typecheck` checks the types
