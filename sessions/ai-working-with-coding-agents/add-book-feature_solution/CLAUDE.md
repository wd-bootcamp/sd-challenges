# Bookshelf

A small React app to manage a list of books: search, filter by genre, mark as read, add and remove.

## Stack

- React 19 with TypeScript, built with Vite
- Tests: Vitest and React Testing Library. Helpers are imported from `vitest` (no globals).

## Commands

- `npm run test:run` runs the tests once. **Never use `npm test`**, it starts the watch mode and never finishes.
- `npm run check` checks the types
- `npm run build` builds the app
- `npm run dev` starts the dev server. It does not finish, so do not run it yourself.

## Conventions

- Components live in `src/components/<Name>/index.tsx` with a default export. The props have a type `<Name>Props`. The test is `<Name>.test.tsx` in the same folder.
- Logic without UI lives in `src/books.ts` and is tested in `src/books.test.ts`. Functions return new arrays and never change their input.
- Tests describe behavior and query by role, label or text, not by class name.
- Run `npm run check` and `npm run test:run` before you say that a task is done.

## Off limits

- Do not add dependencies without asking.
- Do not edit `src/data.ts`.
- Never change a test to make it pass. If a requirement changed, say so first.
