---
name: new-component
description: Create a new React component with a props type and a test, following the conventions of this project. Use this whenever a new component is needed.
argument-hint: <ComponentName> <what it should do>
---

Create a new React component. The arguments are: $ARGUMENTS

The first word is the component name, the rest describes what it should do. If the description is unclear, ask a question before you write code.

1. Read `CLAUDE.md` and one existing component, for example `src/components/Stats/index.tsx`, to see the conventions.
2. Create `src/components/<Name>/index.tsx` with a default export and a `<Name>Props` type.
3. Create `src/components/<Name>/<Name>.test.tsx` with at least one test that checks the behavior from the description.
4. Do not add the component to `App.tsx` unless the description says so.
5. Run `npm run check` and `npm run test:run` and fix problems in your own files.
6. Report which files you created and the result of the checks.
