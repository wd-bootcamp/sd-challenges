# Refactor to Clean Code: Solution

The solution of the Refactor to Clean Code challenge: `inv` became `renderInvoice`.

What changed and why:

- **Names:** `renderInvoice(lines, { currency, vatRate, applyDiscount })` instead of `inv(l, c, t, d)`. The options are one object, so a call explains itself.
- **Magic numbers:** the discount tiers are a table, `DISCOUNT_TIERS`. A new tier is one new line.
- **Nesting:** three nested `if` blocks became `findDiscountRate`, one lookup in the table.
- **Small functions:** `renderLine`, `calculateLineTotal`, `formatMoney` and `findDiscountRate` do one thing each. `renderInvoice` reads like a description of an invoice.
- **No repetition:** string concatenation with `+` is gone, `formatMoney` is the one place that knows about two decimals.
- **No side effect:** `inv` sorted the array it received (`l.sort(...)`), which changed the caller's data. `filter` creates a new array, so the sort no longer touches the input. A test shows it.
- **Bonus:** `7.000000000000001%` came from `0.07 * 100`. `Math.round(vatRate * 100)` prints `7%`.

The expected texts in the original tests stayed exactly the same. That is what makes a refactoring safe.

## Development

Install the dependencies with `npm i` first (Node.js 22.22 or newer is required).

- `npm run test` runs the tests in the watch mode, `npm run test:run` runs them once
- `npm run coverage` runs the tests and writes a coverage report to `coverage` (`coverage/lcov.info` is the file SonarQube Cloud reads)
- `npm run check` checks the types
- `npm run lint` runs ESLint, including rules from `eslint-plugin-sonarjs` that are similar to SonarQube rules
- `npm run format` formats the code with Prettier, `npm run format:check` only checks it
