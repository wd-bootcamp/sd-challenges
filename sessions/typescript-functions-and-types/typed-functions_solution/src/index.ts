import type { Grade, Student } from "./types";

function add(a: number, b: number): number {
  return a + b;
}

const addArrow = (a: number, b: number): number => a + b;

type MathOperation = (a: number, b: number) => number;

const subtract: MathOperation = (a, b) => a - b;
const multiply: MathOperation = (a, b) => a * b;

function addExam(student: Student, grade: Grade): boolean {
  student.grades.push(grade);
  return true;
}

function getAverage(grades: Grade[]): number | undefined {
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

const doubled = [1, 2, 3].map((n) => n * 2); // number[]
const longWords = ["apple", "banana", "kiwi"].filter((w) => w.length > 5); // string[]

const anton: Student = {
  firstName: "Anton",
  lastName: "Meier",
  age: 17,
  grades: [1, 4],
};

console.log(add(1, 2), addArrow(1, 2), subtract(5, 3), multiply(2, 3));
const grades: Grade[] = [1, 4, "A"];
console.log(addExam(anton, 2), getAverage(grades), getAverage(["A"]));
console.log(doubled, longWords);
