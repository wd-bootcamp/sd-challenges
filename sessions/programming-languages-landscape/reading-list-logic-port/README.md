# Programming Languages Landscape: Reading List Logic Port

You know the logic of the Reading List from the framework day: `filterBooks`, `validateBook` and the labels of the statuses, written in TypeScript. Today you **port it to a language you do not know yet**: Python, Java, Go or Rust. You choose one. The coding agent writes most of the code, **you** direct it, let the tests judge it and review the result in a language you can not read yet.

This README describes the whole task. Read it completely before you start.

## The task

Port these three things from `typescript/books.ts` to **one** language:

- `STATUS_LABELS`: the label of every status.
- `filterBooks`: filter by status and search text.
- `validateBook`: check title and author.

The behaviour is described in `SPEC.md`. **Read it first.** The tests are shared by all languages: they read the same file, `fixtures/cases.json`, and check your port against the TypeScript reference.

### What is already done

```
fixtures/cases.json   the shared test cases (inputs and expected outputs)
typescript/           the reference implementation and its test (green)
python/               skeleton and test (red)
java/                 skeleton and test (red)
go/                   skeleton and test (red)
rust/                 skeleton and test (red)
SPEC.md               what the logic does, with all edge cases
CLAUDE.md             rules for the agent, with TODOs for you
```

Every language folder is a **skeleton**: the types and the function signatures are there, the functions are empty (`NotImplementedError`, `UnsupportedOperationException`, `panic` or `todo!`) and the test is written. All tests are **red** at the start. Your job is to make them **green** by filling in the functions, and not by changing anything else.

You work only in the folder of your language, and you only change the source file with the TODOs (`books.py`, `src/Books.java`, `books.go` or `src/lib.rs`). **Do not change the tests and do not change the fixtures.** If a test fails, the code is wrong.

### Choose your language

| Language   | Good reasons to choose it                                                                                      | Be honest: what is hard                                                                                                         |
| ---------- | -------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------- |
| Python     | The shortest code, the closest to what you read in the demo.  | The types are **not checked** before the code runs. A wrong call shows up only when it runs, so the tests matter most here.     |
| Java       | A compiler checks the types, you see how a typed language of big companies looks.                              | The most words per idea. A JDK (not only a JRE) is needed. The test has a small JSON reader, because the JDK has no JSON library. |
| Go         | A small language with few ideas, fast compile errors, and `go test` is built in.                               | Probably not installed. Errors are values, `nil` and an empty list are not the same, and there is no `filter` function.         |
| Rust       | The strictest compiler. You see what "memory safety without garbage collector" means in a real error message. | Probably not installed, the most to learn, `filter_books` returns references with a lifetime, and the first `cargo test` downloads crates. |

No choice is wrong. Rust is the hardest and Python the easiest, and the exercise is made so that every one of them works in the time. If you work in a group, try to cover **different** languages, so you have someone to compare notes with at the end.

### Check your toolchain

Run the check command of your language. You only need the toolchain of **one** language.

| Language   | Check command                         | You need                                      |
| ---------- | ------------------------------------- | --------------------------------------------- |
| TypeScript | `node --version`                      | Node.js 22.23 or newer (for the reference)    |
| Python     | `python3 --version`                   | Python 3.9 or newer (on Windows: `python --version`) |
| Java       | `javac -version`                      | A JDK 17 or newer. `java -version` alone is not enough: it also works with a JRE, which has no `javac` |
| Go         | `go version`                          | Go 1.22 or newer                              |
| Rust       | `rustc --version` and `cargo --version` | Rust 1.85 or newer (edition 2024). Update with `rustup update` |

If the command is not found, **ask Claude Code to install the toolchain**. Start Claude Code in an empty folder (not in this project) and tell it which language you chose and the minimum version from the table. Read every command before you approve it. The agent should only install and check, not change any project files. Then close the terminal, open a new one and run the check command again. If you can not install it, choose a language that works on your machine.

### The commands

