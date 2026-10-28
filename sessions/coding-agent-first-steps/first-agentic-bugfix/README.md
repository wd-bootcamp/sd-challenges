# Coding Agent First Steps: Your First Agentic Bugfix

Users of the Bookshelf app sent two bug reports. They are the same ones as in the "Chat AI Bug Hunt" challenge from the morning session:

### Bug Report 1: "My stats are wrong"

> I have finished two books, but the stats at the top say "4 of 6 books read (67%)" and "1486 pages read". I'm still in the middle of two other books. That's not what I have read!

### Bug Report 2: "Search doesn't find my book"

> I typed `hobbit` into the search field and the list was empty. When I typed `Hobbit` it worked. The same happens with author names: `weir` finds nothing.

Your job is to fix both bugs with Claude Code. You don't write the code yourself, but you stay in control: you approve the plan, you read every change and you decide when it's done.

## Tasks

Install the dependencies with `npm i`. Start the app with `npm run dev` and reproduce both bugs in the browser.

Then start Claude Code in Manual mode:

```bash
claude --permission-mode default
```

> 💡 If you solved the "Onboard the Agent" challenge, copy your `CLAUDE.md` into this project first. Otherwise, run `/init`.

`ghcd -i` already created a first commit. Run `git status` and commit anything you added (for example your `CLAUDE.md`) before Claude starts. Then `git diff` shows exactly what the agent changed.

### 1. Investigate in Plan Mode

- Press `Shift+Tab` until the mode shows **plan mode**. In this mode, Claude can read and search, but it can't change any files.
- Paste both bug reports and ask Claude to find the cause of each bug and to propose a fix.
- Read the plan carefully. Does it name the files and lines where the bugs are? Does it explain _why_ the code is wrong?

### 2. Push Back

Find at least one thing in the plan that you want to change before you approve it. Some ideas:

- The plan doesn't mention tests. Ask for a regression test per bug that fails before the fix.
- The plan changes more than needed. Ask for the smallest possible change.
- The plan doesn't say how the fix will be verified. Ask Claude to run the tests and the type check at the end.

Write down what you changed in the plan.

### 3. Implement Step by Step

- Approve the plan. Make sure you end up in Manual mode, so Claude asks before each edit (press `Shift+Tab` if needed).
- For every edit Claude proposes, read the diff and write **one sentence** about what it changes into a file `NOTES.md`. Only approve after you have written the sentence.
- When Claude adds a regression test, it should fail first. Ask Claude to run it before the fix and show you the failing output.
- At the end, ask Claude to run all tests and the type check.

### 4. Verify Yourself

- Run `npm run dev` and check both bug reports in the browser again.
- Run `git diff` (or `!git diff` inside Claude Code). Can you explain every changed line?

### 5. Commit

Ask Claude in plain language to commit the changes with a clear commit message. Read the commit message: does it describe what was fixed?

## Reflection

Answer these questions at the end of your `NOTES.md`:

- How long did it take until both bugs were fixed?
- In which moment did you have to step in? What would have happened if you hadn't?
- If you did the "Chat AI Bug Hunt" this morning: how often did you copy code into the chat back then, and how often today? What did the agent know that the chat AI didn't?

## Development

To work locally, please install the dependencies using `npm i` first.

Run `npm run dev` to start a development server and open the displayed URL in a browser.

Run `npm test` to run the tests with Vitest.

Run `npm run check` to let TypeScript check all types without running the code.

### Scripts

You can use the following commands:

- `npm run dev` to start a development server
- `npm test` to run the tests
- `npm run check` to type-check the project
