---
name: check
description: Run the type check and the test suite and report the result. Never edits files.
disable-model-invocation: true
---

Check the project. Do not edit, create or delete any files, even if something fails.

1. Run `npm run check`.
2. Run `npm test -- --run`.
3. Report in this format:

   - **Type check:** passed / failed
   - **Tests:** X passed, Y failed
   - For every failure: the file, the test name or line, and one sentence on what went wrong.

If everything passes, say so in one line. Do not suggest fixes unless I ask for them.
