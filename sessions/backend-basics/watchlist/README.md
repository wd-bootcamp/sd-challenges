# Backend Basics: Watchlist

(difficulty: 🔥🔥)

In this challenge you talk to a real HTTP API without writing any code. You use [Bruno](https://www.usebruno.com/downloads) to send requests to the **Watchlist API** of the [Example APIs](https://example-apis.vercel.app/) (scroll down to "Watchlist") and inspect the responses.

The API is a movie watchlist you can read **and write**. Every person works in their own copy, identified by a **key** in the URL.

## Setup

1. Open Bruno and choose **Open Collection**. Select this folder.
2. In the top right corner, select the environment `Watchlist`.
3. Open the environment settings and change the variable `key` from `CHANGE-ME` to your own key, for example your first name in lowercase (`anna`). Allowed are 3 to 32 characters: lowercase letters, digits and `-`. Pick something that nobody else uses, otherwise you share your data with them. As long as the key is `CHANGE-ME` the API answers with an error.
4. Open the request `Get all movies` and send it. You should see five movies.

> 💡 Your data is deleted after 24 hours without a change. You can reset it any time with `DELETE {{baseUrl}}/{{key}}`.

## Tasks

Create a new request in the collection for each task. Use `{{baseUrl}}/{{key}}` in the URLs. Write down the answers to the questions in a `notes.md` file in this folder.

### Read

1. `GET` the movie with the id `1`.
2. `GET` the movie with the id `9999`.
3. `GET` only the movies that are **not** watched yet using a **query** parameter (`watched`).
4. `GET` the notes of the movie with the id `1` using a **nested path**.

- What differs between the requests 1 and 2 (status code, body)?
- How many movies are not watched yet?
- Why is the filter in the query (`?watched=false`) and the notes in the path (`/movies/1/notes`)?

### Create

5. `POST` a new movie to `{{baseUrl}}/{{key}}/movies`. Use the body type **JSON** with `title` and `year`.
6. Open the **Timeline** of the request and find the request headers that Bruno sent.
7. `GET` the movie with the `id` from the response of step 5.

- Which status code and which `Location` header did you get? Which field did the server add?
- Does step 7 find your movie?
- Send the `POST` request two more times and `GET` all movies. What happened, and what does that say about `POST` and idempotency?

### Update and Delete

8. `PUT` to `{{baseUrl}}/{{key}}/movies/<id>` with a complete movie (`title`, `year` and `watched`).
9. Send the `PUT` again, this time without the field `watched`.
10. `PATCH` the same movie with only `{ "watched": true }`.
11. `DELETE` the movie.
12. `DELETE` the same movie a second time.

- What happens in step 9? Which part of the response tells you what is wrong?
- What is the difference between `PUT` and `PATCH` when you look at the data you had to send?
- Which status codes did you get in step 11 and 12? Is `DELETE` idempotent, even though the status codes differ?

### Break It

13. Copy your `POST` request. Change the body type to **Text** and remove the `Content-Type` header if there is one. Check the Timeline to see what was really sent. What does the server answer?
14. Add the header `Content-Type: application/json` to the text request and send it again.
15. Send a `POST` request without a `year` in the body.
16. Send a `POST` request with a body that is not valid JSON, for example `{ "title": ` (body type **Text**, with the `Content-Type: application/json` header).
17. Send a `POST` request to `{{baseUrl}}/{{key}}/movies/1`.

- What does `Content-Type` tell the server?
- Which status codes do you get in step 13, 15, 16 and 17? Who is to blame in each case, the client or the server?
- Look at the response headers of step 17. Which header tells you what you could have done instead?

## Bonus

Add assertions in the **Assert** tab (for example `res.status` `eq` `200`) and run the whole collection with the **Runner**.
