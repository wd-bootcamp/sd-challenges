# Bookshelf

## Stack

- React 19 with TypeScript, built with Vite
- Tests: Vitest and React Testing Library

## Commands

- `npm run test:run` runs the tests once. **Never use `npm test`**, it starts the watch mode and never finishes.
- `npm run check` checks the types.
- `npm run build` builds the app.

## Conventions

- Components live in `src/components/<Name>/index.tsx`, with a `<Name>Props` type and a test `<Name>.test.tsx` next to it.
- Logic without UI lives in `src/books.ts` (or `src/storage.ts` for `localStorage`). Functions return new arrays and never change their input.
- The specification is in `README.md`, section "What the app should do".

## Off limits

- Do not add dependencies without asking.
- Never change a test to make it pass. If a test looks wrong, explain why and ask.
