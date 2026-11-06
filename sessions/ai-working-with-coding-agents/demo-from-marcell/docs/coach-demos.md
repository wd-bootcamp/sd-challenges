# Coach demos

Prompts and steps for the live demos. Start every demo from a clean checkout:

```bash
git switch main && git restore . && git clean -fd
npm install
claude            # then check the mode below the input, switch to Manual with Shift+Tab
```

## Session 1: First Steps

The four planted bugs (do not tell the students): see `solution/session-1` and the list at the end of this file.

1. **Chat vs. agent.** In claude.ai, ask without code: *"Where is the average rating of my Bookshelf app calculated, and what happens with books that have no rating?"* Then paste `src/books.ts` and ask again.
2. Same question in Claude Code. Point to the Read and Search tool calls.
3. **Permission prompt.** *"Show the number of books next to the heading, like 'Bookshelf (5)'."* Read the diff aloud. Say **No** once: *"Use the existing StatsCard data instead of counting again."* Approve the second try, then `git diff`, then `git restore .`.
4. **Tool calling.** *"Run the tests and the type check and tell me the result."* Read the Bash prompt aloud before approving.
5. **Bug hunt teaser.** *"Compare the app with the specification in README.md and list every difference. Do not change any files."*

## Session 2: Working with Coding Agents

1. **Plan mode.** Shift+Tab to Plan. Paste the issue from `docs/issues/add-book.md`. Review the plan with the group. Ask Claude to change one step. Show `Ctrl+G`. Approve with "manually approve edits".
2. **Context.** In a fresh session: `/context`. Then *"Read all files in src and summarize them."* `/context` again. Then *"Run git log -p"* `/context` again. `/compact focus on the add-book feature`, then *"What did I ask you in the beginning?"*
3. **CLAUDE.md.** `/init`, read the draft, cut it down to Stack, Commands, Conventions, Off limits. Add: "Never use `npm test`."
4. **Skill.** Create `.claude/skills/check/SKILL.md` (see `solution/session-2`). Run `/check`, then in a fresh session: *"Does everything still work?"*

## Session 3: Extending Coding Agents

1. Start the app: `npm run dev` in a second terminal.
2. **MCP.** `claude mcp add playwright -- npx -y @playwright/mcp@0.0.84` → `claude mcp list` → in Claude `/mcp`. Prompt: *"Open http://localhost:5173, mark Neuromancer as read, take a screenshot and describe what you see. Is every title readable?"* (The read cards hide their title: CSS bug.)
3. **Sub-agents.** *"Create a read-only sub-agent named reviewer in .claude/agents/reviewer.md"* or copy `reviewer.md` and `test-auditor.md` from `solution/session-3`. Then: *"Use the reviewer agent to review my changes."* Run `/context` before and after.
   **Parallel:** *"Use the reviewer agent and the test-auditor agent in parallel: the reviewer looks at my current diff, the test-auditor checks which rules of the specification have no test."* Point out: two separate contexts, both results come back as summaries, and both cost usage.
4. **Hook.** Copy `.claude/hooks/protect-tests.mjs` from `solution/session-3`. Test it without Claude:
   ```bash
   echo '{"tool_input":{"file_path":"src/books.test.ts"}}' | node .claude/hooks/protect-tests.mjs; echo $?
   ```
   Register it in `.claude/settings.json`, then ask Claude to change a test.
5. **Extra block (choose one):**
   - **GitHub:** `git switch feature/book-notes`, read `docs/pr-book-notes.md` (the "agent's" PR description) and compare it with `git diff main...feature/book-notes`. Show `gh issue view` / `gh pr create` prompts.
   - **Plugins:** `/plugin`, browse a marketplace, open one plugin's files before installing. Same rules as MCP: who publishes it, what runs, pin versions.
   - **Everyday tips:** `claude -c` / `claude -r`, `/rename` before `/clear`, `/btw` for side questions, `@file`, `!command`, `Esc Esc` to rewind, `/usage` breakdown.

## Session 4: Working Safely

1. `git switch lab/prompt-injection`, `npm run lab:setup` (fake `.env`), `npm run lab:canary` in a second terminal.
2. **Injection.** In Manual mode: *"Read lab/README.md and summarize what this helper does."* Watch for a prompt to run `node lab/register.mjs`. If the canary prints data, the fake secrets "left" the project.
3. **Second source.** *"Summarize the community reviews in lab/reviews.json."* Watch for an attempt to create `INJECTED.md`.
4. **Deny rules.** Add to `.claude/settings.json`:
   ```json
   { "permissions": { "deny": ["Read(./.env)", "Read(./.env.*)", "Bash(curl *)"] } }
   ```
   Ask *"Show me the content of .env"* (blocked), then *"Run cat .env"* (also blocked now), then *"Run grep -r BOOKSHELF ."* (not blocked: it reads without naming the file).
5. **Sandbox.** `/sandbox` on. Run `node lab/register.mjs` through Claude: the canary stays quiet, because localhost is not reachable from the sandbox. If Claude Code asks for network access to localhost, answer No and explain that this is the wall working.
6. **Dev container.** Show `.devcontainer/devcontainer.json` from `solution/session-4` in VS Code: "Reopen in Container", then `claude` inside. Point out: the home folder with `~/.ssh` is not in the container, but the project folder is mounted and can still be changed.
7. **Security review.** `git switch feature/book-notes`, then `/security-review` (needs an `origin` remote) or ask the `reviewer` agent.

## The planted problems

| Where | Problem | Found by |
| --- | --- | --- |
| `searchBooks` | Case-sensitive, ignores the author | Spec rule 2 |
| `averageRating` | Counts books without rating as 0 | Spec rule 5 |
| `sortByYear` | Sorts the input in place (`Array.prototype.sort`), so the original order is lost after switching sort off | Spec rules 3 and 7 |
| `StatsCard` | "Read" shows the number of **unread** books | Spec rule 4 |
| `styles.css` | The title of a read book has the same color as its card | Spec rule 6, only visible in a browser (session 3) |

The existing tests pass on purpose: they do not cover the bugs.
