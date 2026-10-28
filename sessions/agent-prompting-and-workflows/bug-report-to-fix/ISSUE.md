# #12 Books with empty titles can be added

**Reported by:** a Bookshelf user
**Labels:** bug

## Description

I can add a book that has no visible title. It shows up as an empty card in my list and I can't find it with the search. Also, when I accidentally type a space before or after a title, the space is saved.

## Steps to reproduce

1. Start the app with `npm run dev`.
2. In the "Add a book" form, type three spaces into **Title**.
3. Type `Frank Herbert` into **Author** and `412` into **Pages**.
4. Click **Add book**.

**Actual:** A new card without a title appears at the top of the list.

5. Now type `  Dune  ` (with spaces before and after) into **Title**, `Frank Herbert` into **Author** and `412` into **Pages** and add the book.

**Actual:** The book is saved as `"  Dune  "`. Searching for `Dune` still finds it, but sorting and comparing titles will treat it differently from `"Dune"`.

## Expected behavior

- Spaces at the start and end of the title and the author are removed before the book is saved.
- If the title or the author is empty after removing the spaces, the book is **not** added. The form shows the message `Title and author can't be empty.`
- Valid books are added as before and the form is reset.
