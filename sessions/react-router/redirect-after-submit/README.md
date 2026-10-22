# React Router: Redirect after Submit

In this challenge, you will use the `useNavigate` hook to redirect the user after a form was submitted.

## Tasks

- Start the development server and make yourself familiar with the application. The router is already set up: click through the pages with the navigation.
- Go to the "Add character" page and add a character. Nothing happens, except that the form is cleared. Go to "Characters" to check that the character was added.

### Redirect after submit

- In `./src/pages/CharacterForm.jsx`, import `useNavigate` from `react-router` and call it at the top of the component.
- After the new character was added, redirect the user to `/characters`.
- Check the browser: after submitting the form, the new character should be visible in the list.

### Cancel button

- Add a second button with the text "Cancel" to the form.
- It must not submit the form. Use `type="button"`.
- When clicking it, go back to the previous page. `navigate` also accepts a number: `navigate(-1)` goes one page back in the history.

## Notes

- You only have to touch the `./src/pages/CharacterForm.jsx` file.
- Call `useNavigate()` in the component body, **not** inside the submit handler.

## Development

To work locally, please install the dependencies using `npm i` first.

Run `npm run dev` to start a development server and open the displayed URL in a browser.

### Scripts

You can use the following commands:

- `npm run dev` to start a development server
- `npm run build` to build the project
- `npm run serve` to preview the production build
