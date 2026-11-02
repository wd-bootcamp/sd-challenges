# Advanced React Testing: Demo End

This is the end result of the Advanced React Testing demo: the favorite movies app with snapshot tests, tests with mocked components and tests for loading, error and success states.

## What to look at

- `Movie.test.tsx`: snapshot tests (`toMatchSnapshot`, `toMatchInlineSnapshot`) and `rerender`
- `Footer.test.tsx`: a snapshot with a fixed date
- `Movies.test.tsx`: `vi.mock` for `Recommendations` and tests for state changes
- `Movies.isolated.test.tsx`: `vi.mock` for `Movie`, checking the props `Movies` passes down
- `Recommendations.test.tsx`: mocking `fetch` and testing loading, error and success states

## Development

To work locally, please install the dependencies using `npm i` first (Node.js 22.22 or newer is required).

Run `npm run dev` to start a development server and open the displayed URL in a browser.

Use `npm run test` to run the tests and `npm run check` to check the types. Press `u` in the watch mode to update snapshots.

### Scripts

You can use the following commands:

- `npm run dev` to start a development server
- `npm run build` to build the project
- `npm run serve` to preview the production build
- `npm run test` to run the tests with Vitest
- `npm run check` to check the types with TypeScript
