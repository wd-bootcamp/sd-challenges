# Prompting within an Agent & Agent Workflows: From Bug Report to Fix

Real bugs often arrive as an issue written by someone else. In this challenge you hand such an issue to the agent and make sure the bug is fixed **with a failing test first**, so it can't come back unnoticed.

## Tasks

The bug report is in `ISSUE.md`.

### 1. Reproduce it yourself

- Install the dependencies with `npm i`, start the app with `npm run dev` and follow the steps in the issue.
- Create a branch for the fix: `git switch -c fix/empty-book-titles`.

### 2. Failing test first

Start Claude Code in Manual mode (`claude --permission-mode default`) and give it the issue with `@ISSUE.md`.

- Ask for a test that reproduces the bug **before** anything is fixed. A component test for `BookForm` (with a mocked `onAddBook`) works well.
- Let the agent run the tests. The new test must fail, and it must fail **for the right reason** (the book was added / the spaces were kept), not because of a typo in the test.

### 3. Fix

- Ask the agent to fix the bug without changing the new test.
- Review the diff: does the fix handle both the title and the author? Is the error message exactly the one from the issue?
- Run all tests and the type check. Try the steps from the issue again in the browser.

### 4. Commit

- Ask the agent to commit with a message that references the issue, for example `Fix #12: trim book title and author`.
- Read the message before you accept it.

## Notes

- If the agent fixes the bug right away without writing a test, stop it with `Esc` and redirect it. The test is the point of this challenge.
- Bonus: ask the agent to check if other inputs in the app have the same problem.

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
