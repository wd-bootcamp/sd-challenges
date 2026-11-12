# Backend Basics: JSONPlaceholder

(difficulty: 🔥🔥)

In this challenge you talk to a real HTTP API without writing any code. You use [Bruno](https://www.usebruno.com/downloads) to send requests to [JSONPlaceholder](https://jsonplaceholder.typicode.com/) and inspect the responses.

## Setup

1. Open Bruno and choose **Open Collection**. Select this folder.
2. In the top right corner, select the environment `JSONPlaceholder`. It defines the variable `baseUrl`.
3. Open the request `Get all posts` and send it.

## Tasks

Create a new request in the collection for each task. Use `{{baseUrl}}` in the URLs. Write down the answers to the questions in a `notes.md` file in this folder.

### Read

1. `GET` the post with the id `1`.
2. `GET` the post with the id `9999`.
3. `GET` all posts of the user with the id `3` using a **query** parameter.
4. `GET` all comments of the post with the id `1` using a **nested path**.
5. `GET` all comments of the post with the id `1` using a **query** parameter on `/comments`.

- What differs between the requests 1 and 2 (status code, body)?
- How many posts does the user with the id `3` have?
- Is the result of 4 and 5 the same? When would you prefer which style?

### Create

6. `POST` a new post to `{{baseUrl}}/posts`. Use the body type **JSON**: `title`, `body` and `userId`.
7. Open the **Timeline** of the request and find the request headers that Bruno sent.
8. `GET` the post with the `id` from the response of step 6.

- Which status code and which `Location` header did you get?
- What happens in step 8? Why? (Read the [guide](https://jsonplaceholder.typicode.com/guide/) of JSONPlaceholder.)
- Send the `POST` request three times. Is the `id` always the same? What does that say about `POST` and idempotency?

### Update and Delete

9. `PUT` to `{{baseUrl}}/posts/1` with a complete post.
10. `PATCH` to `{{baseUrl}}/posts/1` with only a `title`.
11. `DELETE` the post with the id `1`.

- How do the response bodies of `PUT` and `PATCH` differ?
- Which status code does `DELETE` return? Which one would you expect from a well designed API?

### Break It

12. Copy your `POST` request. Change the body type to **Text** and remove the `Content-Type` header. Check the Timeline to see what was really sent. What does the server do with your data?
13. Add the header `Content-Type: application/json` to the text request and send it again.
14. Send a `POST` request to `{{baseUrl}}/posts/1`.
15. Send a `GET` request to `{{baseUrl}}/doesnotexist`.

- What does `Content-Type` tell the server?
- Which status code do you get in step 14? Which one would the HTTP conventions suggest?
- Is the error in step 15 caused by the client or by the server?

## Bonus

Add assertions in the **Assert** tab (for example `res.status` `eq` `200`) and run the whole collection with the **Runner**.
