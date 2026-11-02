# Code Quality Tooling and Code Review: Demo End

The cleaned-up order service with everything wired up for SonarQube Cloud:

- `calc` became `calculateTotal`: meaningful names, small functions, constants instead of magic numbers, no duplicated branches.
- `coupon.ts` became `coupons.ts` and uses `crypto.randomInt`, which is safe for codes that have a meaning.
- `.github/workflows/ci.yml` checks formatting, types, tests and lint.
- `.github/workflows/sonar.yml` runs the tests with coverage and sends the result to SonarQube Cloud, for every push to `main` and every pull request.
- `sonar-project.properties` tells the scanner where the sources, the tests and the coverage report are.

## Connect the repository to SonarQube Cloud

SonarQube Cloud (formerly SonarCloud) is free for public repositories.

1. Open [sonarcloud.io](https://sonarcloud.io) and log in with your GitHub account.
2. Create an organization for your GitHub account (the free plan is enough) and import your repository.
3. When SonarQube Cloud asks for the **analysis method**, choose **With GitHub Actions** (CI-based analysis). If automatic analysis is switched on for the project, switch it off under `Administration` → `Analysis Method`. Automatic analysis cannot import test coverage.
4. Create a token in SonarQube Cloud (`My Account` → `Security`) and save it in your GitHub repository as a secret named `SONAR_TOKEN` (`Settings` → `Secrets and variables` → `Actions`).
5. Put the **organization key** and the **project key** of your project into `sonar-project.properties`.

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
