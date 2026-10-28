# Agent Skills, MCP Servers, Sub-Agents & Risks: Write a Skill

You keep typing the same instructions into Claude Code: "run the type check and the tests and tell me what fails", "create a new component with a test, the way we always do it". A skill saves such a workflow in a file, so you can start it with one slash command.

In this challenge, you write two skills for the Bookshelf app: `/check` and `/new-component`.

## Tasks

Start Claude Code in Manual mode inside the project folder:

```bash
claude --permission-mode default
```

### 1. The `/check` Skill

Create the file `.claude/skills/check/SKILL.md`. The skill should:

- run `npm run check` and `npm test -- --run`
- give a short summary: did both pass? If not, which files and tests fail and why
- **never** edit any files, only report

Only you should be able to start this skill, Claude should not run it on its own. Find the frontmatter field for that in the handout.

Test it:

- Run `/check`. Both commands should pass.
- Break something on purpose, e.g. change an expected value in `src/lib/stats.test.ts`. Run `/check` again. Does the summary point you to the right test? Did Claude stay away from fixing it?
- Undo your change.

> 💡 You can write the skill yourself or ask Claude to draft it. If Claude drafts it, read every line before you save it. A skill is a prompt that runs again and again.

### 2. The `/new-component` Skill

Create `.claude/skills/new-component/SKILL.md`. The skill should take the component name as an argument (`/new-component EmptyShelf`) and:

- create `src/components/<Name>.tsx` and `src/components/<Name>.test.tsx`
- follow the conventions from `CLAUDE.md`: a typed props alias `<Name>Props`, a default export
- write at least one test that checks that the component renders
- run the type check and the tests at the end and report the result

Use `$ARGUMENTS` for the name. Write a clear `description`: it tells Claude when this skill is useful.

Test it:

- Run `/new-component EmptyShelf` and ask for a component that shows a friendly message when no book matches the search. Review the diff before you approve it.
- Use the new component in `BookList.tsx` instead of the `<p className="empty">` element.
- Run `/check`.

### 3. Does the Description Work?

Start a fresh conversation with `/clear`. **Don't** type the slash command this time. Ask in plain language, e.g.:

```
I need a new component that shows the number of books per status as small badges.
```

- Does Claude pick up your `new-component` skill on its own? You can see it in the transcript when a skill is loaded.
- If not, improve the `description` and try again.
- Discuss with your partner: why is it good that `/check` can't start itself, but `/new-component` can?

### 4. Commit

Commit the two skills. Skills in `.claude/skills/` belong to the project, so your whole team gets them with `git pull`.

## Notes

- Type `/` in Claude Code: your skills show up in the list next to the built-in commands.
- If a skill doesn't show up, check the folder structure: `.claude/skills/<name>/SKILL.md`. The file name must be `SKILL.md`.
- Keep skills short. A skill that needs more than one screen is usually two skills.

## Development

To work locally, please install the dependencies using `npm i` first.

Run `npm run dev` to start a development server and open the displayed URL in a browser.

Run `npm test` to run the tests and `npm run check` to let TypeScript check all types.

### Scripts

You can use the following commands:

- `npm run dev` to start a development server
- `npm test` to run the tests with Vitest
- `npm run check` to type-check the project
