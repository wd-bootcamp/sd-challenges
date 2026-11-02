# Fix the Red Build: Solution

The solution of the Fix the Red Build challenge. The pipeline fails at three different steps, one after another:

1. **Install dependencies (`npm ci`):** `package.json` lists `@types/node`, but `package-lock.json` does not. `npm ci` refuses to install when the two files disagree. Fix: run `npm i` and commit the updated `package-lock.json`.
2. **Check types (`npm run check`):** `readingTime` is declared to return a `number`, but it returns a string like `"3 min"`. The tests are green anyway, because Vitest does not check types. Fix: the return type is `string`.
3. **Run tests (`npm run test:run`):** `truncate` returns `maxLength + 1` characters, because the slice is not shortened to make room for the ellipsis. Fix: `text.slice(0, maxLength - 1) + "…"`.

Every one of them can be found locally with `npm ci`, `npm run check` and `npm run test:run`, in the same order as in the workflow.

## Development

Install the dependencies with `npm i` first (Node.js 22.22 or newer is required). These are the scripts the pipeline uses, you can run all of them locally:

- `npm run test` runs the tests in the watch mode, `npm run test:run` runs them once
- `npm run check` checks the types (`tsc --noEmit`)
- `npm run build` compiles the project to `dist`
- `npm run coverage` runs the tests with a coverage report
