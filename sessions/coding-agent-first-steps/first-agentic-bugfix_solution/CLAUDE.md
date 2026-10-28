# Bookshelf

A reading list app: add books, change their reading status, search and filter, see reading stats.

## Stack

- React 19 with TypeScript, built with Vite
- Tests: Vitest + React Testing Library (`globals: true`, jsdom)
- No backend: state lives in `App.tsx`, initial data in `src/data/initialBooks.ts`

## Commands

- Dev server: `npm run dev` (port 3000)
- Tests: `npm test -- --run` (without `--run`, Vitest stays in watch mode and never finishes)
- Type check: `npm run check`
- Run tests and type check after every change.

## Conventions

- Components: `src/components/<Name>.tsx`, test next to it in `<Name>.test.tsx`
- Props: a type alias `<Name>Props` per component, no `React.FC`
- Shared types live in `src/types.ts`
- Logic without JSX lives in `src/lib/` and gets a unit test
- Tests: query by role or text (`getByRole`, `getByText`), use `userEvent`

## Off limits

- Don't add new dependencies without asking
- Don't edit `src/data/initialBooks.ts`
