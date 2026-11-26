# Backend OAuth Basic: Demo Start

An empty fullstack project: an Express API in `backend/` and a Vite React page in `frontend/` that only says "Hello stranger". In the demo you add the login with GitHub (Better Auth). The result is `demo-end`.

```
backend/            Express API on http://localhost:3001
  src/server.ts     express.json() and GET /api/health
  .env.example      the values for the login (fill them in during the demo)
frontend/           Vite + React on http://localhost:5173
  vite.config.ts    forwards /api to the backend (no CORS needed)
  src/App.tsx       an empty page
```

## Run it

Node.js 22.22 or newer. Register your own GitHub OAuth App first (Homepage URL `http://localhost:5173`, callback URL `http://localhost:5173/api/auth/callback/github`).

```bash
# Terminal 1
cd backend
cp .env.example .env   # fill in your values
npm i
npm run dev            # http://localhost:3001

# Terminal 2
cd frontend
npm i
npm run dev            # http://localhost:5173
```

`npm run typecheck` checks the types in both folders.
