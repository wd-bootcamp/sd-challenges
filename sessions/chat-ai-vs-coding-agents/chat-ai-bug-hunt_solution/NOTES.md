# Notes: Chat AI Bug Hunt

## The Fixes

**Bug Report 1 (stats):** `src/lib/stats.ts` counted every book that is not `"to-read"` as read, so `"reading"` books were included.

```ts
// before
const finishedBooks = books.filter((book) => book.status !== "to-read");
// after
const finishedBooks = books.filter((book) => book.status === "read");
```

The existing tests passed because their test data had no book with status `"reading"`. The regression test adds one.

**Bug Report 2 (search):** `src/lib/filterBooks.ts` compared the query and the title/author with `includes`, which is case-sensitive.

```ts
const searchTerm = query.trim().toLowerCase();
// ...
const matchesQuery =
  book.title.toLowerCase().includes(searchTerm) ||
  book.author.toLowerCase().includes(searchTerm);
```

## What to Look For in the Students' Logs

- **Context hunting:** students had to find the right files themselves. The bug is not where the symptom is (`ReadingStats.tsx`, `SearchBar.tsx`) but one level deeper in `src/lib`.
- **Confident guesses:** chat AIs often suggest a fix for the file they were shown, even if the cause is somewhere else. A typical example: lowercasing the input value in `SearchBar.tsx`.
- **Style mismatches:** suggested tests often use `it`, explicit imports from `vitest` or a different file layout, because the chat AI doesn't know the project's conventions.
- **Verification is the student's job:** the chat AI never ran a test. Every claim like "this fixes it" was unverified until the student ran `npm test`.

These observations are the input for the afternoon: a coding agent reads the files and runs the tests itself. The question then becomes how to review what it did.
