# Backend Basics: Watchlist (Solution)

This collection contains one request for every task, including assertions that check the status code and the most important body values.

Open it with Bruno (**Open Collection**), select the environment `Watchlist` and change the variable `key` from `CHANGE-ME` to your own key. Run the collection with the **Runner**. All requests should pass. The first request resets your watchlist, so you can run the collection again at any time.

Observations:

- `GET /movies/9999` returns `404` with an error message.
- `GET /movies?watched=false` returns 3 movies. `GET /movies/1/notes` returns 1 note.
- `POST /movies` returns `201`, a `Location` header and the new `id` (6). Sending it again creates another movie with the `id` 7: `POST` is not idempotent.
- `PUT` without `watched` returns `400` with the list of problems in `details`. `PATCH` changes only the fields you send.
- `DELETE` returns `204`. The second `DELETE` returns `404`: the state is the same ("the movie is gone"), the response differs.
- Without `Content-Type: application/json` the server answers `415`. A body that is not valid JSON or misses a field answers `400`.
- `POST /movies/1` returns `405` and the `Allow` header lists the methods that work.
