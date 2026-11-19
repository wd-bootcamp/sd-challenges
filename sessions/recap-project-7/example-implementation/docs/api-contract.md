# API Contract

The backend runs on `http://localhost:3001`. Base path `/api`. Only JSON.

```ts
type Todo = {
  id: string; // the MongoDB ObjectId as a string
  title: string;
  done: boolean;
};
```

A response contains exactly these three fields: no `_id` and no `__v`.

| Method and path         | Body                  | Success                  | Errors                                               |
| ----------------------- | --------------------- | ------------------------ | ---------------------------------------------------- |
| `GET /api/health`       |                       | 200 `{ "status": "ok" }` |                                                      |
| `GET /api/todos`        |                       | 200 `Todo[]`             |                                                      |
| `POST /api/todos`       | `{ "title": "..." }`  | 201 `Todo`               | 400 `{ "error": "<message>" }`                       |
| `PUT /api/todos/:id`    | `{ "title", "done" }` | 200 `Todo`               | 400 `{ "error": "<message>" }`, 404 `Todo not found` |
| `DELETE /api/todos/:id` |                       | 204, no body             | 404 `{ "error": "Todo not found" }`                  |
| any other route         |                       |                          | 404 `{ "error": "Not found" }`                       |

- `POST` creates a todo with `done: false`. The title is trimmed. A missing or empty title gives 400.
- `PUT` replaces `title` and `done`. Always send both, also when you only change one of them.
- A body that is not valid JSON gives 400. An `id` that is not a valid ObjectId gives 404.
- All errors look like `{ "error": "<message>" }`. An unexpected error gives 500 `{ "error": "Internal server error" }` without details.

## Examples

```http
POST /api/todos
{ "title": "Buy milk" }

201
{ "id": "6aff79b9cd3147d2599d2f45", "title": "Buy milk", "done": false }
```

```http
PUT /api/todos/6aff79b9cd3147d2599d2f45
{ "title": "Buy oat milk", "done": true }

200
{ "id": "6aff79b9cd3147d2599d2f45", "title": "Buy oat milk", "done": true }
```

```http
POST /api/todos
{ "title": "" }

400
{ "error": "A todo needs a title, and done must be true or false" }
```
