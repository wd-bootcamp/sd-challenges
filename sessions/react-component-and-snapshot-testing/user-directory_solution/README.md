# User Directory: Solution

The solution of the User Directory challenge. There were two bugs:

- The search compared `user.name.includes(query)` and so was case sensitive. The fix is to compare lower-case versions of both.
- `handleRetry` increased the attempt, but did not set the status back to `"loading"`. While the second request was running, the user still saw the error. The fix is `setStatus("loading")`.

Use `npm run test` to run the tests and `npm run check` to check the types (install the dependencies with `npm i` first).
