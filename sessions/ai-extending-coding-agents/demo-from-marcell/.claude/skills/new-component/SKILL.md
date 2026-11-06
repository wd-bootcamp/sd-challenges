---
name: new-component
description: Create a new React component with a props type and a test, following the conventions of this project. Use this whenever a new component is needed.
argument-hint: <ComponentName> <what it should do>
---

Create a new React component. The arguments are: $ARGUMENTS

The first word is the name of the component, the rest describes what it should do.

1. Create `src/components/<Name>/index.tsx` with an exported `<Name>Props` type and a named export `<Name>`.
2. Create `src/components/<Name>/<Name>.test.tsx` with at least two tests using React Testing Library. Query by role or label, not by class names.
3. Do not use the component anywhere yet, and do not add dependencies.
4. Run `npm run check` and `npm run test:run`.
5. Report which files you created and whether the checks passed.
