# Notes: From Bug Report to Fix

This folder shows one possible fix for issue #12: `BookForm` trims the title and the author and refuses empty values. `src/components/BookForm.test.tsx` contains the regression tests.

## Example prompts

```
@ISSUE.md describes a bug in the add-book form. Don't fix it yet.
First write component tests for BookForm in src/components/BookForm.test.tsx
that reproduce every point of the "Expected behavior" section.
Mock onAddBook with vi.fn(). Run the tests and show me that the new ones fail.
```

```
The tests fail for the right reason. Now fix the bug in BookForm.
Don't change the tests. Run all tests and `npm run check` afterwards.
```

```
Commit the changes with a message that references issue #12.
```

## Red before green

With the original `BookForm`, three of the four tests fail:

- "removes spaces around the title and the author": `onAddBook` is called with `"  Dune  "`.
- "does not add a book with a blank title and shows an error": `onAddBook` is called and there is no alert.
- "does not add a book with a blank author": `onAddBook` is called.

The first test ("adds a valid book") passes before and after the fix. It makes sure the fix doesn't break the normal case.

## What to look for in the diff

- **Both fields** are trimmed and checked, not only the title. The issue mentions both.
- **The exact message** from the issue: `Title and author can't be empty.`
- **Accessible error:** `role="alert"` lets screen readers announce the message, and the test can find it by role.
- **The form is not reset** when the input is invalid, so users can correct their entry.
- **No test was changed** to make it pass.

## Common detours

- The agent fixes the bug first and writes the test afterwards. The test then never failed, so nobody knows if it can catch the bug. Ask for the order explicitly.
- The agent puts the trimming in `App.tsx` (`handleAddBook`). That works too, but the error message belongs to the form. Discuss where validation should live.
- The agent adds the `pattern` attribute or a validation library. Ask whether it's needed for one check.
