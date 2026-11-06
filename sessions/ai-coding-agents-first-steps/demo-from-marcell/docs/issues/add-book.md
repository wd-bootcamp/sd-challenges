# Add a book and keep my books

**As a** reader **I want to** add a book to my shelf **so that** my shelf contains the books I really have.

## Acceptance criteria

- [ ] A form above the list has the fields title, author and year. Title and author are required, the year is a number between 1450 and the current year.
- [ ] After submitting, the new book appears in the list, unread and without a rating. The form is empty again.
- [ ] Invalid input shows a message next to the field and adds nothing.
- [ ] The books are stored in `localStorage` and are still there after a reload of the page.
- [ ] The statistics include the new book.
- [ ] The logic (create a book, validate the input, load and save) lives in `src/books.ts` or a new file next to it and has tests. The form has a component test.

## Grenzen
- keine neuen dependencies hinzufügen
- bestehende tests nicht ändern vorerst, sondern nur neue hinzufügen

## Beispiele
- 
