# Two features for "TDD with the Agent"

Work test first: let the agent write the tests from the acceptance criteria, **read and check them**, run them (they must fail), and only then let it write the code.

## Feature 1: Show only unread books

- [ ] A checkbox "Only unread" next to the search hides all read books.
- [ ] It works together with the search and the sorting.
- [ ] The filter logic is a function `filterUnread(books)` in `src/books.ts`. It returns a new array.

## Feature 2: Rate a book

- [ ] Every card shows five star buttons. Clicking the third star gives the book the rating 3.
- [ ] Clicking the star of the current rating again removes the rating (back to "No rating yet").
- [ ] The statistics update right away.
- [ ] The logic is a function `rateBook(books, id, rating)` in `src/books.ts`. It returns a new array and never changes the input. Ratings outside 1 to 5 throw an error.
