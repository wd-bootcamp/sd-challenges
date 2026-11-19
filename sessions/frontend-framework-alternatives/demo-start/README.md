# Frontend Framework Alternatives: Demo Start

The finished Reading List card and filter in four frameworks, one project per folder. It is the reference for the coach demo: the same app, the same logic, four spellings.

| Folder    | Framework                                   | Created with                                                                                                         |
| --------- | ------------------------------------------- | -------------------------------------------------------------------------------------------------------------------- |
| `react`   | React 19 with Vite                          | `npm create vite@latest react -- --template react-ts`                                                                |
| `vue`     | Vue 3 with `<script setup>`                 | `npm create vue@latest vue -- --ts --vitest`, then `npm i -D vitest@^5.1.0`                                          |
| `svelte`  | Svelte 5 with Vite (runes)                  | `npm create vite@latest svelte -- --template svelte-ts`                                                              |
| `angular` | Angular 22 (standalone components, signals) | `npx @angular/cli@latest new angular --defaults --skip-git --ssr=false --style=css --routing=false --ai-config=none` |

Every project has the same app (see `../reading-list-alternative-start/SPEC.md` for the full Reading List): a book card with title, author, status badge, rating and a "Mark as done" button, a search field, a status filter and a count. The logic is in `src/core` (a copy of `core` of the starter): `types.ts`, `books.ts`, `storage.ts` and `seed.json`. It is the same in every project and is not changed.

## Run a project

Node.js 22.22.3 or newer is required (Angular 22).

```bash
cd react   # or vue, svelte, angular
npm i
npm run dev   # Angular: npm start
npm run build
```

## Notes

- There are no component tests in these projects. The test setups of the frameworks differ and are part of the exercise.
- The Vue scaffold lists `vitest@^4`, which made `npm install` fail on npm 10.9.9 on 2026-11-11. This project already uses `vitest@^5.1.0`.
- The data is kept in `localStorage`. Clear the site data in the browser if you see old books.
