# Advanced Unit Testing: Animal API

(difficulty: 🔥🔥)

`getAnimal` loads an animal with `fetch`. `getAnimalSounds` loads several animals and returns their sounds.

> 💡 The URL `https://api.example.com/animals` does not exist. That is on purpose: the tests must never send a real request.

## Tasks

Open `src/animals.test.ts`. The first test is already implemented. Implement the other test cases.

1. Mock `fetch` in every test with `vi.spyOn(globalThis, "fetch")`.
2. Test the happy path and the two error cases of `getAnimal` (status 404 and a network error).
3. Test that `getAnimalSounds` returns the sounds in the right order and sends one request per id.
4. Run `npm run check`. Does TypeScript complain about your tests?

### Hints

- A successful response: `new Response(JSON.stringify(cat))`
- A failed response: `new Response(null, { status: 404 })`
- A network error: `mockRejectedValue(new TypeError("Failed to fetch"))`
- A response body can be read only once. If your function sends several requests, use `mockResolvedValueOnce` once per request.
- Promises: `await expect(getAnimal(1)).resolves.toEqual(cat)` and `await expect(getAnimal(99)).rejects.toThrow("...")`. Without `await` the test finishes before the promise is settled, and it passes even if it should fail.
- Spies keep their mock behavior across tests, so restore them in an `afterEach` (already prepared).

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
