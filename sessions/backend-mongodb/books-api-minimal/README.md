# Backend MongoDB: Books API Minimal

The solution of challenge 1 (minimal CRUD). Compared with `books-api-read`, `src/store/mongoBooksStore.ts` has `get`, `create`, `replace` and `remove` with `findById`, `create`, `findByIdAndUpdate` (with `returnDocument: "after"`) and `findByIdAndDelete`.

It works for the happy path. These cases are still wrong: `GET`, `PUT` and `DELETE` with a malformed id (`abc`, `12345`) are a 500, and a search with regular expression characters (`?q=(`) fails. The optional challenges 2 to 5 fix them, the result is `books-api-solution`.

```bash
npm i
cp .env.example .env   # then put your connection string into .env
npm start
```
