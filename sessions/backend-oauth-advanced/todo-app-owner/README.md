# Backend OAuth Advanced: Todo App, One List per User

The todo app with the login of "Backend OAuth Basic", now with a database for the login and **one todo list per user**. This is the solution of the required challenges of "Backend OAuth Advanced":

- `backend/src/auth.ts`: Better Auth saves users and sessions in MongoDB (`mongodbAdapter`, collections `user`, `account`, `session`, `verification`).
- `backend/src/middleware/auth.ts`: `requireAuth` puts the id of the user into `response.locals.userId`.
- `backend/src/models/Todo.ts`: a todo has an `owner`. It is not part of the API response.
- `backend/src/routes/todos.ts`: every route needs a login and only sees the todos of the logged-in user. The todo of another user is a 404.
- `frontend/src/App.tsx`: the list and the form only show up after the login.

## Run it

Like in "Backend OAuth Basic": Node.js 22.22 or newer, a MongoDB and your own GitHub OAuth App (callback URL `http://localhost:5173/api/auth/callback/github`).

```bash
# Terminal 1: the API on http://localhost:3001
cd backend
cp .env.example .env   # then fill in MONGODB_URI, the GitHub values and BETTER_AUTH_SECRET
npm i
npm run dev

# Terminal 2: the app on http://localhost:5173
cd frontend
npm i
npm run dev
```

Open `http://localhost:5173` and log in. In Compass you see the collections of Better Auth and an `owner` on every new todo. Todos from before this change have no owner and do not show up anymore.

`npm run typecheck` (backend) and `npm run check` (frontend) check the types. The API contract is in `docs/api-contract.md`.
