# Scenarios: Chat, Agent or Neither? (Suggested Answers)

> These are suggestions, not the only right answers. Several scenarios are gray areas, they are marked with ⚖️. What matters is the reasoning.

## 1. What Is a Closure?

- Choice: **Chat AI**
- Why: You want to _learn_ a concept, not change code. A chat AI can explain it in different ways, give examples and answer follow-up questions. Check the explanation against a reliable source like MDN, and try the examples yourself.

## 2. Rename a Prop

- Choice: **Coding agent**
- Why: The change touches 14 files and is easy to verify (type check, tests). This is exactly what an agent is good at: find all usages, change them, run `npm run check`. You review the diff. (Your editor's "Rename Symbol" feature can also do this without any AI.)

## 3. Your First `useEffect`

- Choice: **No AI** (or **Chat AI** for explanations only)
- Why: The goal is to build your own understanding. If an agent writes the code, you finish the challenge but don't learn the concept, and you won't be able to review agent code that uses `useEffect` later. Asking a chat AI to _explain_ an error is fine, asking it for the solution is not.

## 4. A Regular Expression

- Choice: **Chat AI** ⚖️
- Why: A small, self-contained question that needs no project context. But: AI-generated regular expressions are often almost right. Test it with valid and invalid examples (`"20095"`, `"2009"`, `"200955"`, `"abcde"`). An agent could write it _and_ add tests, which is also a good choice.

## 5. Red CI in an Unknown Repository

- Choice: **Coding agent** (start in Plan mode)
- Why: The agent can read the workflow file, the logs and the code, and run the failing command locally. That is a lot of context a chat AI wouldn't have. Start in Plan mode so it explains the cause before changing anything, and review the fix like any other pull request.

## 6. Understand a Codebase

- Choice: **Coding agent** (read-only, Plan mode)
- Why: An agent can explore 200 files much faster than you and summarize the structure. Ask it questions like "Where does the data for the dashboard come from?" and check the answers by opening the files it mentions. Nothing needs to be changed, so Plan mode is a good fit.

## 7. Debug with Customer Data

- Choice: **No AI** with the real data. Use an agent or chat AI only with made-up data. ⚖️
- Why: Personal data of customers must not be sent to an external service without permission. Your company's rules and data protection law (GDPR) apply. Reproduce the bug with fake data that has the same shape, then use AI as usual.

## 8. Database Migration in Production

- Choice: **No AI** for running it. **Agent, with extra care** for preparing it. ⚖️
- Why: Mistakes here are expensive and hard to undo. An agent can help write and test the migration against a local or staging database. Running it in production is a deliberate human decision, following the team's process (review, backup, rollback plan). Never give an agent access to production credentials.

## 9. Write the Tests for a New Function

- Choice: **Coding agent** or **Chat AI** ⚖️
- Why: Both work. An agent can write the tests in the right file, run them and see them pass or fail. Either way, read every test: generated tests sometimes assert what the code _does_ instead of what it _should do_. Think about which edge cases you expect (0, negative values, large numbers) and check that they are covered.

## 10. Explain an Error Message

- Choice: **Chat AI**
- Why: A quick explanation of a general error is a perfect chat AI question. If you want the bug in _your_ code fixed, an agent can find the place where `.map` is called on `undefined`, but first make sure you understand the error yourself.
