# Prompting within an Agent & Agent Workflows: TDD with an Agent

Each book card should show how long it takes to read the book. You build the calculation **test-first** with a coding agent: tests, red, implementation, green.

## The Spec

Create a function `estimateReadingTime` in `src/lib/estimateReadingTime.ts`:

```ts
estimateReadingTime(pages: number, pagesPerHour = 40): string
```

Rules:

1. The reading time in minutes is `pages / pagesPerHour * 60`.
2. Round the minutes to the **nearest 5 minutes**. Halves round up.
3. If the rounded time is 0 minutes, return `"less than 5 min"`.
4. Under 60 minutes, return `"about <minutes> min"`.
5. From 60 minutes on, return `"about <hours> h <minutes> min"`. If the minutes are 0, return `"about <hours> h"`.
6. `pages` must be a positive whole number. Otherwise throw an error with the message `"pages must be a positive whole number"`.
7. `pagesPerHour` must be greater than 0. Otherwise throw an error with the message `"pagesPerHour must be greater than 0"`.

Examples:

| Call                              | Result                                           |
| --------------------------------- | ------------------------------------------------ |
| `estimateReadingTime(1)`          | `"less than 5 min"`                              |
| `estimateReadingTime(5)`          | `"about 10 min"` (7.5 min, halves round up)      |
| `estimateReadingTime(30)`         | `"about 45 min"`                                 |
| `estimateReadingTime(39)`         | `"about 1 h"` (58.5 min rounds to 60)            |
| `estimateReadingTime(100)`        | `"about 2 h 30 min"`                             |
| `estimateReadingTime(310)`        | `"about 7 h 45 min"`                             |
| `estimateReadingTime(100, 60)`    | `"about 1 h 40 min"`                             |
| `estimateReadingTime(0)`          | throws `"pages must be a positive whole number"` |
| `estimateReadingTime(-5)`         | throws `"pages must be a positive whole number"` |
| `estimateReadingTime(2.5)`        | throws `"pages must be a positive whole number"` |
| `estimateReadingTime(100, 0)`     | throws `"pagesPerHour must be greater than 0"`   |

## Tasks

Work in **Manual mode** (`claude --permission-mode default`) so you see every step.

### 1. Tests first

- Ask the agent to write **only the tests** for `estimateReadingTime` in `src/lib/estimateReadingTime.test.ts`, based on the spec. Paste the spec or reference this file with `@README.md`.
- Tell it explicitly: no implementation yet.

### 2. Review the tests yourself

This is the most important step. Compare the tests with the table above, line by line:

- Is every example covered?
- Are the expected values exactly the ones from the table (also the error messages)?
- Is there a test that would pass even with a wrong implementation?

If something is missing or wrong, tell the agent to fix the tests.

### 3. Red

- Let the agent run the tests (`npm test -- --run`). They must **fail**, because the function doesn't exist yet.
- If tests pass now, something is wrong with them. Find out what before you go on.

### 4. Green

- Ask the agent to implement the function so that all tests pass, **without changing the tests**.
- Watch out: if the agent wants to edit a test to make it pass, stop it with `Esc` and ask why.
- Run the tests again. All green?

### 5. Your own edge case

Think of one case the table doesn't cover, for example a very large book, `pagesPerHour` as a decimal number or `NaN`.

- Decide what the result should be.
- Ask the agent to add a test for it first, see it fail (or pass, if the implementation already handles it), then fix the implementation if needed.

### 6. Show it in the app

- Each `BookCard` should show a line like `Reading time: about 7 h 45 min`.
- Again test-first: ask for a component test in `src/components/BookCard.test.tsx` first, see it fail, then let the agent change `BookCard`.
- Commit your work with a clear message.

## Notes

- Commit after each green step. If the agent breaks something later, you can go back with git.
- If you want, add a section `## Testing` to a `CLAUDE.md` that says "Write tests first. Never change a test just to make it pass." Then check if the agent follows it.

## Development

To work locally, please install the dependencies using `npm i` first.

Run `npm run dev` to start a development server and open the displayed URL in a browser.

Run `npm test` to run the tests with Vitest. Use `npm test -- --run` to run them once without watch mode.

Run `npm run check` to let TypeScript check all types without running the code.

### Scripts

You can use the following commands:

- `npm run dev` to start a development server
- `npm test` to run the tests
- `npm run check` to type-check the project
