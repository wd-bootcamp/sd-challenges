# Programming Languages Landscape: Demo Start

The folder `language-demo` for the live demo of the session. One subfolder per language, each with the same small program: the Reading List `filterBooks` with six books, the search text "the" and the status "done". It is the reference for the coach demo: the same logic, five spellings.

All five programs print exactly these two lines:

```
The Hobbit (done)
Klara and the Sun (done)
```

| Folder       | File                | Run (inside the folder)                  | Toolchain                              |
| ------------ | ------------------- | ---------------------------------------- | -------------------------------------- |
| `typescript` | `filter-books.ts`   | `node filter-books.ts`                   | Node.js 22.23 or newer                 |
| `python`     | `filter_books.py`   | `python3 filter_books.py`                | Python 3.9 or newer                    |
| `java`       | `FilterBooks.java`  | `java FilterBooks.java`                  | Java JDK 25 (single-file launch)       |
| `go`         | `filter_books.go`   | `go run filter_books.go`                 | Go 1.25 or newer                       |
| `rust`       | `filter_books.rs`   | `rustc filter_books.rs` then `./filter_books` | Rust 1.99 (`rustc`)               |

On Windows, run `filter_books.exe` in the Rust folder.

## Run a program

```bash
cd typescript   # or python, java, go, rust
node filter-books.ts
```

## Docker fallback for Go and Rust

Without Go or Rust installed, run these inside the language folder:

```bash
# in go/
docker run --rm -v "$PWD":/w -w /w golang:1.25 go run filter_books.go

# in rust/
docker run --rm -v "$PWD":/w -w /w rust:1 sh -c 'rustc filter_books.rs -o /tmp/fb && /tmp/fb'
```

## Tested with

Tested on 2026-11-15 on macOS (arm64):

| Language   | Version                                                              | Result |
| ---------- | -------------------------------------------------------------------- | ------ |
| TypeScript | Node.js 22.23.3 (TypeScript 5.9.3 for the `tsc` check)                | ok     |
| Python     | Python 3.9.6                                                         | ok     |
| Java       | OpenJDK 25.0.2                                                       | ok     |
| Go         | Go 1.25.14 and 1.27.4, in Docker (`golang:1.25`, `golang:1.27`)       | ok     |
| Rust       | rustc 1.99.1 and cargo 1.99.1, in Docker (`rust:1`)                  | ok     |

## Break it: a type error

Change the last call so that the search text is `42` instead of `"the"`. Real messages from the same run:

| Language   | Command                                                                     | Result |
| ---------- | --------------------------------------------------------------------------- | ------ |
| TypeScript | `node filter-books.ts`                                                      | runs and fails: `TypeError: query.trim is not a function` |
| TypeScript | `npx -p typescript@5 tsc --noEmit --strict --target es2022 filter-books.ts` | `error TS2345: Argument of type 'number' is not assignable to parameter of type 'string'.` |
| Python     | `python3 filter_books.py`                                                   | runs and fails: `AttributeError: 'int' object has no attribute 'strip'` |
| Java       | `java FilterBooks.java`                                                     | `error: method filterBooks in class FilterBooks cannot be applied to given types;` ... `reason: argument mismatch; int cannot be converted to String`, nothing runs |
| Go         | `go run filter_books.go`                                                    | `cannot use 42 (untyped int constant) as string value in argument to filterBooks`, nothing runs |
| Rust       | `rustc filter_books.rs`                                                     | `error[E0308]: mismatched types` ... `expected &str, found integer`, nothing runs |

Change the call back afterwards. The "one unique thing per language" snippets (Rust ownership, Go goroutine, Java virtual thread, `cargo new`) are in the coach guide. They are separate files created on the spot and are not part of this folder.

## Notes

- There are no tests in these programs. Tests belong to the exercise starter `reading-list-logic-port`.
- The filter logic is the same everywhere: trim and lowercase the query, keep the books with the status (or all) whose title contains the query.
- Compiled files (`rust/filter_books`, `.exe`, `.pdb`) are ignored by git.
