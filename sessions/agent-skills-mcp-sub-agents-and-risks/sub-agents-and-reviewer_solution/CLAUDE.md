# Bookshelf

A small reading list app: add books, search and filter them, track the reading status and see reading stats.

## Stack

- React 19 with TypeScript, Vite
- Vitest and Testing Library for tests
- Plain CSS in `src/styles.css`

## Commands

- Install: `npm i`
- Dev server: `npm run dev` (port 3000)
- Tests: `npm test -- --run`
- Type check: `npm run check`

## Conventions

- Components live in `src/components/<Name>.tsx`, their tests next to them in `<Name>.test.tsx`.
- Props are typed with a type alias called `<Name>Props`.
- Pure logic lives in `src/lib/` and has unit tests.
- Shared types live in `src/types.ts`.
- State lives in `App.tsx` and is passed down as props.

## Off limits

- Do not add dependencies without asking.
- Do not commit to `main`. Create a branch first.
