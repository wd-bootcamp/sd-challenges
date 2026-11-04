# Security Review: Solution

A fixed version of the notes feature, and the findings of the review.

## The claims in the description

| Claim                              | True?  | Evidence                                                                                                                               |
| ---------------------------------- | ------ | -------------------------------------------------------------------------------------------------------------------------------------- |
| All tests pass                     | Yes    | But a test **asserts the vulnerability** (see finding 4), so green means little                                                        |
| The types check                    | Yes    | Types do not check security                                                                                                            |
| Input is sanitized                 | **No** | `renderNote` turns text into an HTML string, and `NotesPanel` puts it into the page with `dangerouslySetInnerHTML`. Nothing is escaped |
| No secrets in the code             | **No** | `NOTES_API_KEY` is in `src/notes.ts`, which ends up in the browser                                                                     |
| Only the notes feature was changed | **No** | `vite.config.ts` got `host: true`, which exposes the dev server to the network                                                         |

## The findings

1. **Cross-site scripting (XSS)** in `src/components/NotesPanel/index.tsx` and `src/notes.ts`: a note like `<img src=x onerror=alert(1)>` creates a real `<img>` element, and the `onerror` code runs. Anybody who can write a note can run code in the browser of everybody who sees it. **Fix:** do not build HTML from user text. `parseNote` splits a note into plain and **bold** parts, and React renders them as text. React escapes text by itself.
2. **A secret in the browser** in `src/notes.ts`: everything in frontend code can be read by every visitor. A secret there is not a secret. **Fix:** remove it. The browser calls an own path (`/api/notes`), and a server or a proxy adds the key. If a real key was ever committed, it has to be **replaced**, and removing it from the code does not help, because it stays in the git history.
3. **Authorization only in the browser** in `isAdmin` and `NotesPanel`: the check reads a value from `localStorage`, which the user can change in two seconds. The button is hidden, but nothing stops a request. **Fix:** the **server** has to check the role for the delete request. The browser check only decides whether to show the button, and the code says so.
4. **A test that confirms the bug**: "keeps HTML in a note, so formatting works" and "renders the HTML of a note" check that the dangerous behavior stays. An agent that writes the code **and** the tests can make both wrong in the same way. **Fix:** the tests check the requirement: HTML is shown as text and not run, and no key is sent from the browser.
5. **An unrelated change** in `vite.config.ts`: `host: true` makes the dev server reachable from the network. It was not part of the feature, and the description did not mention it. **Fix:** remove it from the pull request.

## How the fix is verified

The solution has tests that fail with the original code:

- "shows HTML in a note as text and does not run it" renders `<img src=x onerror=alert(1)>` and checks that there is no `<img>` element and that the text is shown as it is.
- "does not send an API key from the browser" checks the headers of the request.

## What a tool finds and what it does not

- Tools find patterns well: `dangerouslySetInnerHTML` with a variable, a string that looks like a key.
- A human is needed for **context**: who may delete notes? Is this key a real one? Is this configuration change intended? Is this test checking the right thing?

## Development

Install the dependencies with `npm i` first (Node.js 22.22 or newer is required).
