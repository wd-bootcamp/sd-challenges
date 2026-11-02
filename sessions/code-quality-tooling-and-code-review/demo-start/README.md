# Code Quality Tooling and Code Review: Demo Start

A small order service: `calc` calculates the total of an order, `coupon.ts` creates and checks coupon codes. It works and has tests, but the code is hard to read. We will let SonarQube Cloud find out why, and clean it up.

`npm run lint` fails on purpose. Look at the messages before the demo.

## Put the project on GitHub

The folder you downloaded has to be the **root** of your repository (the `.github` folder has to be at the top level, `ls -a` shows it).

1. Run `git init -b main` in the project folder.
2. Create a new **public** repository on GitHub. Do not add a README, `.gitignore` or license.
3. Connect and push:
   ```sh
   git add .
   git commit -m "Initial commit"
   git remote add origin <url-of-your-repository>
   git push -u origin main
   ```

## Development

Install the dependencies with `npm i` first (Node.js 22.22 or newer is required).

- `npm run test` runs the tests in the watch mode, `npm run test:run` runs them once
- `npm run coverage` runs the tests and writes a coverage report to `coverage` (`coverage/lcov.info` is the file SonarQube Cloud reads)
- `npm run check` checks the types
- `npm run lint` runs ESLint, including rules from `eslint-plugin-sonarjs` that are similar to SonarQube rules
- `npm run format` formats the code with Prettier, `npm run format:check` only checks it
