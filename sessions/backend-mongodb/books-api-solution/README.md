# Backend MongoDB: Books API Solution

The Reading List API with MongoDB (mongoose), after challenge 2. Compared with `books-api-minimal`, these files changed:

- `src/db.ts`: `MONGODB_URI` is checked, the connection fails after 5 seconds, and only the database name is logged.
- `src/index.ts`: stops with a clear message and exit code 1 if the connection fails.

## Run it

```bash
npm i
cp .env.example .env   # then put your connection string into .env
npm start              # API on http://localhost:3001
```
