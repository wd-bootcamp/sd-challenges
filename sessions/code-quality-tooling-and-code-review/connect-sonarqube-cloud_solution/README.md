# Connect SonarQube Cloud: Solution

The solution of the Connect SonarQube Cloud challenge: `sonar-project.properties` and `.github/workflows/sonar.yml`.

Things to look at:

- `sonar.sources=src` together with `sonar.exclusions=src/**/*.test.ts` keeps the tests out of the analyzed sources. `sonar.tests` and `sonar.test.inclusions` tell SonarQube Cloud which files are tests. Otherwise the tests count in duplications and code smells.
- `sonar.javascript.lcov.reportPaths=coverage/lcov.info` points to the report that `npm run coverage` writes. Without it, coverage is 0 %.
- `sonar.coverage.exclusions=src/types.ts` leaves `src/types.ts` out of the coverage. The file only contains types and has nothing to execute.
- The workflow has to create `coverage/lcov.info` **before** the scan step (`npm ci`, then `npm run coverage`). The folder `coverage` is in `.gitignore`, so the report is never in the repository.
- If coverage is 0 % or missing, check in this order: Was `lcov.info` created in the workflow run? Does the path in `sonar-project.properties` match? Is automatic analysis switched off?
- `fetch-depth: 0` loads the full git history. SonarQube Cloud uses it to find out which lines are new.
- The workflow only needs the secret `SONAR_TOKEN`. The organization and project key live in `sonar-project.properties`.
- The quality gate is a separate status check that SonarQube Cloud reports to the pull request. The workflow run itself is green when the scan ran, even if the quality gate failed.

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
