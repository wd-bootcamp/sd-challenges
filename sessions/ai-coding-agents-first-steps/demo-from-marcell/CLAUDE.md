# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

Requires Node >= 22.12.54

```bash
npm run dev        # Vite dev server on http://localhost:5173
npm run test:run   # run all tests once
npm run check      # type check only (tsc --noEmit)
npm run build      # tsc --noEmit && vite build
npx vitest run src/books.test.ts            # a single test file
npx vitest run src/books.test.ts -t "name"  # a single test by name
```

- Do not use `npm test`: it starts Vitest in watch mode and never exits.
- There is no linter.
- `lab:setup` / `lab:canary` in package.json reference a `lab/` directory that does not exist on `main` (it lives on the `lab/prompt-injection` branch).

## Architecture

Small React 19 + Vite + TypeScript app (a book shelf). State lives in one place and logic is kept out of components.

- `src/books.ts` — pure logic (search, sort by year, toggle read, statistics). Functions must never mutate their input; they return new arrays.
- `src/storage.ts` — localStorage persistence. `loadBooks` validates stored data with an `isBook` guard and falls back to `initialBooks` (`src/data/books.ts`); `saveBooks` swallows storage errors. Both take an injectable `Storage` for tests.
- `src/App.tsx` — owns all state (`books`, `query`, `sorted`). The visible list is derived as search, then optional sort by year. Books are saved to storage in a `useEffect`.
- `src/components/<Name>/index.tsx` — presentational components, each with a colocated `<Name>.test.tsx`.
- Tests: Vitest with globals, jsdom and Testing Library (`src/setupTests.ts`).

## The README is the spec

The "What the app should do" section of `README.md` is authoritative; behavior that differs from it is a bug. Easy-to-miss rules:

- Search matches title or author, case-insensitive.
- The average rating counts only books that have a rating, shows "–" when none do, and is rounded to one decimal.
- Read books get a dark card, but the title must stay readable on every card.

## Branches and docs

`main` is the start state for the Week 9 coding-agent sessions and intentionally contains planted bugs. Solution branches (`solution/session-1..4`) and the other branches are listed in `README.md`; coach notes and demo prompts are in `docs/coach-demos.md`.
