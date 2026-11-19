# Backend MongoDB: Books API Minimal

The solution of challenge 1 (minimal CRUD). Compared with `books-api-read`, `src/routes/books.ts` has the four missing routes with `findById`, `create`, `findByIdAndUpdate` (with `returnDocument: "after"`) and `findByIdAndDelete`.

There is no input validation, on purpose. Challenge 2 (a clear start) is optional, the result is `books-api-solution`.

```bash
npm i
cp .env.example .env   # then put your connection string into .env
npm start
```
