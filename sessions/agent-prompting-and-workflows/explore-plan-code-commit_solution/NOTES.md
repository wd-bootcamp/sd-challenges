# Notes: Explore, Plan, Code, Commit

The code in this folder is one possible implementation. `WORKLOG.md` shows the run that produced it.

## What to look for

- **Separate function:** `sortBooks` is a pure function next to `filterBooks`. App combines them: `sortBooks(filterBooks(books, query, status), sortBy)`.
- **No mutation:** `Array.prototype.sort` sorts in place. The solution copies the array first (`[...books]`) and a test proves the input stays the same. Agents often forget this, which makes it a good point to push back on.
- **Unrated last:** `(b.rating ?? 0) - (a.rating ?? 0)` treats missing ratings as 0. Ties keep their order because JavaScript's sort is stable.
- **Tests for every row of the table**, including ties and unrated books.

## Typical problems in student runs

- Skipping Explore and jumping straight to "build it". The plan is then based on guesses about the code.
- Accepting the first plan without reading it. Ask students for their pushback note: an empty note usually means the plan wasn't read.
- "It works" based on the agent's summary only. Ask for test output and a browser check.
- A huge single commit that also includes unrelated changes (formatting, renamed variables). Ask the agent to keep the diff focused.
