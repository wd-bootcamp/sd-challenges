# Write a Workflow: Solution

The solution of the Write a Workflow challenge: `.github/workflows/ci.yml`.

Things to look at:

- `on.push.branches: [main]` and `on.pull_request` make the workflow run for pushes to `main` and for every pull request. Without the branch filter, every push to every branch would run the workflow twice when a pull request is open.
- `cache: npm` in `actions/setup-node` stores the downloaded npm packages (not `node_modules`) and uses the hash of `package-lock.json` as the key. The first run fills the cache, the following runs restore it.
- `npm ci` installs exactly what `package-lock.json` says and fails if `package.json` and the lock file do not match.
- Every step has a `name`, so the log is readable.

To add the badge, put this line at the top of your README (replace `<user>` and `<repository>`):

```md
![CI](https://github.com/<user>/<repository>/actions/workflows/ci.yml/badge.svg)
```

## Development

Install the dependencies with `npm i` first (Node.js 22.22 or newer is required). These are the scripts the pipeline uses, you can run all of them locally:

- `npm run test` runs the tests in the watch mode, `npm run test:run` runs them once
- `npm run check` checks the types (`tsc --noEmit`)
- `npm run build` compiles the project to `dist`
- `npm run coverage` runs the tests with a coverage report
