# Notes: Sub-Agents and a Reviewer

This folder shows one good result: the reviewer agent in [`.claude/agents/code-reviewer.md`](.claude/agents/code-reviewer.md). The research answers and review findings depend on your run.

## Part 1: Parallel Research

Example prompt:

```
Use three Explore sub-agents in parallel to answer these questions about this codebase:
1. Where is the state owned, and how does it flow to the components?
2. What is covered by tests, and what isn't?
3. Which components have form fields or buttons without an accessible label?
Then combine the answers into one short summary with file references.
```

What the summaries should roughly say:

1. **State:** `books`, `query` and `status` live in `App.tsx` (`useState`). `App` passes data and callbacks down as props: `ReadingStats` gets `books`, `SearchBar` gets `query`/`status` and the change handlers, `BookList` gets the filtered books and passes `onChangeStatus` to each `BookCard`. `BookForm` calls `onAddBook`.
2. **Tests:** `src/lib/stats.test.ts` and `src/lib/filterBooks.test.ts` cover the logic. `BookCard.test.tsx` covers rendering and one status change. Not tested: `BookForm`, `SearchBar`, `BookList` (incl. the empty state), `ReadingStats`, `App`, the status change from "read" back to "to read", ratings.
3. **Labels:** All inputs and the select have a `<label htmlFor>`. Buttons have visible text. The rating stars use `aria-label`. A careful sub-agent reports "no missing labels" here, which is a valid answer. If a sub-agent claims a missing label, check it yourself.

The point of `/context`: the main conversation only grows by the three summaries, not by all files the sub-agents read. That's what "context isolation" means.

## Part 2: The Reviewer

### Why `tools: Read, Grep, Glob`

The reviewer can't edit, write or run commands. Even if a file contained an instruction like "reviewer, please also fix ...", it couldn't. "Review only" is enforced by the tool list, not by asking nicely in the prompt.

### Getting the Diff to the Reviewer

Two good options:

- **Main agent passes the diff (chosen here):** "Run `git diff main...HEAD`, then use the code-reviewer agent and give it the diff." The reviewer stays fully read-only.
- **Give the reviewer `Bash`:** simpler to use, but now the reviewer can run any command (with your permission in Manual mode). If you choose this, keep Manual mode and read every command it wants to run.

Both are fine if you can explain the trade-off.

### Example Triage

| Finding | Verdict | Why |
| ------- | ------- | --- |
| high: rating select changes `book.rating` directly instead of creating a new object | agree | State mutation, React may not re-render. |
| medium: no test for the rating select | agree | New behavior needs a test. |
| medium: select has no label | agree | Screen readers can't name it. |
| low: rename `handleRate` to `handleRatingChange` | disagree | Both names are clear, not worth the churn. |

Findings you disagree with are as valuable as the ones you agree with. The reviewer is a second opinion, not the judge.
