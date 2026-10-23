// Step 1: Predict the type of each variable below. Write your prediction into the comment,
// THEN hover over the variable in your editor and compare. Mark every wrong prediction with ❌ and think about why.

let city = "Berlin"; // Prediction:
let population = 3_700_000; // Prediction:
let isCapital = true; // Prediction:
const hobbies = ["climbing", "reading"]; // Prediction:
const grades = [1, 3, 2]; // Prediction:
const student = { name: "Max", age: 22 }; // Prediction:

// Step 2: TypeScript also infers types for values that are calculated from other variables. Predict these as well.

const firstHobby = hobbies[0]; // Prediction:
const gradeCount = grades.length; // Prediction:
const shout = city.toUpperCase(); // Prediction:

// Step 3: These two lines look almost the same. Predict their types, then hover. Why are they different?

const language = "TypeScript"; // Prediction:
let framework = "React"; // Prediction:

// Step 4: This array may surprise you. Predict its type, then hover.
// Don't worry about the `|` yet: you will learn its name in the next session.

const mixed = [1, "two", 3]; // Prediction:

// Step 5: Which of these lines cause an error? Write "error" or "ok" behind each line.
// Then remove the `//` of one line after the other and check your prediction. Read every error message.
// Comment the line out again afterwards.

// city = 42; // Prediction:
// city = "Hamburg"; // Prediction:
// hobbies.push(3); // Prediction:
// grades[0] = "A"; // Prediction:
// student.age = "23"; // Prediction:
// student.email = "max@example.com"; // Prediction:
// language = "JavaScript"; // Prediction:
// framework = "Vue"; // Prediction:
// mixed.push(true); // Prediction:

// Step 6: Create an empty array `tags` that may only hold strings.
// Make sure that `tags.push(1)` is an error. Remove the line again afterwards.

// Question: Compared to `hobbies`, which part of the code did you have to add for `tags`? Why can't TypeScript infer it here?
// Answer:

// Question: When can you leave out a type annotation, and when do you need one?
// Answer:
