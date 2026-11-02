# More Automation: Solution

The solution of the More Automation challenge: `.github/workflows/ci.yml` with three jobs.

- `check` and `test` have no `needs`, so they run **in parallel**. `build` has `needs: [check, test]` and only starts when both succeeded.
- `workflow_dispatch` adds the **Run workflow** button.
- The `test` job uploads the coverage report, the `build` job uploads `dist`. Artifact names (`coverage`, `dist`) have to be unique within a run.

Every job installs the dependencies on its own, because jobs run on different machines. The npm cache makes that fast.

## Development

Install the dependencies with `npm i` first (Node.js 22.22 or newer is required). These are the scripts the pipeline uses, you can run all of them locally:

- `npm run test` runs the tests in the watch mode, `npm run test:run` runs them once
- `npm run check` checks the types (`tsc --noEmit`)
- `npm run build` compiles the project to `dist`
- `npm run coverage` runs the tests with a coverage report
