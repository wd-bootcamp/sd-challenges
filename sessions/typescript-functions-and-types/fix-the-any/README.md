# TypeScript Functions and Types: Fix the any

This challenge is about the problems of `any` and how to replace it with a real type.

## Tasks

The code in `./src/index.ts` has no type errors, but it is full of problems.

- Step 1: Run the code. What happens and why doesn't TypeScript warn you?
- Step 2: Replace `any` with a type alias `User`. Which lines now produce errors?
- Step 3: Make `name` optional in `User` and handle the missing case in the function. What is the return type now?
- Step 4: Explain in your own words (as a comment) why `any` is a bad fix for type errors.

## Notes

- You only have to touch the `./src/index.ts` file.
- The first run is expected to crash.

## Development

To work locally, please install the dependencies using `npm i` first.

Run `npm run start` to run `src/index.ts` and re-run it whenever you save.

Run `npm run check` to let TypeScript check all types without running the code. Your editor shows the same errors, so keep an eye on the red squiggles.

### Scripts

You can use the following commands:

- `npm run start` to run the code in the terminal
- `npm run check` to type-check the project
