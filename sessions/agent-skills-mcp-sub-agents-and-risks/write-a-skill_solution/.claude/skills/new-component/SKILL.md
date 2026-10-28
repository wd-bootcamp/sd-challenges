---
name: new-component
description: Create a new React component with a test file, following the Bookshelf conventions. Use this whenever a new component is needed in src/components.
argument-hint: <ComponentName> [what the component should do]
---

Create a new React component. The arguments are: $ARGUMENTS

The first word is the component name in PascalCase. Everything after it describes what the component should do. If the description is missing, ask me before you write any code.

1. Read `CLAUDE.md` and one existing component (e.g. `src/components/BookCard.tsx`) to match the style.
2. Create `src/components/<Name>.tsx`:
   - props typed with `type <Name>Props = { ... }` (skip the type if the component has no props)
   - a default export function component
   - semantic HTML and accessible labels
3. Create `src/components/<Name>.test.tsx` next to it:
   - at least one test that renders the component and checks the visible content
   - one test per callback prop, using `vi.fn()` and `userEvent`
4. Do not use the new component anywhere yet. Tell me where it could be used instead.
5. Run `npm run check` and `npm test -- --run` and report the result.
