# Frontend

React 19, TypeScript strict, Vite, Tailwind CSS v4 and shadcn/ui (Base UI, style `base-nova`, see `components.json`). Talks to the backend through `/api`: the Vite dev server proxies it to port 3001.

## Commands

- `npm run dev`: dev server on http://localhost:5173 (I run this, not you)
- `npm run check`: type check
- `npm run test:run`: unit tests, once
- `npm run build`: type check and production build

## Structure

`src/api.ts` is the only file that calls `fetch`. `src/useBooks.ts` loads the list. Components are in `src/components`, one per file. `src/components/ui` is shadcn/ui code: add components with `npx shadcn@latest add <name>`, do not restyle them by hand without a reason.

## Conventions

- Function components and hooks, no class components, no `any`.
- Use the shadcn/ui components before you write your own markup for buttons, dialogs, inputs and cards.
- Every request can fail: show loading, error and empty states.
- Show a success toast only after the API call succeeded.
- The shape of the data is in `../docs/api-contract.md`. Do not change `src/types.ts` without changing the contract.
- Every interactive element works with the keyboard.

## Off limits

- No API URLs in components, use `src/api.ts`.
- No `localStorage` for the books: the database is the source of truth.
