# Answers: Agent Transcript

> Example answers. Some steps can have more than one valid label. What matters is that you can explain your choice.

## 1. Label Every Step

| Step | Label(s)                        | What happens (one short sentence)                                                  |
| ---- | ------------------------------- | ---------------------------------------------------------------------------------- |
| 1    | Prompt                          | The developer describes the problem, not the solution.                             |
| 2    | Reasoning                       | Claude decides to look at the failure before changing anything.                    |
| 3    | Tool call + tool result         | Claude runs the tests (`Bash`) and reads the error output.                         |
| 4    | Tool calls + tool results       | Claude reads the function and the test file (`Read`).                              |
| 5    | Reasoning                       | Claude explains the cause correctly but picks the quickest fix: changing the test. |
| 6    | Tool call + permission          | Claude wants to edit the test file and asks for permission.                        |
| 7    | Prompt                          | The developer says no and explains what "correct" means here.                      |
| 8    | Reasoning                       | Claude accepts the feedback and changes its plan.                                  |
| 9    | Tool call + permission + result | Claude edits the function, the developer approves, the file is updated.            |
| 10   | Tool call + tool result         | Claude runs the tests again: all green.                                            |
| 11   | Tool call + tool result         | Claude runs the type check: no errors.                                             |
| 12   | Answer                          | Claude summarizes the change and points out a follow-up decision.                  |

## 2. The Loop

a) Gather context: steps 3 and 4 (run the tests, read both files).

b) Act: step 6 (attempted, rejected) and step 9 (the real fix).

c) Verify: step 3 is also a kind of verification (confirming the bug exists), steps 10 and 11 verify the fix.

d) Two loops: the first one (3 → 4 → 5 → 6) ended with an edit the developer rejected. The second one (8 → 9 → 10 → 11) ended with a verified fix. Without the developer's feedback in step 7, there would have been only one loop with the wrong result.

## 3. Tools

| Tool     | Used for                                                      |
| -------- | ------------------------------------------------------------- |
| `Bash`   | Running `npm test -- --run` and `npm run check`               |
| `Read`   | Reading `src/splitBill.ts` and `src/splitBill.test.ts`        |
| `Update` | Editing a file (proposed for the test, done for the function) |

## 4. The Human in the Loop

a) Changing the expected value makes the test describe the bug instead of the intended behavior. The tests would be green, but the function would still return `36.666666666666664`, which nobody can pay. A green test suite only means "the code does what the tests say", not "the code is correct".

b) The permission prompt: in Manual mode, Claude asks before every edit, and option 3 lets you say no and explain what to do instead.

c) The test edit would have gone through without anyone noticing. The final answer would probably still have said "Fixed, all tests pass", which is true but misleading. The developer would only have found out by reading the diff.

d) Whether the shares must add up exactly is a product decision: it depends on what the users of the app expect. The agent doesn't know that. It can only point out the trade-off.

## 5. Same Task, Chat AI

a) The test output, `splitBill.ts` and probably `splitBill.test.ts`, plus an explanation of what the function is supposed to do.

b) The developer. The chat AI can't run anything, so every suggestion is unverified until the developer pastes it in and runs the tests.

c) It could suggest the same shortcut, because it is the smallest change that makes the error go away. Whether anyone notices depends entirely on the developer reading the suggestion carefully. That is the same with an agent: the difference is that the agent applies the change itself, so the review has to happen before you approve it (or in the diff afterwards).

## 6. Your Take

The agent found the relevant files, ran the tests and the type check, and verified its own fix, without the developer copying anything. It still needed the developer to decide what "correct" means (fix the code, not the test) and to make a product decision about rounding. The agent does the work. The developer is responsible for the result.
