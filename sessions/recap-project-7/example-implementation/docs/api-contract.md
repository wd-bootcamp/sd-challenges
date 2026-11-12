# API contract: Reading List

Base path `/api`, JSON only, development port `3001`. This file is the contract between the backend and the frontend. If the code and this file disagree, fix one of them.

## Data model

```ts
type Status = "want-to-read" | "reading" | "done";

type Book = {
  id: string; // MongoDB ObjectId as hex string
  title: string;
  author: string;
  status: Status;
  rating: number | null; // integer 1 to 5, null = not rated
  notes: string;
};
```

Responses contain exactly these fields: no `_id`, no `__v`, no timestamps.

## Endpoints

| Method and path         | Success                   | Errors                                               |
| ----------------------- | ------------------------- | ---------------------------------------------------- |
| `GET /api/health`       | 200 `{ "status": "ok" }`  |                                                      |
| `GET /api/books`        | 200 `Book[]`              | 400 for an unknown `status` or a repeated `q`        |
| `GET /api/books/count`  | 200 `{ "count": number }` |                                                      |
| `GET /api/books/:id`    | 200 `Book`                | 404 `{ "error": "Book not found" }`                  |
| `POST /api/books`       | 201 `Book`                | 400 `{ "error": "<message>" }`                       |
| `PUT /api/books/:id`    | 200 `Book`                | 400 `{ "error": "<message>" }`, 404 `Book not found` |
| `DELETE /api/books/:id` | 204, no body              | 404 `{ "error": "Book not found" }`                  |
| any other route         |                           | 404 `{ "error": "Not found" }`                       |

All errors have the shape `{ "error": "<message>" }`. A request body that is not valid JSON gets 400. Unexpected server errors get 500 `{ "error": "Internal server error" }` without details.

### `GET /api/books`

Optional query parameters, which can be combined:

- `status`: `want-to-read`, `reading` or `done`
- `q`: text that the title contains. Case-insensitive, trimmed. An empty `q` means no filter.

```bash
curl "http://localhost:3001/api/books?status=reading&q=hail"
```

```json
[
  {
    "id": "6650f1c2a1b2c3d4e5f60718",
    "title": "Project Hail Mary",
    "author": "Andy Weir",
    "status": "reading",
    "rating": null,
    "notes": "Hard to put down."
  }
]
```

### `POST /api/books` and `PUT /api/books/:id`

Body: `{ title, author, status?, rating?, notes? }`. `PUT` replaces all editable fields: a field that is missing gets its default, like in `POST`.

| Field    | Rule                                     | Default        |
| -------- | ---------------------------------------- | -------------- |
| `title`  | required, text, not empty after trimming |                |
| `author` | required, text, not empty after trimming |                |
| `status` | `want-to-read`, `reading` or `done`      | `want-to-read` |
| `rating` | `null` or an integer from 1 to 5         | `null`         |
| `notes`  | text                                     | `""`           |

Other fields in the body (for example `id`) are ignored.

```bash
curl -X POST http://localhost:3001/api/books \
  -H "Content-Type: application/json" \
  -d '{"title":"Piranesi","author":"Susanna Clarke"}'
```

```json
{
  "id": "6650f1c2a1b2c3d4e5f60719",
  "title": "Piranesi",
  "author": "Susanna Clarke",
  "status": "want-to-read",
  "rating": null,
  "notes": ""
}
```

```json
{ "error": "title is required" }
```

## Beyond the shared Reading List contract

These points are part of the API that students bring from Backend MongoDB. The frontend of Recap Project 7 does not need `count`.

- **Count:** `GET /api/books/count` answers `{ "count": <number> }`.
- **Invalid filters:** an unknown `status` and a repeated `q` (`?q=a&q=b`) answer 400 with a message, not an empty list.
- **Malformed `id`:** an `id` that is not a valid ObjectId answers 404 `Book not found`, like an `id` that does not exist.
- **Unknown body fields:** ignored.
- **Order:** the order of the list is the order of the database (insertion order). The contract does not promise more.
