# Notes: Write a Skill

This folder shows one good result. Your skills will look different, and that's fine. What matters is that they do what they promise, every time.

## The Skills

- [`.claude/skills/check/SKILL.md`](.claude/skills/check/SKILL.md)
- [`.claude/skills/new-component/SKILL.md`](.claude/skills/new-component/SKILL.md)

### Why `/check` uses `disable-model-invocation: true`

`/check` should only run when you ask for it. If Claude could start it on its own, it would run the full test suite after every small step, which is slow and uses up your usage limit. The field also hides the skill's description from Claude, so it costs no context.

### Why `/check` says "do not edit"

Without that sentence, a helpful agent sees a failing test and starts to "fix" it, sometimes by changing the test instead of the code. A reporting skill must only report. Test this on purpose: break a test and check that Claude stays away from it.

### Why `/new-component` has a detailed description

The description is the only part of a skill that Claude sees before the skill is used. "Create a new React component with a test file ... Use this whenever a new component is needed in src/components." contains the words a teammate would use when asking for a component. A vague description like "component helper" is rarely picked up.

## Example Run

```
> /new-component EmptyShelf shows a friendly message when no book matches the search
```

What a good run looks like:

1. Claude reads `CLAUDE.md` and `BookCard.tsx` first (step 1 of the skill).
2. It proposes `src/components/EmptyShelf.tsx` with `type EmptyShelfProps = { query: string }`.
3. It proposes `EmptyShelf.test.tsx` with two render tests.
4. It runs `npm run check` and `npm test -- --run` and reports: all green.
5. It suggests using the component in `BookList.tsx`, but doesn't do it on its own (step 4 of the skill).

Then we asked in plain language: "Use EmptyShelf in BookList instead of the paragraph." The result is in [`src/components/BookList.tsx`](src/components/BookList.tsx) and [`src/App.tsx`](src/App.tsx) (`query` is passed down as a prop).

## Auto-Invocation Test

After `/clear`, the prompt "I need a new component that shows the number of books per status as small badges." should make Claude load the `new-component` skill. The transcript shows that the skill was used before Claude starts creating files.

If it doesn't happen:

- Check the description: does it mention when to use the skill?
- Check the folder name and the file name `SKILL.md`.
- Run `/skills` to see which skills Claude Code found.

## Things to Push Back On

- The agent uses a different test style than the rest of the project (e.g. `it` vs. `test`, or a new testing library). Point it to an existing test.
- The agent adds the component to `App.tsx` and changes other files although the skill says not to.
- The generated test only checks `toBeTruthy()` on the container. Ask for a test that checks visible text or roles.
