# Todo App: Start of the Deployment Demo

The finished Recap Project 7 (backend in `backend/`, frontend in `frontend/`), **before** it is ready for a hosting platform. This is the start of the live demo of Backend Deployment. Students use their own Recap Project 7 repository instead.

Three things stop it from running on a platform. The demo changes them one by one:

1. `tsx` is a `devDependency` in `backend/package.json`, and a platform can skip those.
2. CORS in `backend/src/app.ts` allows only `http://localhost:5173`.
3. `API_URL` in `frontend/src/api.ts` is `http://localhost:3001/api`.

`../todo-fullstack-solution` has all three changes. The platform settings are in the handout of the session.

## Run it locally

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
