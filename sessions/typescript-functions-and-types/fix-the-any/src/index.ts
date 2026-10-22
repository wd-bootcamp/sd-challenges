// This code has no type errors, but it is full of problems.

// Step 1: Find the problem
// a) Run the code with `npm run start`. (It is expected to crash.)
// b) What happens, and why doesn't TypeScript warn you?

// Step 2: Replace `any`
// a) Create a type alias `User` and use it instead of `any`.
// b) Which lines now show errors? Fix them.

// Step 3: Optional name
// a) Make `name` optional in `User`.
// b) Handle the case that `name` is missing in the function.
// c) Hover over the function: what is the return type now?

// Step 4: Reflect
// Explain in your own words (as a comment below) why `any` is a bad fix for type errors.

function getFirstName(user: any) {
  return user.name.split(" ")[0];
}

console.log(getFirstName({ name: "Max Muster" }));
console.log(getFirstName({ firstName: "Max" }));
console.log(getFirstName(undefined));