Run the command **in the folder of the language**, not in the root:

| Language   | Folder        | Tests                                                      |
| ---------- | ------------- | ---------------------------------------------------------- |
| TypeScript | `typescript`  | `node --test`                                              |
| Python     | `python`      | `python3 -m unittest` (on Windows: `python -m unittest`)   |
| Java       | `java`        | `javac -d out src/*.java`, then `java -cp out BooksTest`   |
| Go         | `go`          | `go test`                                                  |
| Rust       | `rust`        | `cargo test`                                               |

In Java, compile again after every change. `javac` writes into the folder `out` (git ignores it).

How the Java test reads JSON: the JDK has no JSON parser, and a build tool like Maven would be a big detour. So `java/src/Json.java` is a small parser of about 100 lines that only the test uses. You do not write or change it, and your `Books.java` does not need it.

In Rust, `cargo test` downloads `serde` and `serde_json` on the first run (the test needs them to read the JSON file), so it needs a network connection. Your code does not need any other crate.

## Steps

1. **Set up the repository.** If this folder is not a repository yet, run in the root `git init -b main`, `git add .` and `git commit -m "Initial commit"`.

2. **See what green looks like.** Run the tests of the TypeScript reference (`cd typescript`, `node --test`). All 32 tests pass. Open `typescript/books.ts`: it is the code you port, about 40 lines.

3. **See what red looks like.** Run the tests of your language (command above). They **must fail**, with messages like `NotImplementedError` or `not yet implemented`, and **not** with a compile error. If you see a compile error, `command not found` or a missing file, read the section "Problems" below before you go on.

4. **Read `SPEC.md`** and look at `fixtures/cases.json`. Find the test case "only spaces" and say in your own words what it checks.

5. **Prepare `CLAUDE.md`.** Fill in the TODOs: your language, your folder and your commands. Delete what does not apply. The rules must name **your** language, or the agent can choose another one.

6. **Start Claude Code in this folder** and begin in **plan mode**. Ask the agent to read `SPEC.md`, the TypeScript reference and your skeleton, and to explain the plan in terms of your language: which type, which standard library function for trimming, lower-casing and searching, and what changes for `null`/`None`/`nil`. Read the plan, correct it and only then approve it.

7. **Port in small steps.** One part at a time: `STATUS_LABELS` first, then `filterBooks`, then `validateBook`. Run the tests after each part, and commit after each working part.

8. **Run all tests** until they are green. Then run `git status`: only your source file may have changed. If a test file or the fixtures show up, run `git restore` on them.

9. **Review the result** with the list below.

If you run out of time, finish `filterBooks` first: it is the heart of the task. **Never skip the review.**

## Rules

- Work in **one** language and in **one** folder.
- Do not change the tests and do not change `fixtures/cases.json`. Fix the code, not the test. (The only exception is the bonus "Add cases".)
- No new dependencies: no library for lowercasing, searching or JSON. The standard library of your language is enough. In Rust, do not change `Cargo.toml`. In Go, do not change `go.mod`.
- Plan mode first. Do not let the agent write code before you read and approved the plan.
- Run the tests and read the output before you say "done". Do not trust "all tests pass" from the agent without seeing the output.
- Read every permission prompt and every diff.

## Review your result

You review code in a language you do not know. That is hard, and it is a normal situation in a job. Use the list, and **ask the agent** when you do not understand something: "Explain this line to me. I know TypeScript, so compare it to TypeScript where it helps." Then check the answer in the official documentation of the language.

