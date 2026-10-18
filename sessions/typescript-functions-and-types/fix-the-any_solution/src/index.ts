type User = { name?: string };

function getFirstName(user: User): string | undefined {
  if (user.name === undefined) {
    return undefined;
  }
  return user.name.split(" ")[0];
}

console.log(getFirstName({ name: "Max Muster" }));
console.log(getFirstName({}));

// Step 1: The second and third call crash at runtime ("Cannot read properties of undefined"),
// but TypeScript doesn't warn because `any` turns off all checks for `user`.
// Step 2: With `type User = { name: string }` the second and third call are errors:
// { firstName: "Max" } has no `name`, and undefined is not a `User`.
// Step 3: The return type is `string | undefined`, so callers have to handle the missing name.
// Step 4: `any` removes the checks that would have found the bug. The error disappears,
// the bug stays and surfaces later at runtime.
