# Bookshelf

A small React app to keep track of the books you read. It is the demo project for the four Week 9 sessions about coding agents.

## Getting started

Requires Node.js 22.12 or newer and git.

```bash
npm install
npm run dev        # start the app on http://localhost:5173
npm run test:run   # run the tests once
npm run check      # type check
```

> `npm test` starts Vitest in watch mode and never finishes. Use `npm run test:run`.

## What the app should do

This is the specification. If the app does something else, it is a bug.

1. The page shows all books of the shelf as cards: title, author, year, rating and a button to mark the book as read or unread.
2. **Search** filters the books by **title or author**. The search ignores upper and lower case: `dune` finds "Dune", `tolkien` finds "The Hobbit".
3. **Sort by year** shows the books from oldest to newest. Switching it off shows the books in their original order again.
4. The **statistics** show the number of books, the number of books that are **read**, and the **average rating**.
5. The average rating only counts books **that have a rating**. Books without a rating are ignored. If no book has a rating, it shows "–". It is rounded to one decimal.
6. Read books have a dark card. The title must be readable on every card.
7. Functions in `src/books.ts` never change their input. They return new arrays.

## Project structure

```
src/
  books.ts              logic without UI (search, sort, statistics)
  books.test.ts         tests for the logic
  data/books.ts         the sample books
  components/<Name>/    one folder per component: index.tsx and <Name>.test.tsx
  App.tsx               the page
```

## Branches

| Branch | What it contains |
| --- | --- |
| `main` | Start state for all sessions (with the planted bugs) |
| `solution/session-1` | The bugs fixed, with tests |
| `solution/session-2` | + `CLAUDE.md`, skills `/check` and `/new-component`, feature "add a book and keep my books" |
| `solution/session-3` | + Playwright MCP in `.mcp.json`, `reviewer` sub-agent, hooks, the CSS fix |
| `solution/session-4` | + security baseline: deny rules, sandbox, `docs/agent-security.md` |
| `lab/prompt-injection` | Session 4 lab: fake secrets, hidden instructions, a local canary server |
| `feature/book-notes` | A pull request "written by an agent" for reviews (session 3 and 4) |

Coach notes and demo prompts: [`docs/coach-demos.md`](docs/coach-demos.md).
