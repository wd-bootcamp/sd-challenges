# Notes: Onboard the Agent

The `CLAUDE.md` in this folder is one good result. Yours can look different. What matters is that it is short and contains things the agent can't guess.

## What `/init` Usually Gets Right

- The stack (React, TypeScript, Vite, Vitest), because it is in `package.json`.
- The scripts, because they are in `package.json`.
- A rough description of the folder structure.

## What `/init` Usually Misses or Gets Wrong

- **Team rules**: "Don't add dependencies without asking" or "Don't edit `initialBooks.ts`" can't be found in the code. Only you know them.
- **How the agent should run commands**: `npm test` starts Vitest in watch mode. `npm test -- --run` runs the tests once and exits, which is what an agent needs.
- **Conventions that are only visible in a few files**, for example the `<Name>Props` naming or that tests sit next to the component.
- **Too much text**: `/init` sometimes describes every file. Delete lines the agent can find out by reading the code in a second. A long `CLAUDE.md` costs tokens in every session.

## Testing the Onboarding

After `/clear`, good answers look like this:

- "How do I check the types?" → `npm run check`.
- "Add a component `RatingStars`" → files `src/components/RatingStars.tsx` and `src/components/RatingStars.test.tsx`, props typed as `RatingStarsProps`.
- "Add date-fns" → Claude asks first or refuses with a reference to the rule, instead of running `npm install` right away.

If Claude ignores a rule, make the rule clearer and more specific. "Don't add new dependencies without asking" works better than "Be careful with dependencies".

## Controls

- `@src/lib/stats.ts` puts the file into the conversation. Claude doesn't need to search for it.
- `!npm test -- --run` runs the tests without a model turn. All 10 tests pass. The bugs in this app are not covered by tests (see the next challenge).
- `/context` shows the token usage split into categories, for example the system prompt, tools, memory files (`CLAUDE.md`) and the messages so far. A short `CLAUDE.md` needs only a few hundred tokens.

## Commit

Claude proposes something like:

```bash
git add CLAUDE.md && git commit -m "Add CLAUDE.md with project commands and conventions"
```

Check that only `CLAUDE.md` is added, not other files.
