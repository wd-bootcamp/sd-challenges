# TDD with the Agent: Solution

A reference solution of the TDD with the Agent challenge: `sortBooks`, `ReadingProgress`, their tests and the wiring in `App.tsx`.

Your tests and your code will look different, and that is fine, because an agent does not produce the same output twice. What should be the same:

- The tests were written **before** the code and were red for the right reason.
- There are tests for the edge cases: an empty list, unrated books in both directions, equal ratings in their original order, upper and lower case, one book instead of several, rounding.
- `sortBooks` does not change its input, and a test checks that.
- No test was changed to make it pass.
- Breaking the code on purpose makes a test red.

## Things to look at in the solution

- `sortBooks` handles unrated books before it applies the direction, so they are last in both directions.
- `Array.prototype.sort` is stable, so equal books keep their order.
- `[...books].sort(...)` sorts a copy.
- `ReadingProgress` returns early for an empty list, so the rest of the component does not have to deal with a division by zero.

## Development

Install the dependencies with `npm i` first (Node.js 22.22 or newer is required).

- `npm run dev` starts the app in the browser
- `npm run test` runs the tests in the watch mode, `npm run test:run` runs them once
- `npm run check` checks the types
