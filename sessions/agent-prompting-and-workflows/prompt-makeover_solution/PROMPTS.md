# Prompt Makeover: Example Solutions

There is no single correct prompt. These rewrites show one good version per prompt. Compare the _ingredients_ with yours: goal, context, constraints, definition of done and scope.

---

## 1. The vague one

> Make the app better.

**What is missing:** Everything. No goal, no idea of what "better" means, no scope, no way to tell when it's done. The agent will pick something random and probably change many files.

**Better prompt:**

```
I want to improve the Bookshelf app, but I don't know where to start.
Look at the app and the code and suggest five small improvements
(usability, accessibility or code quality). For each one, tell me
which files it touches and how big the change is.
Don't change any files yet.
```

> 💡 If _you_ don't know the goal yet, make exploring the task. Let the agent suggest, then you decide.

---

## 2. The error without the error

> I get an error when I run the tests. Fix it.

**What is missing:** The actual error message, which command was run, and what changed before it broke. The agent has to re-run everything and guess.

**Better prompt:**

```
`npm test -- --run` fails since I added an `isbn` field to the Book type.
Here is the full output:

<paste the complete error output here, not a summary>

Find the cause and fix it. Don't change or delete existing tests to make
them pass unless you explain why the test itself is wrong.
Run the tests again afterwards and show me the result.
```

---

## 3. The micromanager

> Open `src/components/BookCard.tsx`. Below the status button add another button ...

**What is missing:** The _why_ and the expected behavior. The prompt dictates a plan and leaves out what matters: should there be a confirmation? Should a test cover it? The agent can't suggest a better structure because the steps are fixed.

**Better prompt:**

```
Users should be able to remove a book from their shelf.
Add a "Delete" button to each book card. Clicking it removes the book
from the list (no confirmation dialog needed for now).
Follow the existing patterns in @src/App.tsx and @src/components/BookCard.tsx
for state updates and props.
Done when: the button works in the browser, there is a component test
for BookCard that checks the callback is called with the book id,
and `npm test -- --run` and `npm run check` pass.
```

---

## 4. The one without an end

> Add ratings.

**What is missing:** A definition of done. Who rates? Which scale? Where is it shown, can it be changed, only for read books? Tests?

**Better prompt:**

```
Books that have the status "read" should be ratable with 1 to 5 stars.
The Book type already has an optional `rating` field (@src/types.ts)
and BookCard already shows stars when a rating exists.

- Show five clickable star buttons on cards with status "read".
- Clicking a star sets the rating; the stars must be accessible
  (each button has a label like "Rate 3 of 5 stars").
- Books that are not "read" can't be rated.

Done when there is a component test for the rating buttons and
`npm test -- --run` and `npm run check` pass.
Ask me if something in this spec is unclear before you plan.
```

---

## 5. The whole roadmap

> Add user accounts with login, a backend with a database, dark mode, book covers ...

**What is missing:** A reviewable scope. This is five projects, one of which (backend, auth) the app isn't even prepared for. The diff would be thousands of lines nobody can review.

**Better prompt (just the first slice):**

```
I want to add dark mode to the Bookshelf app.
It should follow the system setting (prefers-color-scheme);
no toggle button for now.
Only change CSS in @src/styles.css: use CSS custom properties for the colors.
Don't add any libraries.
Done when the app is readable in both modes and nothing else changed.
```

> 💡 Split big wishes into a list, then send **one** item per task (and per session).

---

## 6. The two-word request

> Write tests.

**What is missing:** For what? Which cases? Which tools? The agent may write shallow tests that only check that something renders.

**Better prompt:**

```
@src/components/SearchBar.tsx has no tests yet.
Write component tests with Vitest and Testing Library, like the existing
@src/components/BookCard.test.tsx. Cover:
- typing in the search field calls onQueryChange with the typed text
- choosing a status calls onStatusChange with the selected value
- the select shows the status that is passed in as a prop
Don't change SearchBar itself. Run the tests and show me the output.
```

---

## 7. The one without guardrails

> Save the books in localStorage.

**What is missing:** Constraints and edge cases: what happens on first load, with broken data in storage? Library or not? Which part of the code is allowed to change?

**Better prompt:**

```
The books should survive a page reload.
Store the books array in localStorage under the key "bookshelf-books".

- On the first visit (nothing stored yet) use initialBooks.
- If the stored data is not valid JSON, fall back to initialBooks
  instead of crashing.
- Don't install any packages. Put the logic in a custom hook
  `useLocalStorageState` in src/hooks/.
- Search and filter state should NOT be stored.

Done when reloading keeps added books and status changes, the existing
tests still pass and `npm run check` is clean.
```

---

## 8. The "you know what I mean"

> The book cards look weird. Make them nicer.

**What is missing:** What exactly looks weird, and what "nicer" means. The agent can't see your screen unless you show it.

**Better prompt:**

```
[screenshot of the book list attached]

On the screenshot, the cards have different heights and the status badge
and the button jump around. I want:
- all cards in a row to have the same height
- the status badge directly under the author
- the button always at the bottom of the card

Only change @src/styles.css. Keep the existing colors.
```

> 💡 You can drag a screenshot into the Claude Code terminal or paste it from the clipboard with `Ctrl+V` (also on macOS, not `Cmd+V`). An image often says more than a paragraph.

---

## Part 2: What we observed in Plan mode

Prompt 4, weak version: the agent planned a `<select>` with numbers 1–10, made it available for every status and added no test. It asked no questions.

Prompt 4, better version: the agent asked whether a rating can be removed again, then planned a `StarRating` component with five buttons, accessible labels and a component test.

Prompt 7, weak version: the plan saved the whole app state, including the search text, and used `JSON.parse` without error handling.

Prompt 7, better version: the plan created the custom hook, handled invalid JSON with `try/catch` and kept search and filter out of storage.

Your runs will look different. That's the point: the fewer decisions you leave open, the less the result depends on luck.
