import type { Grade, Student } from "./types";

// Step 1: Function declaration
// a) Write a function `add` with the `function` keyword.
//    It takes two numbers and returns their sum.
// b) Type both parameters and the return value.
// c) Call it and log the result.

// Step 2: Arrow function
// a) Write the same function as an arrow function and store it in a constant `addArrow`.
// b) Type both parameters and the return value again.
// c) Call it and log the result.

// Step 3: Function type
// a) Create a type alias `MathOperation` for a function that takes two numbers
//    and returns a number.
// b) Use `MathOperation` to write `subtract` and `multiply` as arrow functions.
//    Hover over the parameters: which type do they have?
// c) Call both functions and log the results.

// Step 4: Add an exam grade
// a) Write a function `addExam(student: Student, grade: Grade): boolean`.
// b) It adds the grade to the student's grades and returns `true`.
// c) Try to call `addExam` with the grade 7. What happens?
// d) Optional: Types only exist while you write code. If the grade came from a form
//    at runtime, it could still be invalid. Check if the grade is valid anyway
//    and return `false` without adding it if it isn't.

// Step 5: Calculate the average
// a) Write a function `getAverage(grades: (Grade | undefined)[]): number | undefined`.
// b) It only uses the number grades (ignore letters and missing grades)
//    and returns their average.
// c) If there are no number grades, it returns `undefined`.
// d) Test it with `anton.grades` and with an array that only contains letters.

// Step 6: Typed array methods
// a) Create an array of numbers and use `.map` to double them.
// b) Create an array of words and use `.filter` to keep the words with more than 5 letters.
// c) Hover over both results: which types does TypeScript infer?
