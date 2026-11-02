# Extending Coding Agents: Demo Start

Bookshelf is the small React app with TypeScript and tests that you know from the first two sessions. It has no known bugs, and there is no `CLAUDE.md`, no MCP server, no sub-agent and no hook yet.

In the demo, we use it to connect an MCP server, to create a sub-agent and to write a hook.

Work in a git repository (`git init -b main`, `git add .`, `git commit -m "Initial commit"`), so you can always see what the agent changed with `git diff`.

## Development

Install the dependencies with `npm i` first (Node.js 22.22 or newer is required).

- `npm run dev` starts the app at http://localhost:3000
- `npm run test` runs the tests in the watch mode, `npm run test:run` runs them once
- `npm run check` checks the types
- `npm run build` builds the app
