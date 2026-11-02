# Advanced React Testing: Demo Start

This is the starter of the Advanced React Testing demo. It is the favorite movies app from React Component Testing with a few additions:

- `Movies` shows how many movies there are and how many are liked, and a hint when the list is empty.
- `Recommendations` loads movie recommendations with `fetch` and shows a loading, an error and a success state.
- `Footer` shows the current year.

The tests from React Component Testing for `Movie`, `Form` and `Movies` are already there. Run them and take a look at the warning that `Movies` causes. We will fix it in the demo.

## Development

To work locally, please install the dependencies using `npm i` first (Node.js 22.22 or newer is required).

Run `npm run dev` to start a development server and open the displayed URL in a browser.

Use `npm run test` to run the tests and `npm run check` to check the types.

### Scripts

You can use the following commands:

- `npm run dev` to start a development server
- `npm run build` to build the project
- `npm run serve` to preview the production build
- `npm run test` to run the tests with Vitest
- `npm run check` to check the types with TypeScript
