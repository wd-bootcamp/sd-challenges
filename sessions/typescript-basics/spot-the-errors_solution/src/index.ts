// Snippet 1
const count: number = 3;

// Snippet 2
const names: string[] = ["Anna", "Ben", "42"];

// Snippet 3
const user: { name: string; age: number } = { name: "Max", age: 30 };
console.log(user.name);

// Snippet 4
const counter = 0;
const next = counter + 1;
console.log(next);

console.log(count, names);

// Answer 1: JavaScript has no type checker. Values are only checked when the code runs,
// and even then most of these mistakes don't throw (e.g. "3" stays a string, a missing
// property is just undefined, undefined + 1 is NaN).
// Answer 2: The misspelled or missing property (snippet 3): no error is thrown, you only get wrong values.
