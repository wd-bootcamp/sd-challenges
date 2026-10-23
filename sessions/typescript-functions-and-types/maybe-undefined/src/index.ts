// Step 1: Write a function `printScore` that takes a `score` of the type `number | undefined`
// (a number or `undefined`) and prints it with one decimal place, for example "Score: 87.5".
// Use `score.toFixed(1)` for the decimal place. Don't call the function yet.
// Read the error message. What could go wrong at runtime if TypeScript didn't warn you?

// Step 2: Fix the error with an `if` check:
// If the score is `undefined`, print "Score: n/a". Otherwise, print the score with one decimal place.
// Hover over `score` inside the `if` branch and inside the `else` branch. Which type does it have in each?

// Step 3: Call `printScore` with 87.5 and with `undefined`.
// Then try to call it with the string "high". Read the error message and remove the line again.

// Step 4: Write a function `describeStudent` that takes a `name` (string) and an optional `age` (number).
// It returns "Max (17)" if there is an age, and just "Max" if there is none.
// Hint: Search for "TypeScript optional parameter" to find out how to mark a parameter as optional.
// a) Hover over `age` in the first line of the function body: Which type does it have?
// b) Call `describeStudent` with and without an age.
//    What happens if you call it without any arguments? Read the error message and remove the line again.

// Step 5: Create an array `scores` with the values 80, 95, `undefined` and 60.
// a) Hover over `scores`: Which type does TypeScript infer by itself?
// b) Print every score with `printScore`, using a loop.

// Question: What does `number | undefined` tell you when you read the signature of `printScore`?
// Why is the error message from step 1 helpful, even though it feels annoying?
// Answer:
