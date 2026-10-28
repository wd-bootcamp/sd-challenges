# Worklog: Sort Books (Example)

This is one example run. Your prompts, the agent's plan and your commit hashes will be different.

## 1. Explore

Prompt(s) I used:

```
I want to add sorting to this app later. First I want to understand the
current code: how do search and the status filter work, and where does
the list of visible books come from? Don't plan or change anything yet.
```

What I learned about the code (which files matter for this feature?):

- `src/App.tsx` holds `books`, `query` and `status` in state and computes `visibleBooks` with `filterBooks`.
- `src/lib/filterBooks.ts` is a pure function with tests in `filterBooks.test.ts`. Sorting can work the same way.
- `src/components/SearchBar.tsx` contains the search input and the status select.
- Types live in `src/types.ts`.

## 2. Plan

Prompt(s) I used:

```
Now plan the feature: users can sort the list with a "Sort by" select
next to the search bar.

<pasted the options table and acceptance criteria from the README>

Ask me questions if something is unclear before you write the plan.
```

Where I pushed back on the plan (at least once) and why:

- The plan added the sorting inside `filterBooks`. I asked for a separate `sortBooks` function, because the README asks for it and filtering and sorting are different jobs. Two small functions are easier to test.
- The plan didn't mention that `.sort()` changes the array in place. I asked for a test that checks the original array stays the same.

Questions the agent asked me, and my answers:

- "Should the select go into `SearchBar` or be its own component?" → its own component `SortSelect`, so `SearchBar` stays small.
- "Should the sort option be saved?" → No.

## 3. Implement

One sentence per diff I approved (in my own words):

1. Adds a `SortOption` type with the four options to `types.ts`.
2. Adds `sortBooks.test.ts` with one test per option, a test for unrated books and one that checks the input array isn't changed.
3. Adds `sortBooks.ts`: copies the array and sorts it with `localeCompare` for text and `rating ?? 0` so unrated books end up last.
4. Adds the `SortSelect` component with a label and the four options, plus two component tests.
5. Adds `sortBy` state in `App.tsx` and sorts the filtered books before they're passed to `BookList`.
6. Adds `.sort-select` to the existing flex styles.

Commands the agent wanted to run, and whether I allowed them:

- `npm test -- --run` → allowed (once, then "don't ask again" for this command).
- `npm run check` → allowed.
- `git add -A && git commit ...` → allowed after I read the message.

## 4. Verify

Evidence that it works (test output, what I clicked in the browser):

- `npm test -- --run`: 20 tests passed, including 6 new ones for `sortBooks` and 2 for `SortSelect`.
- `npm run check`: no errors.
- In the browser: "Rating (best first)" shows The Hobbit (5) first and the unrated books at the end. Searching for "the" while sorted by title keeps the sort order.

## 5. Commit

Branch name: `feature/sort-books`

Commit hash(es) and message(s):

- `3f9c2ab Add sort select for title, author and rating`

## Reflection

What would I put in the first prompt next time?

- "Keep sorting separate from filtering" and "don't mutate the input array". Both were in my head but not in my prompt.
