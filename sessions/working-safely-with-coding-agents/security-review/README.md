# Security Review of an Agent's Pull Request

(difficulty: 🔥🔥)

A coding agent wrote a feature: **notes** for the shelf. It sent you a pull request. The description says everything is fine, the tests are green and the types check. Your job is to review it like a pull request from a colleague you do not know yet.

Work in a git repository. Use Claude Code in the **Manual mode** (check the mode below the input at every start).

## Setup

```bash
git init -b main
npm i
git add .
git commit -m "Baseline"
git switch -c agent/notes
git apply pr.patch
git add .
git commit -m "Add notes (written by an agent)"
```

`git diff main` shows the pull request. Read `PR_DESCRIPTION.md` first. Then run `npm run check` and `npm run test:run`.

## Tasks

### 1. Check the claims (10 minutes)

The description makes five claims. For each of them, find out whether it is **true**, with evidence from the code:

| Claim                              | True? | Evidence |
| ---------------------------------- | ----- | -------- |
| All tests pass                     |       |          |
| The types check                    |       |          |
| Input is sanitized                 |       |          |
| No secrets in the code             |       |          |
| Only the notes feature was changed |       |          |

### 2. Review the code yourself (15 minutes)

Read the diff and write down every finding: file, line, what is wrong, why it matters, how you would fix it. Use this checklist:

- **Input:** is text from a user shown anywhere as HTML? What happens with `<img src=x onerror=alert(1)>`?
- **Secrets:** is there a key, a token or a password in code that runs in the browser?
- **Authorization:** who decides whether a user may do something, the server or the browser? Can the user change the value that is checked?
- **Tests:** do the tests check the requirement, or only repeat what the code does? Is there a test that **confirms a bug**?
- **Scope:** are there changes that were not asked for (configuration, dependencies)?

### 3. Let the agent review it (10 minutes)

1. Run `/security-review` on the branch. Or use your `reviewer` sub-agent from the last session, with a prompt that asks for security problems.
2. Compare: which findings did you have that the agent missed? Which did the agent find that you missed? Did it report anything that is not a problem?

### 4. Fix one finding (10 minutes)

Pick the most serious finding. In **Plan mode**, ask Claude to fix it, review the plan, then review the diff. Add a test that **fails** with the old code and passes with the fix. Prove that it works: run the test against the old code.

## Questions

- Why were the tests green although the code has a security hole?
- Which finding would an automatic tool find easily, and which one needs a human?
- What would you ask the agent to do differently next time (in `CLAUDE.md`, in the prompt, in a hook)?

## Development

Install the dependencies with `npm i` first (Node.js 22.22 or newer is required).

- `npm run dev` starts the app at http://localhost:3000
- `npm run test:run` runs the tests once, `npm run check` checks the types
