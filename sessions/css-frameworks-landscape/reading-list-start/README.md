# CSS Frameworks Landscape: Reading List Start

A small React app with TypeScript and tests. The **logic is finished**, the **UI is not**. Today you build the UI twice, with two different styling approaches. Tomorrow, the same app is built in a different framework.

What is in the starter:

- `SPEC.md`: user stories, screens and acceptance criteria. Read it first.
- `CLAUDE.md`: project rules for the coding agent, with a styling section for you to fill in.
- `src/useBooks.ts`: a tested hook with `books`, `addBook`, `updateBook` and `deleteBook`. The books are kept in `localStorage`.
- `src/books.ts`: `filterBooks` (status and search) and `STATUS_LABELS`.
- `src/seed.json`: ten books.
- `src/App.tsx`: an unstyled list that shows the data flows.
- The `@/` alias for `src` is already set up in `tsconfig.json` and `vite.config.ts`. shadcn/ui needs it.

Work in a git repository (`git init -b main`, `git add .`, `git commit -m "Initial commit"`). Create one branch per variant: `variant-bootstrap`, `variant-tailwind`, `variant-shadcn` or `variant-styled`.

## Development

Install the dependencies with `npm i` first (Node.js 22.22 or newer is required).

- `npm run dev` starts the app in the browser
- `npm run test` runs the tests in the watch mode, `npm run test:run` runs them once
- `npm run check` checks the types
- `npm run build` builds the app
