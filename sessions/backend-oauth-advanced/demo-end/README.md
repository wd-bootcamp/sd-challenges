# Backend OAuth Advanced: Demo End

The login with GitHub, now **with MongoDB**: Better Auth saves users and sessions in the database (`mongodbAdapter`). Our own routes load data from there.

```
backend/
  src/auth.ts      MongoClient + database: mongodbAdapter(db)
  src/server.ts    GET /api/me (the user, loaded from the database), GET /api/users (everybody who has logged in)
frontend/
  src/App.tsx      "In our database since …" and the list of all users
```

## Run it

Like `demo-start`, plus `MONGODB_URI` in `backend/.env` (the database name at the end, e.g. `.../github-login-demo`). Open `http://localhost:5173`, log in and look at the collections `user`, `account`, `session` and `verification` in Compass.

**Try:** restart the backend, log out and in again: same user, same `createdAt`. The server remembers you now.
