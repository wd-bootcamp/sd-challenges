# Advanced Unit Testing: Demo End

The end result of the Advanced Unit Testing demo: tests for all three modules.

- `src/price.test.ts`: `describe`, `test.each` and `toThrow`
- `src/products.test.ts`: mocking `fetch` with `vi.spyOn` and testing promises with `resolves` and `rejects`
- `src/order.test.ts`: mocking a whole module with `vi.mock` and `vi.mocked`

## Development

To work locally, please install the dependencies using `npm i` first (Node.js 22.22 or newer is required).

> ❗️ This project has no browser part. Everything happens in the terminal.

Use `npm run test` to start Vitest in watch mode.

### Scripts

You can use the following commands:

- `npm run test` to run the tests in watch mode
- `npm run test:run` to run the tests once
- `npm run coverage` to run the tests once and print a coverage report
- `npm run check` to check the types with TypeScript (Vitest does not do that)
