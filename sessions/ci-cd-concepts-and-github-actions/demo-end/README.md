# CI/CD Concepts and GitHub Actions: Demo End

The `text-utils` library with its workflow in `.github/workflows/ci.yml`.

What the workflow does:

- It runs on every push to `main`, on every pull request and on demand (`workflow_dispatch`).
- It only has read access to the repository (`permissions`).
- A new run for the same branch cancels the one that is still running (`concurrency`).
- The job runs twice, once with Node.js 22 and once with Node.js 24 (`matrix`).
- Every run installs the dependencies with `npm ci` (with a dependency cache), checks the types, runs the tests, builds the project and uploads `dist` as an artifact.

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

## Development

Install the dependencies with `npm i` first (Node.js 22.22 or newer is required). These are the scripts the pipeline uses, you can run all of them locally:

- `npm run test` runs the tests in the watch mode, `npm run test:run` runs them once
- `npm run check` checks the types (`tsc --noEmit`)
- `npm run build` compiles the project to `dist`
- `npm run coverage` runs the tests with a coverage report
