# Reading List

Full-stack reading list: Express API with MongoDB (`backend/`) and a React frontend (`frontend/`). The task and the user stories are in the project README. The API is defined in `docs/api-contract.md`: change the contract file in the same commit as the code.

## Layout

- `backend/`: Express 5, TypeScript, mongoose. Has its own `CLAUDE.md`.
- `frontend/`: React, TypeScript, Vite, shadcn/ui. Has its own `CLAUDE.md`.

## Rules

- Work in one folder per task. Run the commands of that folder's `CLAUDE.md` before you say a task is done.
- Never read or write `.env`. Add new variables to `.env.example` with a placeholder and tell me.
- Never put a secret, token or connection string in the code, a test or a document.
- Never use `npm test` (watch mode). Use `npm run test:run`.
- Do not add dependencies without asking.
- Only do what the current issue asks for. Write other ideas down, do not build them.
