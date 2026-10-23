import type { Grade, Student } from "./types";

// Step 1
type MathOperation = (a: number, b: number) => number;

// Hover: `a` and `b` are `number`. They get their types from `MathOperation`.
const subtract: MathOperation = (a, b) => a - b;
const multiply: MathOperation = (a, b) => a * b;

console.log(subtract(5, 3), multiply(2, 3));

// Step 2
const anton: Student = {
  firstName: "Anton",
  lastName: "Meier",
  age: 17,
  grades: [1, 3],
};

const validGrades: Grade[] = [1, 2, 3, 4, 5, 6, "A", "B", "C", "D", "F"];

function addExam(student: Student, grade: Grade): boolean {
  // Step 2f (optional): check the value at runtime as well
  if (!validGrades.includes(grade)) {
    return false;
  }
  student.grades.push(grade);
  return true;
}

console.log(addExam(anton, 2)); // true
// addExam(anton, 7); // Error: Argument of type '7' is not assignable to parameter of type 'Grade'.

// Step 2f: A value from a form can't be checked by TypeScript. This simulates one:
console.log(addExam(anton, 7 as unknown as Grade)); // false

// Step 3
const doubled = [1, 2, 3].map((n) => n * 2); // number[]
const longWords = ["apple", "banana", "kiwi"].filter((w) => w.length > 5); // string[]

console.log(doubled, longWords);

// Bonus
function getAverage(grades: (Grade | undefined)[]): number | undefined {
  let sum = 0;
  let count = 0;
  for (const grade of grades) {
    if (typeof grade === "number") {
      sum += grade;
      count++;
    }
  }
  return count === 0 ? undefined : sum / count;
}

console.log(getAverage(anton.grades)); // 2
console.log(getAverage([1, undefined, 3])); // 2
console.log(getAverage(["A", "B"])); // undefined
