let age: number = 25;
let score: number = 0;
const username: string = "Alex";
const isAdmin: boolean = false;

console.log("age:", age);
console.log("score:", score);
console.log("username:", username);
console.log("isAdmin:", isAdmin);

// age = "twenty"; // Error: Type 'string' is not assignable to type 'number'.

let level = 1; // inferred as number
// level = "high"; // Error: Type 'string' is not assignable to type 'number'.
