// Step 1
function greet(name: string): string {
  // d) return 42; // Error: Type 'number' is not assignable to type 'string'.
  return `Hello, ${name}!`;
}

console.log(greet("Anna"));

// Step 2
function isAdult(age: number): boolean {
  return age >= 18;
}

console.log(isAdult(17), isAdult(18));

// Step 3
// The function doesn't return anything, so its return type is `void`.
function printFullName(firstName: string, lastName: string): void {
  console.log(`${firstName} ${lastName}`);
}

printFullName("Anna", "Meier");

// Step 4
const double = (n: number): number => n * 2;

console.log(double(4));

// Step 5
// a) double("5"); // Error: Argument of type 'string' is not assignable to parameter of type 'number'.
// b) printFullName("Anna"); // Error: Expected 2 arguments, but got 1.
// c) greet("Anna", "Ben"); // Error: Expected 1 arguments, but got 2.
// d) see in `greet` above

// Step 6
// a) Without the return type, TypeScript infers `boolean` from `age >= 18`.
//    (A function without a `return` gets the inferred return type `void`.)
// b) Without the parameter type, TypeScript shows:
//    Parameter 'age' implicitly has an 'any' type.
//    It can't guess the type, because it has nothing to look at: the function doesn't know how it will be called.
//
// Answer: TypeScript guesses types from values: the type of a variable from its value
// and the return type of a function from its `return` statements.
// It can't guess parameters. You always have to write those yourself.
// Writing the return type anyway is still a good idea: TypeScript then warns you
// if the function returns something else than you intended (step 5d).
