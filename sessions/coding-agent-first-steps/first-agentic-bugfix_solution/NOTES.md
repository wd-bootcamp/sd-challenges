# Notes: Your First Agentic Bugfix

This is one good run. Your prompts, the plan and the exact code can look different. What matters is that both bugs are fixed, each fix has a regression test, and you can explain every changed line.

## The Bugs

| Report | Cause | Fix |
| --- | --- | --- |
| 4 of 6 books read, but only 2 finished | `getReadingStats` in `src/lib/stats.ts` counts every book that is _not_ "to-read" as finished, so "reading" books count too | Filter for `book.status === "read"` |
| "hobbit" finds nothing | `filterBooks` in `src/lib/filterBooks.ts` compares with `includes`, which is case-sensitive | Convert the search term and the title/author to lower case before comparing |

Neither bug was covered by a test: the test data in `stats.test.ts` has no "reading" book, and `filterBooks.test.ts` only searches with the exact spelling.

## Example Prompts

Plan mode, first prompt:

```
Two users reported bugs in this app:

Report 1: The stats say I've read 4 of 6 books, but I've only finished 2.
Report 2: When I search for "hobbit" nothing shows up, but "Hobbit" works.

Find the cause of each bug and propose a fix. Don't change anything yet.
```

Pushback on the plan:

```
Before you fix anything, add one regression test per bug and run the tests
to show me they fail. Keep the fixes as small as possible, don't refactor
anything else. At the end, run npm test -- --run and npm run check.
```

Commit:

```
Commit the changes with a clear message that mentions both bugs.
```

## Where a Human Should Step In

- **No tests in the plan**: Agents often fix the code directly. Without a failing test first, you don't know whether the test would have caught the bug.
- **Too much change**: Claude may suggest cleaning up the search or adding a new helper function. That makes the diff harder to review. Ask for the smallest fix.
- **Changing the test instead of the code**: If a test fails, the agent might "fix" the test. A regression test must only change when the expected behavior changes.
- **Only one bug fixed**: Check both reports in the browser at the end, not just the test output.
- **Commit message**: "Fix bugs" is not enough. Something like "Count only finished books in stats and make search case-insensitive" tells your team what changed.

## Example `NOTES.md` Sentences

- `stats.test.ts`: adds a test with a "reading" book that expects it not to be counted as read.
- `stats.ts`: only books with the status "read" count as finished.
- `filterBooks.test.ts`: adds a test that searches with lower and upper case letters.
- `filterBooks.ts`: compares title and author in lower case with the lower-case search term.

## Expected Result

- The stats show "2 of 6 books read (33%)" and "806 pages read".
- Searching for "hobbit", "HOBBIT" or "tolkien" finds _The Hobbit_.
- `npm test -- --run`: 12 tests pass.
- `npm run check`: no errors.
