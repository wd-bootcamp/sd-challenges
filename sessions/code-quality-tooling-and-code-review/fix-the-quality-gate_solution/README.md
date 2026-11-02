# Fix the Quality Gate: Solution

The solution of the Fix the Quality Gate challenge: `src/loyalty.ts` and `src/loyalty.test.ts`.

What was wrong with the new code, and how it is fixed:

1. **Hard-coded credentials** (`LOYALTY_PASSWORD = "admin123"`): a password in the source code ends up in git history and on GitHub. It is read from `process.env.LOYALTY_PASSWORD` now. Rotate a password that was ever committed.
2. **Identical branches** in `calculatePoints`: `vip` and `member` returned the same value, so vip customers got too few points. A lookup table `POINTS_PER_EURO` makes the rule readable and gives every customer type its own value.
3. **`Math.random()`** for the redeem code: it is predictable. `crypto.randomBytes` is meant for values that have to be hard to guess.
4. **No tests:** new code without tests has 0 % coverage, which fails the condition "coverage on new code". The tests check every customer type, the code format and the header.

SonarQube Cloud reports the findings on the pull request. `npm run lint` reports some of them locally, but not all of them, and not with the same rules.

## Connect the repository to SonarQube Cloud

SonarQube Cloud (formerly SonarCloud) is free for public repositories.

1. Open [sonarcloud.io](https://sonarcloud.io) and log in with your GitHub account.
2. Create an organization for your GitHub account (the free plan is enough) and import your repository.
3. When SonarQube Cloud asks for the **analysis method**, choose **With GitHub Actions** (CI-based analysis). If automatic analysis is switched on for the project, switch it off under `Administration` → `Analysis Method`. Automatic analysis cannot import test coverage.
4. Create a token in SonarQube Cloud (`My Account` → `Security`) and save it in your GitHub repository as a secret named `SONAR_TOKEN` (`Settings` → `Secrets and variables` → `Actions`).
5. Put the **organization key** and the **project key** of your project into `sonar-project.properties`.

## Development

Install the dependencies with `npm i` first (Node.js 22.22 or newer is required).

- `npm run test` runs the tests in the watch mode, `npm run test:run` runs them once
- `npm run coverage` runs the tests and writes a coverage report to `coverage` (`coverage/lcov.info` is the file SonarQube Cloud reads)
- `npm run check` checks the types
- `npm run lint` runs ESLint, including rules from `eslint-plugin-sonarjs` that are similar to SonarQube rules
- `npm run format` formats the code with Prettier, `npm run format:check` only checks it
