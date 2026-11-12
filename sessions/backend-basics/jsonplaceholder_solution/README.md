# Backend Basics: JSONPlaceholder (Solution)

This collection contains one request for every task, including assertions that check the status code and the most important body values.

Open it with Bruno (**Open Collection**), select the environment `JSONPlaceholder` and run it with the **Runner**. All requests should pass.

Observations:

- `GET /posts/9999` returns `404` with an empty object.
- `GET /posts?userId=3` returns 10 posts. `/posts/1/comments` and `/comments?postId=1` return the same 5 comments.
- `POST /posts` returns `201`, a `Location` header and `id: 101`. `GET /posts/101` returns `404`, because JSONPlaceholder does not store anything.
- `PUT` returns the sent object. `PATCH` returns the whole post with only the `title` changed. `DELETE` returns `200` and an empty object (a well designed API might return `204`).
- Without `Content-Type: application/json` the server cannot read the JSON body and returns a strange response.
- `POST /posts/1` returns `404`. By convention `405 Method Not Allowed` would fit better.
