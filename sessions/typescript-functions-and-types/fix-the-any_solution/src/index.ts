// Step 1: The first call works and prints "Max". The second call crashes with
// "TypeError: Cannot read properties of undefined (reading 'split')",
// because the object has no `name`. The third call never runs.
// TypeScript doesn't warn us because `any` turns off type checking for `user`.

// Step 2 + 3: `User` with an optional `name`
type User = { name?: string };

// Hover: the return type is now `string | undefined`
function getFirstName(user: User) {
  if (user.name === undefined) {
    return undefined;
  }
  return user.name.split(" ")[0];
}

console.log(getFirstName({ name: "Max Muster" })); // "Max"

// Step 2 b) Errors after replacing `any`:
// - getFirstName({ firstName: "Max" })
//   ❌ Object literal may only specify known properties, and 'firstName' does not exist in type 'User'.
// - getFirstName(undefined)
//   ❌ Argument of type 'undefined' is not assignable to parameter of type 'User'.
// Fix: pass a valid `User` instead. A user without a name is allowed now:
console.log(getFirstName({})); // undefined

// Step 4: `any` turns off type checking for a value. TypeScript doesn't warn us
// anymore, so errors only show up when the code runs, just like in plain JavaScript.
