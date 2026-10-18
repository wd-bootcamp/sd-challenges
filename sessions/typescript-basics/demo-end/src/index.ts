// 1. Why types? JavaScript doesn't complain about these:
// const total = "5" + 1; // "51"
// const person = { name: "Max" };
// console.log(person.nmae); // undefined

// 2. Type annotations
let age: number = 30;
const username: string = "Alex";
let isAdmin: boolean = false;

// age = "thirty"; // Error: Type 'string' is not assignable to type 'number'.

console.log(age, username, isAdmin);

// 3. Type inference
let score = 0; // inferred as number
// score = "high"; // Error: Type 'string' is not assignable to type 'number'.
score = 10;

// 4. Arrays
const grades: number[] = [1, 3, 2];
const names: string[] = ["Anna", "Ben"];

grades.push(4);
// grades.push("A"); // Error: Argument of type 'string' is not assignable to parameter of type 'number'.

console.log(grades, names, score);

// 5. Objects
const student: { name: string; age: number; isEnrolled: boolean } = {
  name: "Max",
  age: 22,
  isEnrolled: true,
};

console.log(student.age);
// console.log(student.nmae); // Error: Property 'nmae' does not exist on type ...
