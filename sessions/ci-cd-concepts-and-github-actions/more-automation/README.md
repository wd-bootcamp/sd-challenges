# More Automation

(difficulty: 🔥🔥🔥)

The workflow of this project works, but it is slow and does everything in one job. Make it better.

## Put the project on GitHub

GitHub Actions only runs for a project that lives in a GitHub repository, and the folder you downloaded has to be the **root** of that repository (the `.github` folder has to be at the top level).

1. Run `git init -b main` in the project folder.
2. Create a new **public** repository on GitHub (branch protection for free accounts only works in public repositories). Do not add a README, `.gitignore` or license.
3. Connect and push:
   ```sh
   git add .
   git commit -m "Initial commit"
   git remote add origin <url-of-your-repository>
   git push -u origin main
   ```
4. Open the **Actions** tab of your repository.

> 💡 The `.github` folder is hidden on macOS and Linux. Use `ls -a` in the terminal or enable hidden files in your editor.

## Tasks

Change `.github/workflows/ci.yml` step by step. Push after every step and look at the result in the Actions tab.

1. **Separate jobs:** Split the job into three jobs: `check` (types), `test` and `build`. Every job needs the code, Node.js and the dependencies. What do you see in the Actions tab? Which jobs run at the same time?
2. **Dependencies between jobs:** `build` should only start when `check` and `test` have succeeded (`needs`). Break a test and look at what happens to `build`.
3. **Matrix:** Run the `test` job with Node.js 22 **and** 24 (`strategy.matrix`). How many jobs does the Actions tab show now? Give the jobs a `name` that contains the Node.js version.
4. **Cancel old runs:** Add `concurrency` so a new push to a branch cancels the run that is still running for the same branch. Push twice in a row to see it.
5. **Skip runs that do not need to run:** A change that only touches Markdown files does not need a pipeline. Add `paths-ignore` for `**.md` to both `push` and `pull_request`.
6. **Least privilege:** The workflow only reads the code. Set `permissions` to `contents: read`.
7. **Manual runs:** Add `workflow_dispatch` and start the workflow from the Actions tab with the button **Run workflow**.
8. **Artifacts:** `npm run coverage` creates a `coverage` folder. In the `test` job, run the tests with coverage and upload the folder as an artifact, but only for Node.js 22 (artifact names have to be unique within a run). In the `build` job, upload `dist`. Download an artifact from the run page.

> 💡 Required status checks and `paths-ignore` do not work well together: if a required workflow is skipped, the check stays "pending" and the pull request cannot be merged. Keep this in mind if you protect your branch.

## Development

Install the dependencies with `npm i` first (Node.js 22.22 or newer is required). These are the scripts the pipeline uses, you can run all of them locally:

- `npm run test` runs the tests in the watch mode, `npm run test:run` runs them once
- `npm run check` checks the types (`tsc --noEmit`)
- `npm run build` compiles the project to `dist`
- `npm run coverage` runs the tests with a coverage report
