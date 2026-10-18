# TypeScript React: Typed Fetch

This challenge is about typing data from an API and the loading and error states around it.

## Tasks

The tasks for this challenge are outlined in the comments inside the `./src/App.tsx` file.

The app should load a list of jokes from `https://example-apis.vercel.app/api/bad-jokes`. Each joke looks like this:

```json
{
  "id": 0,
  "joke": "Thanks for explaining the word “many” to me, it means a lot."
}
```

## Notes

- You only have to touch the `./src/App.tsx` file.
- `response.json()` returns `any`. Your job is to give that data a real type.

## Development

To work locally, please install the dependencies using `npm i` first.

Run `npm run dev` to start a development server and open the displayed URL in a browser.

Run `npm run check` to let TypeScript check all types without running the code. Your editor shows the same errors, so keep an eye on the red squiggles.

### Scripts

You can use the following commands:

- `npm run dev` to start a development server
- `npm run check` to type-check the project
