# Backend MongoDB: Books API Minimal

The solution of challenge 1 (minimal CRUD). Compared with `books-api-read`, `src/store/mongoBooksStore.ts` has `get`, `create`, `replace` and `remove` with `findById`, `create`, `findByIdAndUpdate` (with `returnDocument: "after"`) and `findByIdAndDelete`.

It works for the happy path: `npm run check` shows 46 of 52. The six failures are the malformed ids (`GET`, `PUT` and `DELETE` with `abc` or `12345` are a 500) and the search with regular expression characters. The optional challenges 2 to 5 fix them, the result is `books-api-solution`.

```bash
npm i
cp .env.example .env   # then put your connection string into .env
npm start
npm run check
```
