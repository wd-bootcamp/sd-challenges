# Notes: Browser Check with MCP

This folder shows one good result. The agent's report will be worded differently every time.

## Setup

`claude mcp add --scope project playwright -- npx @playwright/mcp@latest` writes [`.mcp.json`](.mcp.json). The file is committed, so every teammate who starts Claude Code in this project gets the same server. Claude Code asks each of them to approve servers from `.mcp.json` before they start. That prompt exists because an MCP server is a program that runs on your computer.

`/context` shows the Playwright tools as their own block. Every connected MCP server puts its tool descriptions into the context, even when you don't use them. That is why you only add servers you actually need.

## Expected Findings

The flows themselves work: adding a book, searching (also in lower case), filtering and changing the status.

The real finding is at **375 x 667 pixels**:

- The book list is wider than the screen. The page scrolls horizontally and the book cards are cut off on the right.
- The cause is in `src/styles.css`: `.book-list` uses `grid-template-columns: repeat(3, 300px)`. Three fixed 300px columns need about 950px, no matter how wide the screen is.

A good agent report mentions the horizontal scrolling and points to the fixed grid columns. If the report says "everything looks fine", look at the phone screenshot yourself. This happens: the agent's confidence carries no information. Ask it to check the page width against the window width.

Other findings the agent may report (fine to discuss, not required):

- An empty or whitespace-only title can be added (`"   "` passes the `required` check). That's a real bug in `BookForm`, but it isn't a layout problem.
- Small layout details like spacing between the form fields.

## The Fix

```css
.book-list {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(260px, 1fr));
  /* ... */
}
```

`auto-fill` with `minmax` creates as many columns as fit. On a phone that's one column, on a laptop three. You know this from the CSS Grid session. Check that the agent's fix is something you can explain. A fix like `overflow-x: hidden` on the `body` hides the symptom and should get your pushback.

## Re-Check

Ask: "Open the app again at 375 x 667 and at 1280 x 800, take screenshots and confirm that nothing scrolls horizontally." Look at both screenshots before you commit.

## Things to Push Back On

- The agent wants to visit other websites "for reference". Deny it: that's not part of the task, and any page it opens goes into its context.
- The agent changes code during the test phase although the prompt said "Don't change any code yet."
- The agent installs a CSS framework or a new dependency to fix one line of CSS.
