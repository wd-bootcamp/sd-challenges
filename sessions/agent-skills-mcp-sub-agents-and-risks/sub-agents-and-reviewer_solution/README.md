# Agent Skills, MCP Servers, Sub-Agents & Risks: Sub-Agents and a Reviewer

A sub-agent is a second Claude instance with its own, empty context window. It works on one focused task and sends only a summary back to your main conversation. This keeps your main context small, lets several searches run in parallel and lets you give an agent a special role, for example "reviewer who can't change anything".

## Tasks

Start Claude Code in Manual mode: `claude --permission-mode default`.

### Part 1: Parallel Research

1. Run `/context` and note how much of the context window is used.
2. Ask Claude to answer three questions about the codebase **in parallel with Explore sub-agents**, one sub-agent per question:
   - Where is the state owned, and how does it flow to the components?
   - What is covered by tests, and what isn't?
   - Which components have form fields or buttons without an accessible label?
3. Ask Claude to combine the three answers into one short summary.
4. Run `/context` again. Compare: did the main context grow by the size of all the files the sub-agents read, or only by their summaries?
5. Check one claim from each summary yourself by opening the file. Sub-agents can be wrong too.

> 💡 Name the sub-agent type in your prompt ("Use three Explore sub-agents ..."). Explore agents can only read and search, so they're safe for research.

### Part 2: Build a Code Reviewer Agent

Create the file `.claude/agents/code-reviewer.md`. The agent should:

- review the changes on the current branch compared to `main`
- check correctness, tests, types, accessibility and the conventions from `CLAUDE.md`
- report every finding as: severity (high / medium / low), file and line, problem, suggested fix
- **not be able to change files.** Use the `tools` field to allow only reading tools.

Then use it:

1. Create a branch: `git switch -c feature/rating-input`.
2. Make a small change with Claude, e.g. "Add a rating select (1 to 5 stars) to each book card for books with status read." Review the diff as usual and commit.
3. Ask: `Use the code-reviewer agent to review the changes on this branch compared to main.`
4. Triage the findings in a file `REVIEW-TRIAGE.md`: for each finding, write "agree" or "disagree" and one sentence why. Fix the findings you agree with.

> 💡 The reviewer needs to see the diff. With only `Read, Grep, Glob` it can't run `git diff`. Think about how to solve this: give it `Bash` too, or let the main agent pass the diff to it? Write down what you chose and why.

## Notes

- You can ask Claude to draft the agent file, but read it carefully: an agent file is a system prompt plus a list of permissions.
- Sub-agents start without your conversation history. Everything they need must be in the task description or in the files they read.
- Sub-agents cost usage too. Three parallel agents use more tokens than one search in the main conversation. Use them when the research is big or when you need an independent view.

## Development

To work locally, please install the dependencies using `npm i` first.

Run `npm run dev` to start a development server and open the displayed URL in a browser.

Run `npm test` to run the tests and `npm run check` to let TypeScript check all types.

### Scripts

You can use the following commands:

- `npm run dev` to start a development server
- `npm test` to run the tests with Vitest
- `npm run check` to type-check the project
