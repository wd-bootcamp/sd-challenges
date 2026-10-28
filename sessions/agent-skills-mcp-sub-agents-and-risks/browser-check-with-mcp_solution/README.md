# Agent Skills, MCP Servers, Sub-Agents & Risks: Browser Check with MCP

Claude Code can read your code and run your tests, but on its own it can't see your app in a browser. Some bugs only show up there. An MCP server adds new tools to Claude Code. The Playwright MCP server gives it a real browser: it can open pages, click, type, resize the window and take screenshots.

In this challenge, you let Claude Code test the Bookshelf app like a user would.

## Tasks

### 1. Add the Playwright MCP Server

Add the server for this project, so your teammates get it too:

```bash
claude mcp add --scope project playwright -- npx @playwright/mcp@latest
```

- Open the new `.mcp.json` file. What does it contain? What will happen on a teammate's computer when they start Claude Code in this project?
- Start Claude Code in Manual mode: `claude --permission-mode default`. Claude Code asks whether you trust the servers from `.mcp.json`. Approve it, you just added it yourself.
- Run `/mcp`. The `playwright` server should be listed as connected.
- Run `/context`. How much of the context window do the MCP tools use?

### 2. Explore the App in the Browser

Start the dev server in a **second terminal**: `npm run dev`.

Then ask Claude Code to test the app. Describe what a tester would do, not how to click. For example:

```
Open http://localhost:3000 with the Playwright tools and test the app like a user:
add a book, search for a book, filter by status and change the status of a book.
Do this at a desktop size and at a phone size of 375 x 667 pixels.
Take a screenshot of each size and report every problem you find,
including layout problems. Don't change any code yet.
```

- Watch the tool calls. Every browser action asks for your permission in Manual mode. Read what Claude wants to do before you approve.
- Look at the screenshots yourself. Do you agree with Claude's report? Did it miss anything?

### 3. Fix What You Found

Pick the most important problem from the report and fix it with the workflow from the last session: Plan mode first, read the plan, review the diff.

Then ask Claude to check the fix in the browser again at both sizes.

### 4. Commit

Commit the fix and the `.mcp.json` file on a branch.

## Notes

- If the browser doesn't open, check `/mcp` for errors. On the first run, the Playwright server may ask to install a browser: let it, or run `npx playwright install chromium` yourself.
- Approve "always allow" only for tools you understand. Navigating to `localhost` is harmless. Navigating to any website the agent finds is not, because the page content goes straight into the agent's context (see "Prompt Injection" in the handout).
- Stop the dev server with `Ctrl+C` when you are done.

## Development

To work locally, please install the dependencies using `npm i` first.

Run `npm run dev` to start a development server and open the displayed URL in a browser.

Run `npm test` to run the tests and `npm run check` to let TypeScript check all types.

### Scripts

You can use the following commands:

- `npm run dev` to start a development server
- `npm test` to run the tests with Vitest
- `npm run check` to type-check the project
