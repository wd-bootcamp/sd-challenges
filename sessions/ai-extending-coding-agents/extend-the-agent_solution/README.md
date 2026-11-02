# Extend the Agent: Solution

A reference solution of the four challenges.

Your files will look different, because an agent does not produce the same output twice. What should be the same is below.

## Challenge 1: Browser Check with MCP

- `.mcp.json` shows how a project shares an MCP server with its team. The version of the package is **pinned** (`@playwright/mcp@0.0.84`, and `-y` lets `npx` install it without asking), so everybody runs the same code. Claude Code asks for approval before it uses a server from `.mcp.json`.
- **The problem** was a CSS rule that gave the title of a read book the same color as the card (`.book.read h3 { color: #f3f5f9; }`). The title was there, but nobody could see it. A unit test does not render CSS, so only a look at the page finds it. The fix gives a read book a line-through instead.
- Things to notice: the MCP server adds tools (and descriptions) to the context. Every server you connect costs space, so connect only what you need.

## Challenge 2: A Reviewer Sub-Agent

- `.claude/agents/reviewer.md`: a sub-agent that can read, search and run `git` commands, and is told to never edit files. The `description` says **what** it does and **when** to use it.
- The reviewer works in its own context. Your main conversation only receives the result, so reading many files does not fill it.
- A reviewer that does not see your conversation judges the code on its own. That is an advantage (it does not share your blind spots) and a limit (it does not know what you wanted unless the code or `CLAUDE.md` says it).
- The `tools` line limits what the agent can do, but `Bash` is still a broad tool. The instruction "use no other shell commands" is a request, not a lock.

## Challenge 3: Hooks

- `.claude/settings.json` registers two hooks. A **PreToolUse** hook runs **before** a tool call and can block it, a **PostToolUse** hook runs **after** it.
- `.claude/hooks/protect-tests.mjs` blocks edits of **existing** test files (exit code `2`, the message on stderr goes to Claude) and allows new test files.
- `.claude/hooks/check-types.mjs` runs `npm run check` after an edit of a TypeScript file and sends the errors back to Claude.
- Test a script without Claude:

  ```bash
  echo '{"tool_input":{"file_path":"src/books.test.ts"}}' | node .claude/hooks/protect-tests.mjs; echo $?
  ```

- A hook is **enforced** by Claude Code. An instruction in `CLAUDE.md` is a request.
- Hooks run on your computer **with your permissions**, without asking again. Read the hooks of a repository before you trust it.
- A type check after every single edit can be noisy: during a multi-file change the code is allowed to be broken for a moment.

## Challenge 4: From Issue to Pull Request

- `favoriteGenre` in `src/books.ts` with tests in `src/books.test.ts`, shown in `Stats`.
- A good pull request: a small diff, tests, a description that matches the diff, and a link to the issue. Check what the agent wrote against what the code really does.

## Development

Install the dependencies with `npm i` first (Node.js 22.22 or newer is required).

- `npm run dev` starts the app at http://localhost:3000
- `npm run test` runs the tests in the watch mode, `npm run test:run` runs them once
- `npm run check` checks the types
- `npm run build` builds the app
