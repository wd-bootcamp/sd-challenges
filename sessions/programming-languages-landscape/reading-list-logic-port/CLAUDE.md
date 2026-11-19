# Reading List Logic Port

Port the logic of the Reading List from TypeScript to <!-- TODO: Python 3 | Java | Go | Rust -->. Read `README.md` and `SPEC.md` before you do anything.

I work **only** in the folder <!-- TODO: python | java | go | rust -->. The folder `typescript` is the reference and read-only. The file `fixtures/cases.json` is shared by all languages and read-only.

## Commands

<!-- TODO: Keep the commands of your language, delete the others. Run them in the folder of the language. -->

- Python, in `python`: `python3 -m unittest`
- Java, in `java`: `javac -d out src/*.java` and then `java -cp out BooksTest`
- Go, in `go`: `go test` (and `go vet`, `gofmt -l .`)
- Rust, in `rust`: `cargo test` (and `cargo fmt`, `cargo clippy` if installed)
- Reference, in `typescript`: `node --test`

## Rules

- **Do not change** the tests and the fixtures: `fixtures/cases.json`, `python/test_books.py`, `java/src/BooksTest.java`, `java/src/Json.java`, `go/books_test.go`, `rust/tests/cases.rs`, `typescript/*`. If a test fails, change the code. If you think a test or the fixtures are wrong, stop and ask me.
- Change only the source file of my language: `python/books.py`, `java/src/Books.java` (and `Book.java` only if needed), `go/books.go`, `rust/src/lib.rs`. Keep the names and signatures of the skeleton, the tests call them.
- **No new dependencies.** Standard library only. No library for lowercasing, trimming, searching or JSON. Do not change `Cargo.toml` or `go.mod`, do not add a `pip install`, a Maven or Gradle file or a build tool.
- Write the port in my language only. No other language, no script that generates code.
- **Plan mode first.** Explain the plan in terms of my language (the types, the standard library functions, what is different from TypeScript) and wait until I approve it. Then work in small steps: `STATUS_LABELS`, `filterBooks`, `validateBook`, with a test run after each.
- Trim the query **first**, then lower-case it, and only then use it (see `SPEC.md`).
- Keep the code simple and readable. A plain loop is fine. No clever tricks I can not review, and no `unsafe`.
- When you use a construct of the language that a TypeScript developer does not know, explain it in one sentence in your answer and compare it with TypeScript.
- Run the tests before you say a task is done, and show me the output. If you could not run them, say so.
- Do not commit unless I ask you to. I commit after I read the diff.

## Language rules

<!-- TODO: Keep the section of my language, delete the others. -->

### Python 3

- Python 3.9 compatible. Type hints on all functions, `dataclass` for the book, standard library only.

### Java

- JDK 17 or newer, the plain `javac` command, no build tool. Use `strip()` and `toLowerCase(Locale.ROOT)`. No `null` return values: return an empty list or map.

### Go

- Package `readinglist`, `gofmt` formatted, the code passes `go vet`. Return an empty slice, not `nil`, for no result. No `panic` in the final code.

### Rust

- Edition 2024, `cargo fmt` formatted. No `unwrap()` and no `clone()` of whole books in `filter_books` (it returns references), no `unsafe`.
