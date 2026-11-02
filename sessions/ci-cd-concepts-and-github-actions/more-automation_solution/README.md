# More Automation: Solution

The solution of the More Automation challenge: `.github/workflows/ci.yml` with three jobs.

- `check` and `test` have no `needs`, so they run **in parallel**. `build` has `needs: [check, test]` and only starts when both succeeded.
- `test` runs with a matrix (`node-version: [22, 24]`), which creates one job per entry. The job `name` contains the version, so the jobs are easy to tell apart.
- `concurrency` with `cancel-in-progress: true` cancels the older run of the same branch.
- `paths-ignore: ["**.md"]` skips the workflow for pull requests and pushes that only change Markdown files.
- `permissions: contents: read` gives the token the least access it needs.
- `workflow_dispatch` adds the **Run workflow** button.
- The coverage report is uploaded only for Node.js 22: artifact names must be unique within a run, and two matrix jobs would try to upload the same name.

Every job installs the dependencies on its own, because jobs run on different machines. The npm cache makes that fast.

## Development

Install the dependencies with `npm i` first (Node.js 22.22 or newer is required). These are the scripts the pipeline uses, you can run all of them locally:

- `npm run test` runs the tests in the watch mode, `npm run test:run` runs them once
- `npm run check` checks the types (`tsc --noEmit`)
- `npm run build` compiles the project to `dist`
- `npm run coverage` runs the tests with a coverage report
