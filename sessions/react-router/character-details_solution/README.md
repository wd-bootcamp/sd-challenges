# React Router: Character Details

In this challenge, you will create a details page for every character with a dynamic route.

## Tasks

- Start the development server and make yourself familiar with the application. The router is already set up: there are routes for the home page, the character list and the form.

### Link to the details

- In `./src/pages/CharacterList.jsx`, make every character card a link to `/characters/{id}`, for example `/characters/1` for Rick Sanchez. Use `Link` and a template literal.
- Click a character. You should see the "Page not found" message, because the route does not exist yet.

### Create the details page

- Create a `CharacterDetails` page in `./src/pages/CharacterDetails.jsx`. It receives the list of all `characters` as a prop.
- In `./src/App.jsx`, add a route with the path `/characters/:id` that displays the `CharacterDetails` page. Pass the `characters` as a prop.
- In `CharacterDetails`, read the `id` from the URL with `useParams` and find the matching character in `characters`.
  - Careful: URL params are strings, but the `id` of a character is a number. Convert the param with `Number(id)`.
- Display the name, image, species and status of the character.
- Add a `Link` back to `/characters`.

### Unknown characters

- Open `/characters/999`. Handle the case that no character was found and display "Character not found" with a link back to all characters instead of crashing.

## Notes

- You only have to touch the following files:
  - `./src/pages/CharacterList.jsx`,
  - `./src/pages/CharacterDetails.jsx` (new),
  - `./src/App.jsx`.
- The `CharacterCard` component already exists and can be reused.

## Development

To work locally, please install the dependencies using `npm i` first.

Run `npm run dev` to start a development server and open the displayed URL in a browser.

### Scripts

You can use the following commands:

- `npm run dev` to start a development server
- `npm run build` to build the project
- `npm run serve` to preview the production build
