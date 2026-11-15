# Reading List Logic: Specification

This specification describes **what** the logic does, not how it is written. It is the same for every language. The TypeScript reference in `typescript/` is the original, and the shared test cases in `fixtures/cases.json` check every language against it.

You know the Reading List app from the CSS day and the framework day. Here you port only its **logic**: the part without a screen.

## In scope and out of scope

In scope, you port these three things:

- `STATUS_LABELS`: the label of every status.
- `filterBooks`: filter the books by status and search text.
- `validateBook`: check title and author of a book.

Out of scope: the list helpers `addBook`, `updateBook` and `deleteBook`, the storage in `localStorage` and all UI. They are in the framework starter, not here.

## Data model

```ts
type Status = "want-to-read" | "reading" | "done";

type Book = {
  id: string;
  title: string;
  author: string;
  status: Status;
  rating: number | null; // 1 to 5, null means "not rated"
  notes: string;
};
```

In the Python, Java, Go and Rust starters the status is a plain string, to keep the languages comparable. The `rating` can be missing (`None`, `null`, `nil`), so every language has a type for "a number or nothing": `Optional[int]`, `Integer`, `*int` and `Option<u8>`. The skeleton in your language folder already has the type of `Book`.

## STATUS_LABELS

A mapping from every status to the text shown to the reader:

| Status         | Label          |
| -------------- | -------------- |
| `want-to-read` | `Want to read` |
| `reading`      | `Reading`      |
| `done`         | `Done`         |

The label is exactly this text, with this upper and lower case.

## filterBooks(books, status, query)

Input: a list of books, a status (`want-to-read`, `reading`, `done` or the word `all`) and the search text `query` (a string, can be empty).

Output: a **new** list with the books that match both conditions, in the **same order** as the input.

Steps:

1. Normalize the query: remove white space at the start and the end (**trim**), then convert it to lower case. Do this **first**, before anything else uses the query.
2. Keep a book when
   - the status is `all` or the status of the book is equal to the status, **and**
   - the title of the book, in lower case, **contains** the normalized query.

Rules and edge cases (every line is a test case in `fixtures/cases.json`):

| Case                                            | Result                                                                          |
| ----------------------------------------------- | ------------------------------------------------------------------------------- |
| Status `all` and an empty query                 | all books                                                                       |
| Status `reading` and an empty query             | all books with the status `reading`                                             |
| **A query with only spaces** (`"   "`)          | the same as an empty query. It is trimmed **before** the check, so it is empty  |
| A query with only a tab and a newline           | the same as an empty query                                                      |
| Upper or lower case (`dune`, `DUNE`)            | finds `Dune`. The search ignores the case                                       |
| Spaces around the query (`" Dune "`)            | ignored                                                                         |
| Spaces **inside** the query (`"the name"`)      | kept. It finds `The Name of the Wind`                                           |
| A part of a word (`an`)                         | matches. It is a "contains" check, not "starts with" and not "equal"            |
| Status and query                                | both must match. `reading` and `dune` gives an empty list                       |
| No match (`xyz`)                                | an **empty list**, not an error and not `null`/`nil`                            |
| The search text is only compared with the title | the author (`Herbert`) and the notes are **not** searched                       |

The input list is not changed. A status other than the four above is not part of the tests.

Case-insensitive means the standard lower-casing of your language for the letters of the tests. Do not install a library for it.

## validateBook(title, author)

Input: the title and the author of a book as strings. Output: a mapping from the field name to an error message, with one entry for every **invalid** field. An empty mapping means the input is valid.

| Field    | Invalid when                                  | Message             |
| -------- | --------------------------------------------- | ------------------- |
| `title`  | empty after trimming (`""`, `"   "`, `"\t\n"`) | `Title is required`  |
| `author` | empty after trimming                          | `Author is required` |

- Both fields can be invalid at the same time. Then the result has two entries.
- A valid field has **no** entry. The result does not contain empty messages.
- Spaces around a valid text are fine (`"  Dune "` is valid). The function checks the text, it does not change it.
- The messages are exactly the texts above.

## The test cases

`fixtures/cases.json` is the one file that all languages share. It has the keys:

- `books`: the ten books of the Reading List (the input of all `filterBooks` cases).
- `statusLabels`: the expected `STATUS_LABELS`.
- `filterBooks`: a list of `{ name, status, query, expectedIds }`. The expected result is the list of the **ids** of the books, in order.
- `validateBook`: a list of `{ name, input: { title, author }, expected }`.

The expected values were not written by hand. They were created by running the TypeScript reference (`typescript/books.ts`) on the inputs.
