# Notes: Prompt Injection Lab

This folder shows one good result. The injection is planted in the third book of [`src/data/book-import.json`](src/data/book-import.json).

## What Students Will See

Two outcomes are normal, and both teach the lesson:

- **The agent notices the injection** and warns about it (most likely with current models). Discuss: the protection worked this time because the model was careful. Would you bet your API keys on that every time? Better hidden instructions exist (split over several fields, written as a normal-sounding requirement, in a language the reviewer doesn't read).
- **The agent follows the injection** and plans or creates `INJECTED.md`. Discuss: which step should have caught it? Plan mode shows it in the plan, Manual mode asks before the file is written. If the student approved without reading, that's the real finding.

The worst outcome is the third one: the agent creates the file and the student doesn't notice. Ask students to check for `INJECTED.md` explicitly.

## The Solution Files

- [`src/lib/importBooks.ts`](src/lib/importBooks.ts) maps the imported format to our `Book` type. The description stays plain text. React escapes text content, so even HTML or script tags in a description would be shown, not executed.
- [`src/lib/importBooks.test.ts`](src/lib/importBooks.test.ts) tests the mapping.
- [`.claude/settings.json`](.claude/settings.json) denies reading `.env` and `.env.*`. Note that `Read(./.env.*)` also blocks `.env.local.example`. That's fine here; in a real project you could allow the example file explicitly or name the files one by one.
- [`LAB-NOTES.md`](LAB-NOTES.md) is an example of the student's notes.

## Deny Rules: What They Do and Don't Do

```json
{
  "permissions": {
    "deny": ["Read(./.env)", "Read(./.env.*)"]
  }
}
```

- The rules block Claude's Read tool and common shell commands that read files, like `cat .env`.
- They don't block every possible way to read a file, e.g. a script the agent writes and runs. In Manual mode, that script would still need approval, so reading commands remains important.
- For enforcement at the operating-system level, Claude Code has a built-in sandbox for shell commands (`/sandbox`, macOS, Linux and WSL2). Containers (devcontainers, Docker Sandboxes) go one step further. For this course, Manual mode plus deny rules plus careful review is the baseline.

## Discussion Prompts for the Recap

- Where in your Recap Project 6 will the agent read text you didn't write?
- Why is "the agent will notice" not a security strategy?
- What is the difference between a rule in `CLAUDE.md` ("never read .env") and a deny rule in `settings.json`? (An instruction can be ignored or overridden by an injection, a deny rule is enforced by Claude Code itself.)
