import type { Student } from "./types";

// 1. Parameters and return types
function add(a: number, b: number): number {
  return a + b;
}

// add(1, "2"); // Error: Argument of type 'string' is not assignable to parameter of type 'number'.
// add(1); // Error: Expected 2 arguments, but got 1.

const multiply = (a: number, b: number): number => a * b;

function logGrade(grade: number): void {
  console.log(`Grade: ${grade}`);
}

console.log(add(1, 2), multiply(2, 3));
logGrade(2);

// 2. Typed array methods
const names: string[] = ["Anna", "Ben", "Christopher"];
const lengths = names.map((name) => name.length); // number[]
const long = names.filter((name) => name.length > 3); // string[]
// names.map((name) => name.toFixed(2)); // Error: Property 'toFixed' does not exist on type 'string'.

console.log(lengths, long);

// 3. undefined and any
// const counter = undefined;
// const next = counter + 1; // Error: 'counter' is possibly 'undefined'.

// let data: any = "text";
// data.toFixed(2); // no error in the editor, crashes at runtime

// 4. Union types and narrowing
function printGrade(grade: number | undefined): void {
  if (grade === undefined) {
    console.log("*");
  } else {
    console.log(grade.toFixed(1)); // grade is a number here
  }
}

printGrade(2);
printGrade(undefined);

function greet(name: string, title?: string): string {
  return title ? `Hello ${title} ${name}` : `Hello ${name}`;
}

console.log(greet("Max"), greet("Max", "Dr."));

// 5. Type aliases
const anton: Student = {
  firstName: "Anton",
  lastName: "Meier",
  age: 17,
  grades: [1, 4, undefined, 3],
};

function printStudent(student: Student): void {
  console.log(`${student.firstName} ${student.lastName} (${student.age})`);
}

printStudent(anton);

type Role = "student" | "coach" | "admin";
const role: Role = "coach";
// const invalid: Role = "teacher"; // Error: Type '"teacher"' is not assignable to type 'Role'.

type MathOperation = (a: number, b: number) => number;
const subtract: MathOperation = (a, b) => a - b;

console.log(role, subtract(5, 3));
