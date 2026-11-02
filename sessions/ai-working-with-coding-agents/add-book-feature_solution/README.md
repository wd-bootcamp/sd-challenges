# Add a Book: Solution

A reference solution of the challenges "Onboard the Agent", "Plan Before You Code" and "Write a Skill".

Your files and your code will look different, because an agent does not produce the same output twice. What should be the same:

- **`CLAUDE.md`:** short, with stack, commands (and the warning about `npm test`), conventions and things the agent must not do. No description of what Claude finds out by reading the code.
- **The feature:** all acceptance criteria are covered by tests (the validation in `src/books.test.ts`, the storage in `src/storage.test.ts`, the form in `AddBookForm.test.tsx` and the whole flow in `src/App.test.tsx`).
- **Skills:** `.claude/skills/check/SKILL.md` and `.claude/skills/new-component/SKILL.md`, each with a clear `description` and steps with a defined "done".

## Things to look at

- **The plan:** a good plan names the files, splits the logic (`validateNewBook`, `addBook`, `loadBooks`, `saveBooks`) from the UI and mentions the **edge cases**: duplicates ignoring case, broken data in `localStorage`, and the fact that existing App tests now share `localStorage`. The last one is easy to miss. The solution clears `localStorage` after each test in `src/setupTests.ts`.
- **The id of a new book:** `crypto.randomUUID()` is called in `App`, and `addBook` receives the id as a parameter. That keeps `addBook` easy to test.
- **Validation lives in `src/books.ts`:** the form only shows the error. That is why the rules can be tested without rendering anything.
- **Skills:** `check` is harmless, so Claude may start it on its own. A skill that commits, deploys or deletes should have `disable-model-invocation: true`, so only you can start it.

## Development

Install the dependencies with `npm i` first (Node.js 22.22 or newer is required).

- `npm run dev` starts the app in the browser
- `npm run test` runs the tests in the watch mode, `npm run test:run` runs them once
- `npm run check` checks the types
- `npm run build` builds the app
