# Todo App: Ready for a Hosting Platform

The todo app of `../todo-fullstack-start` with the three changes for a platform. For coaches and for comparing.

| Change | Where |
| --- | --- |
| `tsx` moved from `devDependencies` to `dependencies` | `backend/package.json` |
| The allowed origins come from `CORS_ORIGINS` (comma separated, default `http://localhost:5173`) | `backend/src/app.ts` |
| `API_URL` comes from `VITE_API_URL` (default `http://localhost:3001/api`), set before the build | `frontend/src/api.ts` |

## Run it locally

Same as the start folder: `cd backend && cp .env.example .env && npm i && npm run dev`, then `cd frontend && npm i && npm run dev`.

## Settings on Render

| Part | Type | Settings |
| --- | --- | --- |
| Backend | Web Service | Root directory `backend`, build command `npm install`, start command `npm start`, health check `/api/health`, variables `MONGODB_URI` and `CORS_ORIGINS` (the exact origin of the frontend) |
| Frontend | Static Site | Root directory `frontend`, build command `npm install && npm run build`, publish directory `dist`, variable `VITE_API_URL` (`https://<backend>.onrender.com/api`, set **before** the build) |

The labels of the platform change. If your screen differs, trust the screen.
