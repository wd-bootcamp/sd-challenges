# Coding Agent First Steps: Controls Rally

A scavenger hunt through the controls of Claude Code. Each station has a small task and a question. Write your answers into a file `ANSWERS.md`.

You work with the Bookshelf app. You don't need to fix anything in it.

## Tasks

Install the dependencies with `npm i` and start Claude Code:

```bash
claude --permission-mode default
```

### Station 1: Model

Run `/model`.

- Which model is active?
- Which other models does your plan offer?

### Station 2: Context

Ask Claude to explain what the app does. Then run `/context`.

- How many tokens are used?
- Which category uses the most?

### Station 3: Shell Mode

Run the tests with `!npm test -- --run`.

- How many tests pass?
- Ask Claude: `How many tests ran in the last output?` Why can Claude answer this without running the tests again?

### Station 4: File Mentions

Type `@src/` and use the autocomplete to pick a file.

- Which file did you pick, and what did you ask about it?

### Station 5: Interrupt

Ask Claude to `Write a detailed explanation of every file in src/ into a file EXPLANATION.md.` While Claude is working, press `Esc`.

- What happens? Is the task finished?
- Tell Claude to only explain `src/App.tsx` instead. Does it continue from where it was?

### Station 6: Rewind

Ask Claude to add a comment at the top of `src/App.tsx` and allow the edit. Then run `/rewind` (or press `Esc` twice on an empty input).

- Which options does the rewind menu offer?
- Restore the code to the point before the comment. Check `src/App.tsx`: is the comment gone?
- Ask Claude to create a file with a shell command instead: `Run echo "hello" > hello.txt`. Can `/rewind` undo this too? Why not?

### Station 7: Plan Mode vs. Manual Mode

Press `Shift+Tab` until you are in plan mode. Ask Claude to `Add a footer with the text "Happy reading" to the app.`

- What does Claude do in plan mode?
- Approve the plan and pick the option that keeps asking you before each edit. What is different now?

### Station 8: Find a Command

Run `/help` or type `/` and browse the menu.

- Find the command that shows how much of your plan's usage limit is left. What is it called?
- Find one command that is not mentioned in the handout. What does it do?

### Station 9: Continue Later

Quit with `/exit`. Start Claude Code again with `claude -c`.

- What do you see?
- What is the difference between `claude -c` and `claude -r`?

## Notes

- Clean up at the end: `git status` shows which files changed during the rally. Undo changes to tracked files with `git restore <file>` and delete the new files you don't need anymore.

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
