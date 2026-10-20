# React Router: Routes and Navigation

In this challenge, you will turn a one-page application into an application with multiple pages and a navigation.

## Tasks

- Start the development server and make yourself familiar with the application. Welcome text and character list are displayed on the same page.

### Set up React Router

- Install the router: `npm install react-router`.
- In `./src/index.jsx`, wrap the `App` component with `BrowserRouter`.

### Create the routes

- In `./src/App.jsx`, add a `Routes` block with two routes:
  - `/` displays the `Home` page,
  - `/characters` displays the `CharacterList` page (pass `initialCharacters` as `characters`).
- Open `http://localhost:3000/characters` in the browser to check your routes.
- Add a route with the path `*` that displays a "Page not found" message. Try an URL like `/foo`.

### Add a navigation

- Create a `NavBar` component in `./src/components/NavBar.jsx` with a `Link` to `/` ("Home") and a `Link` to `/characters` ("Characters").
- Render the `NavBar` in `App`, **outside** of `Routes`, so it shows on every page.
- Click through the app. The page should not reload.

### Bonus

- Replace `Link` with `NavLink` in the `NavBar`. It adds an `active` class to the link of the current page. The styles for `nav a.active` already exist.

## Notes

- You only have to touch the following files:
  - `./src/index.jsx`,
  - `./src/App.jsx`,
  - `./src/components/NavBar.jsx` (new).

## Development

To work locally, please install the dependencies using `npm i` first.

Run `npm run dev` to start a development server and open the displayed URL in a browser.

### Scripts

You can use the following commands:

- `npm run dev` to start a development server
- `npm run build` to build the project
- `npm run serve` to preview the production build
