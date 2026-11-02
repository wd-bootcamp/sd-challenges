# Working with Coding Agents: Demo Start

Bookshelf is a small React app with TypeScript and tests, the same app you know from the first session. It has no known bugs and all tests pass. There is no `CLAUDE.md` and no skill yet.

In the demo, we use it to plan a feature in Plan mode, to look at the context, to create a `CLAUDE.md` with `/init` and to write a first skill.

Work in a git repository (`git init -b main`, `git add .`, `git commit -m "Initial commit"`), so you can always see what the agent changed with `git diff`.

## Development

Install the dependencies with `npm i` first (Node.js 22.22 or newer is required).

- `npm run dev` starts the app in the browser
- `npm run test` runs the tests in the watch mode, `npm run test:run` runs them once
- `npm run check` checks the types
- `npm run build` builds the app
