# Programming Languages Landscape: Reading List Logic Port

You move the **logic** of the Reading List from TypeScript to a language you do not know yet: Python, Java, Go or Rust. You do not write the code yourself. You direct Claude Code, the **tests** tell you whether the result is right, and you **review** code in a language you cannot read fluently yet.

This README describes the whole task. Read it completely before you start.

## The task

Port two things of `typescript-reference/src/books.ts` to **one** language of your choice:

- `filterBooks(books, { status, query })`: returns the books whose status matches (`"all"` matches every status) **and** whose **title** contains the search text. The search ignores upper and lower case and the spaces around the search text. The order of the books stays the same.
- `STATUS_LABELS`: the label of each status (`want-to-read`, `reading`, `done`).

The expected results are in `fixtures/cases.json`. They are computed from the seed data of the Reading List and checked by the TypeScript reference (`typescript-reference`). Every language reads the **same** file, so a correct port passes the same cases in every language.

Choose a language you have **not** used before. If you want a safe start, choose Python. If you want the most to learn, choose Rust.

## What is in the starter

```
reading-list-logic-port/
  fixtures/cases.json         the shared test data: books, labels, cases with expected ids
  typescript-reference/       the original code and its tests (Vitest)
  python/                     skeleton with unittest
  java/                       skeleton with a small test runner
  go/                         skeleton with go test
  rust/                       skeleton with cargo test
  CLAUDE.md                   template for the rules of your agent
```

Each language folder is a minimal project. The functions are **not implemented**, so all tests fail at the start. This is the state you want: tests first, then code.

**Do not change** `fixtures/cases.json` and the test files. You may add your own cases at the end (see Bonus).

## Check your toolchain

Open a terminal in the project folder and run the commands for your language. Every command must print a version.

| Language               | Check                                   | Needs                                                                                           |
| ---------------------- | --------------------------------------- | ----------------------------------------------------------------------------------------------- |
| Python                 | `python3 --version`                     | 3.9 or newer                                                                                    |
| Java                   | `java --version` and `javac --version`  | tested with 25 (records need 16 or newer). You need the **JDK**: the `javac` command must exist |
| Go                     | `go version`                            | tested with 1.25 and 1.27                                                                       |
| Rust                   | `rustc --version` and `cargo --version` | 1.85 or newer (tested with 1.99)                                                                |
| TypeScript (reference) | `node --version`                        | 22.22 or newer                                                                                  |

If a command is missing, **ask your coach before you install anything**. Do not follow a random installation tutorial.

On Windows, use `python` instead of `python3` if `python3` is not found.

## Run the tests

Run the tests of the **reference** first. They pass, and you see what the tests look like when the code is right:

```bash
cd typescript-reference
npm i
npm run test:run
```

Then the tests of your language. At the start, **all of them fail**:

| Language | Folder   | Command                                                         |
| -------- | -------- | --------------------------------------------------------------- |
| Python   | `python` | `python3 -m unittest -v`                                        |
| Java     | `java`   | `javac -d out src/*.java test/*.java && java -cp out BooksTest` |
| Go       | `go`     | `go test ./...`                                                 |
| Rust     | `rust`   | `cargo test`                                                    |

> 💡 Rust downloads `serde` and `serde_json` the first time (the package manager is `cargo`, the packages are called crates). That needs an internet connection and takes a moment.

## Steps

1. Work in a git repository (`git init -b main`, `git add .`, `git commit -m "Initial commit"`).
2. Check your toolchain and run the tests of your language. Make sure they fail for the right reason: "not implemented", not a missing tool.
3. Copy `CLAUDE.md` into the folder of your language (or keep it in the root, as you like), fill in the TODOs and write down the **commands** of your language before you start.
4. Read `typescript-reference/src/books.ts` and `typescript-reference/src/types.ts` yourself. They are short. You need to know what the code must do before you can judge a port.
5. Start Claude Code in **plan mode**. Ask for a plan to implement the functions in your language folder so that the tests pass. Read the plan. Ask the agent to explain every language feature in the plan that you do not know.
6. Approve the plan. Let the agent implement and run the tests.
7. **Review the code** with the list below. Ask the agent about every line you do not understand, and change code if you do not accept the answer.
8. When all tests pass and the review is done, commit.

If the agent gets stuck, do not retry the same prompt. Read the failing test output, tell the agent which test fails and why, or start again with a clearer plan.

## Review a language you do not know

You cannot judge the style of a language you do not know. You can still check a lot:

- **The tests are unchanged.** Run `git diff --stat`: only the file with the implementation is changed, not `fixtures/cases.json` and not the test files.
- **No hard-coded results.** The code must not contain book ids, titles or the expected lists. It must work for other data.
- **Every line is explained.** Pick three lines you do not understand. Ask the agent: "What does this do, and what would break without it?" Then explain the answer in your own words, to yourself or a classmate.
- **No new dependencies.** The only packages are the ones from the starter. Check `Cargo.toml`, `go.mod` and imports. A new dependency for a lowercase and a `contains` is a bad sign.
- **Standard library only for the logic.** Trimming, lowercasing and searching are part of every standard library. Find which functions the agent used and look them up in the official documentation of the language.
- **Edge cases.** Look at the cases in the fixtures: empty query, only spaces, no match, status `all`. Which line of the code handles each one?
- **Comparison with the reference.** Put the TypeScript function next to the port. Can you map every part of the TypeScript to a part of the port? What is different, and why does the language need it?
- **Idioms.** Ask: "Is this how a developer of this language would write it?" Check the answer in the official documentation or the language style guide, not only the agent's word.
- **Naming.** The port should use the naming of the language (`filter_books` in Python and Rust, `filterBooks` in Java, `FilterBooks` in Go because it is exported).
- **The agent did not touch other files.** No new files you did not ask for, no changed configuration.

## Bonus

- **Add three cases** to `fixtures/cases.json` that you find missing, for example a title with a special character. Run the TypeScript tests first (`npm run test:run`). If they fail, your expected ids are wrong. Then run the tests of your language.
- **A second language.** Port to another language with the same plan and compare how the review felt. Which language made the agent's mistakes easier to see?
- **Explain it back.** Write five sentences for a classmate who knows only JavaScript: what is different in your language for the same function?