- **Tests and fixtures:** `git diff --stat` shows only your source file. A test or the fixtures changed? Undo it with `git restore`.
- **Dependencies:** compare the files before and after. In Python no `import` of a package that is not in the standard library, in Java no `import` outside `java.*`, in Go no new line in `go.mod`, in Rust no change in `Cargo.toml`.
- **Order of the steps:** is the query trimmed and lower-cased **first**? Find the line. What happens with the query `"   "`?
- **Empty result:** does a search without a match return an empty list (not `null`, `None` or `nil`)? Find the line.
- **The input:** does the code change the list it got? A filter must build a new list.
- **Missing values:** the `rating` can be missing. Does the port handle that, or does it crash for a book without a rating? (`filterBooks` does not use it, but the type must allow it.)
- **Lines you do not know:** pick three lines you do not understand. Ask the agent to explain them, and write the explanation in your own words.
- **Language style:** is the code written the way people in this language write it (names, loops or comprehensions, error handling)? Models often write TypeScript in a new syntax. Ask: "What would an experienced Python/Java/Go/Rust developer write here?"
- **Danger signs for each language:**
  - Python: a type hint is not a check. A call with a number instead of a string still runs until it fails.
  - Java: `toLowerCase()` without a `Locale` depends on the computer settings (for example Turkish). `Locale.ROOT` is the safe choice. Is `null` possible anywhere?
  - Go: `nil` slice or empty slice? `strings.TrimSpace` and `strings.ToLower` are in the standard library. Is a loop variable changed by mistake?
  - Rust: `.unwrap()`, `.clone()` and `unsafe` in the logic are a reason to ask "why?". Does `filter_books` return references (as in the demo) or copies?
- **Break it on purpose:** remove the trimming. Which tests fail? Put it back. Tests that stay green when you break the code do not protect you.
- **What the tests do not see:** write down one thing the tests would not notice (for example the performance, the readability or an unused function).

## Bonus

- **Add cases:** add three test cases to `fixtures/cases.json` that you think are missing (the file has `filterBooks` and `validateBook` lists). Make the TypeScript reference pass them first (`node --test` in `typescript`), then your port. This is the only time you may change the fixtures.
- **A second language:** port the logic to another language with the same plan. Which language made mistakes of the agent easier to see, and why?
- **Explain it to a JavaScript developer:** write five sentences for a classmate who only knows JavaScript: what is different in your language for the same function?
- **The list helpers:** port `updateBook` and `deleteBook` from `core/books.ts` of the framework starter (if you have it) with a test of your own in a **new** test file. Do not change the given tests.

## Problems

| Problem                                                                  | Cause and fix                                                                                          |
| ------------------------------------------------------------------------ | ------------------------------------------------------------------------------------------------------ |
| `python3: command not found` (Windows)                                   | Use `python`. Check the installation with the command above.                                           |
| `javac: command not found`, but `java` works                             | Only a JRE is installed. A JDK is needed.                                                              |
| `go: command not found` or `cargo: command not found`                    | The toolchain is not installed, or the terminal was not restarted after the installation.              |
| Rust: `cargo test` fails with a network error                            | `cargo` downloads `serde` and `serde_json` on the first run. Retry with a better connection.           |
| Rust: error about `edition = "2024"`                                     | Your Rust is older than 1.85. Run `rustup update`, or choose another language.                         |
| Java: `file not found: src/*.java`, or the test can not read `../fixtures/cases.json` | You ran the command in the wrong folder. Run it in the folder `java`.                       |
| Python: `ModuleNotFoundError: No module named 'books'`                   | `python3 -m unittest` was run in the wrong folder. Run it in `python`.                                 |
| The test can not find `fixtures/cases.json`                              | The language folder was moved out of the starter. Keep the folder structure.                           |
| The agent changes the tests or the fixtures                              | `CLAUDE.md` has no rule or was not read. Add the rule and run `git restore` on the test files.         |
| The agent adds a library for lowercasing or searching                    | Not needed. Point to the rule "no new dependencies" in `CLAUDE.md`.                                    |
| The agent writes the port in another language than you chose             | The language is not in `CLAUDE.md`. Fill in the TODO and start again.                                  |
| Tests fail only for the case "only spaces"                               | The query is trimmed after the check instead of before. Compare with the TypeScript reference.         |

## Development

- TypeScript reference: Node.js 22.23 or newer, no `npm install` needed.
- The expected values in `fixtures/cases.json` come from the TypeScript reference.
