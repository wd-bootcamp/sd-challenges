# Chat Log

> This is one example run with a chat AI. Your log will look different: the chat AI answers differently each time, and you made other choices about what to paste.

## Bug Report 1: Wrong Stats

| #   | What I pasted into the chat                                      | What the chat AI suggested                                                                                              | Did it guess about files it never saw?                                                                      | What I did with it                                                                  |
| --- | ---------------------------------------------------------------- | ----------------------------------------------------------------------------------------------------------------------- | ----------------------------------------------------------------------------------------------------------- | ----------------------------------------------------------------------------------- |
| 1   | The bug report and `ReadingStats.tsx`                            | "The component looks fine, the numbers come from `getReadingStats`. Can you share it?"                                  | No, it asked.                                                                                               | Searched the project for `getReadingStats`, found `src/lib/stats.ts`.               |
| 2   | `src/lib/stats.ts`                                               | The filter `book.status !== "to-read"` also counts books with status `"reading"`. Use `book.status === "read"` instead. | It assumed the `Book` type has exactly three statuses. True, but it hadn't seen `types.ts`.                 | Checked `src/types.ts` myself: `"to-read" \| "reading" \| "read"`. Applied the fix. |
| 3   | `src/lib/stats.test.ts` and "write a test that catches this bug" | A test with a third book with status `"reading"` that expects `read` to be 1.                                           | It used `it(...)` and imported from `vitest`, our tests use `test(...)` with globals. Small style mismatch. | Adjusted the test to our style, ran `npm test`: red before the fix, green after.    |

- Cause of the bug (in your own words): the stats counted every book that is not "to read", so books I'm still reading were counted as read.
- How I verified the fix: new test failed with the old code and passed with the new code. In the browser the stats now say "2 of 6 books read (33%)" and "806 pages read".
- Regression test I added (file and test name): `src/lib/stats.test.ts`, "does not count books that are still being read".
- Time spent: 15 minutes.

## Bug Report 2: Search

| #   | What I pasted into the chat        | What the chat AI suggested                                                                          | Did it guess about files it never saw?                                                                                                                | What I did with it                                                              |
| --- | ---------------------------------- | --------------------------------------------------------------------------------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------- |
| 1   | The bug report and `SearchBar.tsx` | "Make the input lowercase: `onQueryChange(event.target.value.toLowerCase())`."                      | Yes. It assumed the filtering happens somewhere that compares lowercase titles. It didn't. The fix would also change what the user sees in the input. | Didn't apply it. Looked for where the query is used: `App.tsx` → `filterBooks`. |
| 2   | `src/lib/filterBooks.ts`           | `includes` is case-sensitive. Lowercase both the search term and the title/author before comparing. | No.                                                                                                                                                   | Applied the fix in `filterBooks.ts`.                                            |
| 3   | "Write a test for this"            | A test that searches for `"hobbit"` and expects The Hobbit.                                         | No, it reused the test data from the first message.                                                                                                   | Added it, plus an uppercase author search. Red before, green after.             |

- Cause of the bug (in your own words): `String.prototype.includes` compares case-sensitively, and the search term and the titles were compared as they are.
- How I verified the fix: new test red → green, `hobbit` and `weir` find the right books in the browser.
- Regression test I added (file and test name): `src/lib/filterBooks.test.ts`, "ignores upper and lower case".
- Time spent: 20 minutes.

## Reflection

1. Six times into the chat, four times out of it.
2. All of them: `stats.ts`, `types.ts` and `filterBooks.ts`. The chat AI only knew what I showed it.
3. Yes. The first suggestion for the search bug was confident and plausible, but it was based on a guess about code it had never seen. It would have changed what the user sees in the search field and still not fixed the bug.
4. I ran the tests. The chat AI never knew whether its code works. Its answers were suggestions until I checked them.
5. I'd hand over: finding the right files, running the tests, adapting the test to our style. I'd keep: deciding which fix is right and reading the change before it goes in.
