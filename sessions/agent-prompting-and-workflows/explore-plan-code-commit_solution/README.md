# Prompting within an Agent & Agent Workflows: Explore, Plan, Code, Commit

In this challenge you build a small feature with a coding agent and follow the full workflow: **Explore → Plan → Implement → Verify → Commit**. The feature is simple on purpose. The workflow is what you practice.

## The Feature

Users want to sort their bookshelf. Add a "Sort by" select next to the search bar with these options:

| Option               | Order                                                                      |
| -------------------- | -------------------------------------------------------------------------- |
| Recently added       | The current order (new books at the top). This is the default.             |
| Title (A–Z)          | Alphabetically by title                                                    |
| Author (A–Z)         | Alphabetically by the author field as it is written (first name first)     |
| Rating (best first)  | Highest rating first. Books with the same rating keep their order. Books without a rating come last. |

Acceptance criteria:

- Sorting works together with the existing search and status filter.
- The sorting logic lives in a pure function `sortBooks` in `src/lib/sortBooks.ts`. It must not change the array it receives.
- `sortBooks` has unit tests for every option, including unrated books and ties.
- `npm test -- --run` and `npm run check` pass.

## Tasks

Keep `WORKLOG.md` open and fill it in as you go. Work in **Manual mode** (`claude --permission-mode default`) and use **Plan mode** where the steps say so.

### 0. Prepare

- Install the dependencies with `npm i` and run the app with `npm run dev`.
- Create a feature branch: `git switch -c feature/sort-books`. You can ask the agent to do it, or do it yourself.
- Optional: run `/init` to create a `CLAUDE.md` for the project, as you did in the last session.

### 1. Explore

- Switch to Plan mode (`Shift+Tab`).
- Ask the agent to explore how search and filtering work in this app. Tell it **not** to plan or change anything yet.
- Read its answer. Note the files that matter in the worklog.

### 2. Plan

- Still in Plan mode, describe the feature. You can paste the table and acceptance criteria from above.
- Ask the agent to ask you questions if something is unclear.
- Read the plan carefully. **Push back at least once**: maybe it wants to sort inside `filterBooks`, forgets the "Recently added" option, uses `.sort()` on the original array or skips tests. Note it in the worklog.

### 3. Implement

- Accept the plan and switch back to Manual mode.
- Before you approve each diff, write one sentence about what it does in the worklog. If you can't describe it, don't approve it yet: ask the agent to explain.
- Also read the commands the agent wants to run before allowing them.

### 4. Verify

- Make sure the agent runs the tests and the type check, and **read the output yourself**. "Looks good" is not evidence.
- Try all four options in the browser, combined with a search term and a status filter.
- Read the tests in `src/lib/sortBooks.test.ts`: do they really cover unrated books and ties?

### 5. Commit

- Ask the agent to commit. Read the commit message before you accept it: does it describe the change?
- Note the commit hash in the worklog (`git log --oneline`).

## Notes

- If the agent goes in the wrong direction, press `Esc` and redirect it. If it still doesn't work after two corrections, `/clear` and start over with a better prompt.
- Keep the conversation focused on this one feature. Start a new conversation (`/clear`) for anything else.

## Development

To work locally, please install the dependencies using `npm i` first.

Run `npm run dev` to start a development server and open the displayed URL in a browser.

Run `npm test` to run the tests with Vitest. Use `npm test -- --run` to run them once without watch mode.

Run `npm run check` to let TypeScript check all types without running the code.

### Scripts

You can use the following commands:

- `npm run dev` to start a development server
- `npm test` to run the tests
- `npm run check` to type-check the project
