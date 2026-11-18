# Databases and MongoDB: Reading List Database

You set up your own MongoDB Atlas cluster, load the Reading List into it and work with the data by hand in MongoDB Compass. There is no app and no code to write in this project. The database you build here is the one the Express server connects to in the next session.

This README describes the whole task. Read it completely before you start.

## What is in the starter

- `books.json`: ten books as a JSON array, ready for import. Each book has `title`, `author`, `status` (`want-to-read`, `reading` or `done`), `rating` (1 to 5 or `null`) and `notes`.

The file has **no `id` or `_id` field on purpose**. MongoDB creates a unique `_id` (an ObjectId) for every document it stores. Do not add ids to the file.

## Rules

- Work in **Compass**. Use the Atlas UI where a task says so.
- **Keep your secrets out of everything you share.** The password of your database user and your connection string must not appear in a file in a Git repository, in a screenshot, in a chat message, or in a prompt to Claude Code.
- Run a filter, then **read the result** before you go on. Look at the number of documents Compass shows (for example `1 – 4 of 4`).
- Do the tasks **in order**. Later tasks expect the changes of earlier tasks. If you break your data, delete the collection, create it again and import the file again (task 3).
- Write your filters in a text file (for example `filters.txt`, outside any Git repository or in one that has a `.gitignore` entry for it, and **without** the password).

## Part 1: Set up

### Task 1: Atlas cluster

1. Create a MongoDB Atlas account.
2. Create a **free** cluster (M0). Choose a region close to you.
3. Create a **database user** with read and write access. Write down username and password.
4. Add a **network access** entry so that your computer can connect.
5. Click **Connect** and copy the connection string.

You are done when you have a connection string and replaced the password placeholder in your own copy.

### Task 2: Connect with Compass

Install Compass, add a new connection with your connection string, and connect.

You are done when the sidebar lists the databases of your cluster.

### Task 3: Import the data

Create the database `reading-list` with the collection `books`. Import `books.json` with "Add Data" and "Import JSON or CSV file". Choose the file type JSON.

Check:

- Compass shows `1 – 10 of 10`.
- Open one document. Which field did MongoDB add? What is its type?

Import the file **once**. If you see `1 – 20 of 20`, delete the collection, create it again and import once.

## Part 2: Read

Use the filter bar and, where needed, **Options** (Project, Sort, Limit). Write down the filter you used and the result.

4. How many books are in the collection?
5. Which books have the status `done`? Show only the titles, sorted alphabetically (no `_id`).
6. How many books have a rating of 4 or higher?
7. Which books are not rated (`rating` is `null`)? Show only the titles, sorted alphabetically.
8. Which books have a title that starts with `The `? Show only the titles, sorted alphabetically.
9. How many books are currently `reading` or `want-to-read`? Use one filter with `$in`.
10. Which are the three best-rated books? Ignore unrated books. Sort by rating (highest first), then by title. Show title and rating (no `_id`).
11. Which books have the status `done` **and** a rating of 4 or higher? Show title and rating, sorted by title.
12. Find the book whose author contains "tolkien", ignoring upper and lower case. Show title and author.
13. Filter for `{ rating: "5" }` (with quotes). What do you get? Why is there no error? Then fix the filter.

## Part 3: Write

14. Add the book _Piranesi_ by Susanna Clarke with "Insert document". It is `want-to-read`, has no rating (`null`) and empty notes (`""`).
15. Add two books with **one** insert (an array in the JSON view):
    - _The Left Hand of Darkness_ by Ursula K. Le Guin, status `done`, rating `5`, notes `"Read for book club."`
    - _Circe_ by Madeline Miller, status `reading`, rating `null`, notes `""`

    How many books are in the collection now?

16. You finished _Neuromancer_ and give it 4 stars. Edit the document: status `done`, rating `4`. Check that the rating is a number and not a string. How many books are `done` now?
17. Add the field `priority` with the value `"high"` to the book _The Name of the Wind_. Which filter shows all books that have the field `priority`?
18. Delete the book _Gone Girl_. Run the filter first, so you are sure it shows exactly one book. How many books are left?

## Part 4: Atlas UI and comparison

19. In the **Atlas UI** ("Browse Collections"), find _Dune_ with a filter and change its notes to `"Re-read in 2026."`. Refresh Compass and check that the change is there.
20. In your own words: what is the difference between Compass and the Atlas UI? When do you use which?
21. Show the final list in Compass: title and status of all books, sorted by title (no `_id`).

## Review your result

Check before you say you are done:

- Is your connection string or password in a file, a screenshot or a message? If it ever was, change the password of the database user in Atlas.
- Which actions in Compass cannot be undone? How did you check before you deleted?
- Which tasks gave the same result in a different order without a sort?
- Does your IP access list allow more than you need? Why did you choose it?

## Bonus

- **`$or`:** find books that are `done` **or** have the word "the" in the notes.
- **Schema tab:** open the **Schema** tab of the collection and click "Analyze Schema". Which types does `rating` have? Why are there two?
- **Export:** export your collection as a JSON file with "Export Collection". Compare it with `books.json`. What is different?
- **Embedded or referenced notes:** a reader wants several dated notes per book. Sketch one book document with an array of notes and a second design with a separate `notes` collection that points to the book. Write down when you would choose which.
