# Reading List Logic Port

This project ports the logic of the Reading List (`filterBooks` and `STATUS_LABELS`) from TypeScript to **one** other language, driven by tests.

<!-- TODO: Fill in the language you chose and delete the other rows of the commands table. -->

## Language

Target language: **TODO (Python, Java, Go or Rust)**

I do not know this language yet. Explain every language feature you use in a short sentence when you show me the plan or the diff.

## Commands

Run the commands from the folder of the language.

| Language | Test command                                                    |
| -------- | --------------------------------------------------------------- |
| Python   | `python3 -m unittest -v`                                        |
| Java     | `javac -d out src/*.java test/*.java && java -cp out BooksTest` |
| Go       | `go test ./...`                                                 |
| Rust     | `cargo test`                                                    |

## Rules

- `fixtures/cases.json` and the test files are the specification. **Never change them**, not even to make a test pass. If you think a test is wrong, tell me.
- The reference is `typescript-reference/src/books.ts`. The port must behave the same way.
- Only edit the implementation file of the chosen language (`python/books.py`, `java/src/Books.java`, `go/books.go` or `rust/src/lib.rs`). Ask me before you create other files.
- Use only the standard library for the logic. Do **not** add dependencies. Ask me first if you think one is needed.
- Do not hard-code ids, titles or results. The code must work for any list of books.
- Do not change the input list. Return a new list.
- Follow the naming and formatting of the language. Use its official formatter if it has one (`gofmt`, `cargo fmt`).
- Run the tests after every change and show me the result. Never say the task is done without a passing test run.
- Keep it short and readable. No clever tricks, I need to understand the code.
