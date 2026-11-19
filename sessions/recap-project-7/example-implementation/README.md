# Todo App: Reference Implementation

The finished Recap Project 7 (all stories except the bonus story): Express 5 + mongoose backend and a React 19 + SWR frontend. For coaches, not for students. Students build their own version from the starter in `../todo-app`.

## Run it

You need Node.js 22.22 or newer and a MongoDB (a local `mongod` or an Atlas cluster).

```bash
# Terminal 1: the API on http://localhost:3001
cd backend
cp .env.example .env   # then put your MONGODB_URI into .env
npm i
npm run dev

# Terminal 2: the app on http://localhost:5173
cd frontend
npm i
npm run dev
```

The API contract is in `docs/api-contract.md`.

## What to look at

- `backend/src/app.ts`: CORS for `http://localhost:5173`, JSON parser, router, error handlers.
- `backend/src/models/Todo.ts` and `routes/todos.ts`: the model and the four routes. The routes call the model directly.
- `backend/src/middleware/errors.ts`: invalid JSON gives 400, a todo without a title gives 400, an invalid id gives 404.
- `frontend/src/api.ts`: all calls to the API.
- `frontend/src/App.tsx`: `useSWR` for the list, `run` for every change (call the API, load the list again, show the error).
