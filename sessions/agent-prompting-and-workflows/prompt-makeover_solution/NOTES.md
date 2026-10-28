# Notes: Prompt Makeover

## What to look for in student rewrites

A good rewrite usually contains most of these ingredients:

| Ingredient         | Question it answers                     | Example                                          |
| ------------------ | --------------------------------------- | ------------------------------------------------ |
| Goal (and why)     | What should be true afterwards?         | "Books should survive a page reload."            |
| Context            | Where should the agent look?            | `@src/App.tsx`, the full error output, a screenshot |
| Constraints        | What must it not do?                    | "Don't install packages", "only change CSS"      |
| Definition of done | How do we both know it worked?          | "`npm test -- --run` and `npm run check` pass"   |
| Scope              | Is the result small enough to review?   | one feature per prompt                           |

Rewrites don't need to be long. A three-line prompt with a clear goal and a check is better than a page of step-by-step instructions.

## Typical mistakes

- Turning a vague prompt into a micromanaging one (prompt 1 → a list of edits). Steps are fine as _constraints_ ("put the logic in a custom hook"), not as a full recipe.
- Forgetting the definition of done. Many rewrites describe the feature but never say how to verify it.
- Keeping prompt 5 as one big task. Splitting is the whole fix.
- Summarizing the error in prompt 2 instead of planning to paste it.

## Plan mode comparison

Plans differ from run to run. Typical observations:

- Weak prompts lead to assumptions the agent states in the plan ("I'll assume a 1–10 scale"). Encourage students to read the plans for these assumptions; they are the decisions the prompt didn't make.
- With "Ask me if something is unclear", the agent usually asks one to three questions before planning.
- A good plan names the files it will touch and how it will verify the change. If a plan doesn't, push back before accepting it.
