# Chat AIs vs Coding Agents: Chat AI Bug Hunt

The Bookshelf app keeps track of the books you want to read, are reading and have finished. Two users reported bugs. Your job is to fix both bugs with the help of a **chat AI only**, for example [claude.ai](https://claude.ai) (the free plan is enough).

The point of this challenge is not only the fix. You also observe how working with a chat AI feels: what you have to copy into the chat, what the chat AI has to guess, and how you check its answers.

## Bug Reports

### Bug Report 1: "My stats are wrong"

> I have finished two books, but the stats at the top say "4 of 6 books read (67%)" and "1486 pages read". I'm still in the middle of two other books. That's not what I have read!

### Bug Report 2: "Search doesn't find my book"

> I typed `hobbit` into the search field and the list was empty. When I typed `Hobbit` it worked. The same happens with author names: `weir` finds nothing.

## Tasks

### Rules

- Use **only a chat AI** in the browser. No coding agent, no AI in your editor (switch off inline suggestions such as Copilot if you have them).
- The chat AI cannot see your project. Everything it knows, you have to copy into the chat.
- Every change in the code is typed or pasted by you.

### Fix the Bugs

1. Install the dependencies with `npm i`, start the app with `npm run dev` and reproduce both bugs in the browser.
2. Run `npm test`. Notice that all tests pass, although the app has two bugs.
3. Work with the chat AI to find and fix the cause of **Bug Report 1**.
4. Add a test that would have caught the bug (a _regression test_). Make sure it fails before your fix and passes after it.
5. Repeat steps 3 and 4 for **Bug Report 2**.
6. Run `npm test` and `npm run check` one last time. Everything should pass.

### Keep a Chat Log

While you work, fill in [`CHAT-LOG.md`](./CHAT-LOG.md). Write short notes, not full sentences. Every time you copy something into the chat or out of it, add a line.

> 💡 Keep your `CHAT-LOG.md`! In the afternoon session you fix the same bugs with a coding agent and compare both ways of working.

### Reflect

Answer the reflection questions at the end of `CHAT-LOG.md`.

## Notes

- If the chat AI asks for a file, give it that file. If it makes assumptions about files it has never seen, write that down in your log.
- Don't paste the whole project at once. Start with what you think is relevant and see how far you get.

## Development

To work locally, please install the dependencies using `npm i` first.

Run `npm run dev` to start a development server and open the displayed URL in a browser.

Run `npm test` to run the tests with Vitest.

Run `npm run check` to let TypeScript check all types without running the code.

### Scripts

You can use the following commands:

- `npm run dev` to start a development server
- `npm test` to run the tests
- `npm run check` to type-check the project
