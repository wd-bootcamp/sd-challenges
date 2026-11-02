# Bug Hunt: Solution

The fixed Bookshelf app, with tests for all four bugs.

## The four bugs

1. **`toggleRead` changes the original book** (`src/books.ts`). It flips `isRead` on the book object in place and returns the same array. React sees the same array, does not re-render and the screen does not change. The fix creates a new array with a new book object: `books.map((book) => book.id === id ? { ...book, isRead: !book.isRead } : book)`. Found by the existing test "does not change the original list".
2. **The search is case sensitive** (`src/books.ts`). `book.title.includes(query)` does not find "Dune" when you type "dune", and does not ignore spaces. The fix normalizes both sides: `query.trim().toLowerCase()` and `book.title.toLowerCase()`. Found by the existing test "finds a title regardless of upper and lower case".
3. **The average counts books without a rating** (`averageRating` in `src/books.ts`). It divides by `books.length`, so unrated books (rating 0) pull the average down. For the sample books it shows 2.4 instead of 4. If the list is empty it divides by zero. The fix averages only the rated books and returns `null` if there are none. **No existing test** found it. It is covered by `averageRating` tests in the solution.
4. **"Remove" deletes the wrong book when a filter is active** (`BookList` and `App`). The list passes the **index in the filtered list** to `onRemove`, but `App` uses it as the index in the **complete list**. With the genre "Sci-Fi" selected, removing "Neuromancer" (index 1) removes "The Hobbit" (index 1 of all books). The fix passes the `id` and removes by `id`. **No existing test** found it. It is covered by the test "removes the right book while a genre filter is active" in `src/App.test.tsx`.

## What to take away

- Bugs 3 and 4 are the kind that tests do not find if nobody wrote the test. An agent finds them by reading the code against a specification. **Without a specification, it cannot know what "correct" means.**
- A chat AI can find the same bugs, but you have to copy the right files into the chat and apply every fix by hand.
- Check whether the agent changed a **test** to make it pass. That is the most important thing to look at in the diff.

## Development

Install the dependencies with `npm i` first (Node.js 22.22 or newer is required).

- `npm run dev` starts the app in the browser
- `npm run test` runs the tests in the watch mode, `npm run test:run` runs them once
- `npm run check` checks the types
