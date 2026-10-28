# Coding Agent First Steps: Onboard the Agent

Bookshelf is a small reading list app: add books, move them from "to read" to "reading" to "read", search and filter, and see some reading stats.

A new teammate needs an onboarding before they can work on a project: How do I start it? How do I run the tests? Which rules does the team follow? A coding agent needs the same, and it gets it from a file called `CLAUDE.md`. In this challenge, you write one for the Bookshelf app.

## Tasks

Install the dependencies with `npm i` and start Claude Code in Manual mode in the project folder:

```bash
claude --permission-mode default
```

### 1. Let Claude Draft the File

- Run `git status`. If there are uncommitted files, commit them now. Then you can always go back to this state.
- Run `/init`. Claude reads the project and proposes a `CLAUDE.md`. Allow it to write the file.
- Open `CLAUDE.md` in your editor and read it. Mark everything that is wrong, too vague or missing.

### 2. Improve the File

Edit `CLAUDE.md` yourself or tell Claude what to change. In the end, it should contain:

- **Stack**: what the project is built with (keep it to a few lines).
- **Commands**: how to start the dev server, run the tests (`npm test`) and check the types (`npm run check`).
- **Conventions**:
  - Components live in `src/components/<Name>.tsx` with a test file `<Name>.test.tsx` next to them.
  - Props are typed with a type alias called `<Name>Props`.
  - Logic without JSX lives in `src/lib/`.
- **Off limits**:
  - Don't add new dependencies without asking.
  - Don't edit `src/data/initialBooks.ts`.

Keep the file short. Every line is loaded into every session and costs tokens.

### 3. Test the Onboarding

- Run `/clear` to start a fresh conversation. The `CLAUDE.md` is loaded again automatically.
- Ask questions that only someone who knows the project can answer, for example:
  - `How do I check the types in this project?`
  - `I want to add a new component called RatingStars. Where do the files go and how do I type its props?`
  - `Can you add the library date-fns for me?`
- Do the answers follow your `CLAUDE.md`? If not, improve the file and try again.

### 4. Use the Controls

- Ask about a specific file with an `@` mention: `@src/lib/stats.ts What does this function return?`
- Run the tests yourself with the `!` prefix: `!npm test -- --run`. The output lands in the conversation. Ask Claude to summarize it.
- Run `/context`. How much of the context window is already used? Find the line for your memory files (`CLAUDE.md`).

### 5. Commit

- Ask Claude to commit the `CLAUDE.md` with a clear commit message. Read the proposed `git` command before you allow it.

## Notes

- `/init` is a good start, but it can only describe what it finds in the code. It doesn't know your team's rules. That part is your job.
- Don't fix any bugs in this challenge. The next challenge is about that.

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
