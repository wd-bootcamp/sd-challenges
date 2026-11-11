# Databases and MongoDB: Reading List Database

You set up your own MongoDB Atlas cluster, load the Reading List into it and answer questions about the data with queries. There is no app and no code to write in this project. The database you build here is the one the Express server connects to in the next session.

This README describes the whole task. Read it completely before you start.

## What is in the starter

- `books.json`: ten books as a JSON array, ready for import. Each book has `title`, `author`, `status` (`want-to-read`, `reading` or `done`), `rating` (1 to 5 or `null`) and `notes`.

The file has **no `id` or `_id` field on purpose**. MongoDB creates a unique `_id` (an ObjectId) for every document it stores. Do not add ids to the file.

## Rules

- Work in `mongosh` for the tasks. Use Compass or the Atlas UI where a task says so, and to look at your data.
- **Keep your secrets out of everything you share.** The password of your database user and your connection string must not appear in a file in a Git repository, in a screenshot, in a chat message, or in a prompt to Claude Code.
- Run a query, then **read the result** before you go on. Check `matchedCount`, `modifiedCount` and `deletedCount`.
- Do the tasks **in order**. Later tasks expect the changes of earlier tasks. If you break your data, delete the collection and import the file again (task 2).
- Write your queries in a text file (for example `queries.txt`, outside any Git repository or in one that has a `.gitignore` entry for it, and **without** the password).

## Part 1: Set up

### Task 1: Atlas cluster

1. Create a MongoDB Atlas account.
2. Create a **free** cluster (M0). Choose a region close to you.
3. Create a **database user** with read and write access. Write down username and password.
4. Add a **network access** entry so that your computer can connect.
5. Connect with `mongosh` and the connection string from the "Connect" dialog.

You are done when `mongosh` shows its prompt and `show dbs` runs without an error.

### Task 2: Import the data

Import `books.json` into the database `reading-list`, collection `books`.

- **With Compass** (recommended): connect with the same connection string, create the database `reading-list` with the collection `books`, open the collection, and use "Add Data" and "Import JSON or CSV file". Choose `books.json` and the format JSON.
- **With `mongoimport`**, if you have the [MongoDB Database Tools](https://www.mongodb.com/docs/database-tools/installation/installation/) installed: `mongoimport --uri "<your connection string>" --db reading-list --collection books --jsonArray --file books.json`.

Check in `mongosh`:

```js
use reading-list
db.books.countDocuments()
```

The result must be `10`. Run `db.books.findOne()` and look at the document. Which field did MongoDB add? What is its type?

Import the file **once**. If the count is `20`, run `db.books.drop()` and import again.

## Part 2: Read

Write the query for each question and note the result.

3. How many books are in the collection?
4. Which books have the status `done`? Show only the titles, sorted alphabetically (no `_id`).
5. How many books have a rating of 4 or higher?
6. Which books are not rated (`rating` is `null`)? Show only the titles, sorted alphabetically.
7. Which books have a title that starts with `The `? Show only the titles, sorted alphabetically.
8. How many books are currently `reading` or `want-to-read`? Use one query with `$in`.
9. Which are the three best-rated books? Ignore unrated books. Sort by rating (highest first), then by title. Show title and rating (no `_id`).
10. Which books have the status `done` **and** a rating of 4 or higher? Show title and rating, sorted by title.
11. Find the book whose author contains "tolkien", ignoring upper and lower case. Show title and author.

## Part 3: Write

12. Add the book _Piranesi_ by Susanna Clarke with `insertOne`. It is `want-to-read`, has no rating (`null`) and empty notes (`""`).
13. Add two books with one `insertMany`:
    - _The Left Hand of Darkness_ by Ursula K. Le Guin, status `done`, rating `5`, notes `"Read for book club."`
    - _Circe_ by Madeline Miller, status `reading`, rating `null`, notes `""`

    How many books are in the collection now?

14. You finished _Neuromancer_ and give it 4 stars. Update **one** document: status `done`, rating `4`. What do `matchedCount` and `modifiedCount` say? Then show the document (no `_id`). How many books are `done` now?
15. Add the field `priority` with the value `"normal"` to **all** books that are `want-to-read`, with one query. How many documents were matched? Which titles have the field now (sorted)?
16. Delete the book _Gone Girl_ with `deleteOne`. How many books are left?

## Part 4: Index

17. Create a **unique** index on `title`. What is the name of the index?
18. Try to insert another book with the title `Dune` (any author). What error do you get? Does the count change?
19. Delete all books with the status `reading` with one query. Check with `find` first which books will be deleted. How many were deleted, and how many books are left?
20. Show the final list: title and status of all books, sorted by title (no `_id`).

## Part 5: Compass and the Atlas UI

21. In **Compass**, run the filter `{ status: "done", rating: { $gte: 4 } }` on the collection. Compare the result with your answer to task 10. Which books are new, and why?
22. In the **Atlas UI** ("Browse Collections"), find _Dune_ with a filter, change its notes to `"Re-read in 2026."` in the UI, and check the change in `mongosh`.
23. In your own words: when do you use `mongosh`, when Compass, when the Atlas UI?

## Review your result

Check before you say you are done:

- Is your connection string or password in a file, a screenshot or a message? If it ever was, change the password of the database user in Atlas.
- Which of your queries could delete or change too much if the filter were empty or wrong? How did you check it first?
- Which tasks gave the same result in a different order without `sort`?
- Did you check the counts (`matchedCount`, `deletedCount`) and not just assume the update worked?
- Does your IP access list allow more than you need? Why did you choose it?

## Bonus

- **Embedded or referenced notes:** a reader wants several dated notes per book. Sketch one book document with an array of notes and a second design with a separate `notes` collection that points to the book. Write down when you would choose which.
- **`$or`:** find books that are `done` **or** have the word "the" in the notes.
- **Explain:** use `.explain("executionStats").executionStats.totalDocsExamined` on `db.books.find({ title: "Dune" })`. Compare the number with and without the index on `title`. With ten books, what does that tell you about when an index matters?
- **Upsert:** read about the `upsert` option of `updateOne`, and add a book with it that does not exist yet.
