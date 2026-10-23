// Step 1
let city = "Berlin"; // string
let population = 3_700_000; // number
let isCapital = true; // boolean
const hobbies = ["climbing", "reading"]; // string[]
const grades = [1, 3, 2]; // number[]
const student = { name: "Max", age: 22 }; // { name: string; age: number }
// Note: `const` only protects the variable itself. The properties of an object and the elements of an array can still change,
// so TypeScript uses the general types `string` and `number` for them.

// Step 2
const firstHobby = hobbies[0]; // string
const gradeCount = grades.length; // number
const shout = city.toUpperCase(); // string

// Step 3
const language = "TypeScript"; // "TypeScript"
let framework = "React"; // string
// Answer: A `const` primitive can never change, so TypeScript can be exact: `language` can only ever be "TypeScript"
// (a so-called literal type). A `let` variable may get a new value later, so TypeScript uses the general type `string`.
// You will work with literal types in the next session.

// Step 4
const mixed = [1, "two", 3]; // (string | number)[]
// The `|` means "or": the array may hold strings or numbers. It is called a union type (next session).

// Step 5
// city = 42; // Error: Type 'number' is not assignable to type 'string'.
// city = "Hamburg"; // ok
// hobbies.push(3); // Error: Argument of type 'number' is not assignable to parameter of type 'string'.
// grades[0] = "A"; // Error: Type 'string' is not assignable to type 'number'.
// student.age = "23"; // Error: Type 'string' is not assignable to type 'number'.
// student.email = "max@example.com"; // Error: Property 'email' does not exist on type '{ name: string; age: number; }'.
// language = "JavaScript"; // Error: Cannot assign to 'language' because it is a constant.
// framework = "Vue"; // ok
// mixed.push(true); // Error: Argument of type 'boolean' is not assignable to parameter of type 'string | number'.
// Note: The `language` error is not a type error. It is the same error JavaScript would throw for a reassigned `const`.

// Step 6
const tags: string[] = [];
// tags.push(1); // Error: Argument of type 'number' is not assignable to parameter of type 'string'.

// Answer 1: The annotation `: string[]`. The empty array `[]` contains no value, so there is nothing TypeScript could infer
// the element type from. With `hobbies` it looks at the strings inside the array.
// Answer 2: You can leave it out whenever the variable gets its value right away: TypeScript infers the type from the value.
// You need it when there is no value to infer from, like an empty array or a variable that is declared first and filled later.
