# Notes: TDD with an Agent

This folder shows one possible result: `src/lib/estimateReadingTime.ts` with its tests and the reading time line in `BookCard`.

## Example prompts

Tests first:

```
Read the spec in @README.md. Write ONLY the tests for estimateReadingTime
in src/lib/estimateReadingTime.test.ts, one test per row of the examples
table, with exactly the expected strings and error messages.
Don't create the implementation yet.
```

Red:

```
Run the tests once with `npm test -- --run` and show me the output.
They should fail because the function doesn't exist yet.
```

Green:

```
Now implement estimateReadingTime so that all tests pass.
Don't change the tests. Run the tests again afterwards.
```

## What to look for when reviewing the generated tests

- **Every row of the table is covered**, including the error cases. Agents like to merge or skip rows.
- **Exact values:** `toBe("about 2 h 30 min")`, not `toContain("2 h")`. Loose matchers pass with wrong implementations.
- **Error messages:** `toThrow("pages must be a positive whole number")`, not just `toThrow()`.
- **Tricky rows:** `39` pages (58.5 min) rounds up to `"about 1 h"`, and `5` pages (7.5 min) rounds up to `"about 10 min"`. These show whether the agent understood "nearest 5 minutes, halves round up".

## Things that go wrong in practice

- **The agent writes the implementation together with the tests.** Then there is no red phase. Delete the implementation (or ask the agent to) and run the tests again.
- **Tests pass in the red phase.** Usually the test imports something that already exists or asserts nothing (for example a missing `expect`).
- **The agent changes a test to make it green.** Stop it with `Esc`. Sometimes the test really is wrong, but then _you_ decide, based on the spec.
- **`NaN` as `pagesPerHour`:** `pagesPerHour <= 0` is `false` for `NaN`, so a naive check lets it through. The solution uses `!(pagesPerHour > 0)`. This is a good example of an edge case students can add themselves.

## Edge case example

The solution adds a test for a very large book (`1200` pages → `"about 30 h"`). Other good choices: a decimal reading speed (`estimateReadingTime(10, 7.5)` → `"about 1 h 20 min"`) or `NaN` pages.

## Discussion point

`BookCard` now throws if a book has invalid pages, for example `0`. The form prevents this with `min="1"` and the default `step` of 1, but data from other sources (like localStorage later) could still break the card. Ask students whether the card should show a fallback instead. There is no single right answer, but it should be a deliberate decision, not an accident.
