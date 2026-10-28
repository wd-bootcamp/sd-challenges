# Agent Skills, MCP Servers, Sub-Agents & Risks: Hooks

Instructions in `CLAUDE.md` or a skill are followed most of the time. "Most of the time" is not enough for some rules, e.g. "never commit while tests are failing". A **hook** is a command that Claude Code itself runs at a fixed moment, for example before or after every tool call. The model can't skip it.

In this bonus challenge, you write two hooks for the Bookshelf app.

## Tasks

### 1. Log Every Edit

Write a `PostToolUse` hook that runs after every `Write` or `Edit` tool call and appends a line to `claude-edits.log`:

```
2026-10-30T14:03:12.123Z Edit src/components/BookCard.tsx
```

- Configure the hook in `.claude/settings.json` (matcher `Write|Edit`).
- Write the hook as a small Node script in `.claude/hooks/log-edit.js`.
- Claude Code passes information about the tool call as **JSON on stdin**, e.g. `tool_name` and `tool_input.file_path`. Your script reads stdin, parses the JSON and appends the line.
- Use the environment variable `CLAUDE_PROJECT_DIR` to find the project folder.

Test it: restart Claude Code, ask for a small change, then check `claude-edits.log`.

### 2. Block Commits on Failing Tests

Write a `PreToolUse` hook (matcher `Bash`) in `.claude/hooks/guard-commit.js`:

- If the command doesn't contain `git commit`, exit with code `0` (allow).
- If it does, run `npm test -- --run`. If the tests fail, write a short reason to **stderr** and exit with code `2`. Exit code `2` blocks the tool call, and Claude sees your message.

Test it:

- Break a test on purpose and ask Claude to commit. The commit must be blocked, and Claude should tell you why.
- Fix the test and ask again. The commit should go through.

### 3. Test Your Scripts Without Claude

You can test a hook script by piping JSON into it yourself:

```bash
echo '{"tool_name":"Bash","tool_input":{"command":"git commit -m \"test\""}}' | node .claude/hooks/guard-commit.js
echo $?
```

## Notes

- Run `/hooks` in Claude Code to see which hooks are active.
- Any other exit code than `0` and `2` does **not** block. A crashing script lets the tool call through.
- Hooks run with your user's permissions, without asking. Only use hooks you have read and understood, never copy one from a random website.
- `claude-edits.log` is in `.gitignore`.

## Development

To work locally, please install the dependencies using `npm i` first.

Run `npm run dev` to start a development server and open the displayed URL in a browser.

Run `npm test` to run the tests and `npm run check` to let TypeScript check all types.

### Scripts

You can use the following commands:

- `npm run dev` to start a development server
- `npm test` to run the tests with Vitest
- `npm run check` to type-check the project
