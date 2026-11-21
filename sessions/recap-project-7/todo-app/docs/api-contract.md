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
| `POST /api/todos`       | `{ "title": "..." }`  | 201 `Todo`               |                                                      |
| `PUT /api/todos/:id`    | `{ "title", "done" }` | 200 `Todo`               | 404 `{ "error": "Todo not found" }`                  |
| `DELETE /api/todos/:id` |                       | 204, no body             | 404 `{ "error": "Todo not found" }`                  |

- `POST` creates a todo with `done: false`. The title is trimmed.
- `PUT` replaces `title` and `done`. Always send both, also when you only change one of them.
- All errors look like `{ "error": "<message>" }`.

### Added by the optional issues

Issue 11 (input validation) and issue 12 (error handling) add these cases. Add them to the table above when you build them.

| Case                                                     | Answer                                                              |
| -------------------------------------------------------- | ------------------------------------------------------------------- |
| `POST` or `PUT` with a missing or empty `title`          | 400 `{ "error": "<message>" }`                                      |
| `PUT` with a `done` that is not `true` or `false`        | 400 `{ "error": "<message>" }`                                      |
| A body that is not valid JSON                            | 400 `{ "error": "<message>" }`                                      |
| An `id` that is not a valid ObjectId                     | 404 `{ "error": "Todo not found" }`                                 |
| any other route                                          | 404 `{ "error": "Not found" }`                                      |
| An unexpected error                                      | 500 `{ "error": "Internal server error" }`, without details         |

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
