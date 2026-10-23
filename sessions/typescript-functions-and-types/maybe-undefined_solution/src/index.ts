// Step 1 + 2
function printScore(score: number | undefined): void {
  // console.log(`Score: ${score.toFixed(1)}`); // Error: 'score' is possibly 'undefined'.
  if (score === undefined) {
    // Hover: `score` is `undefined` here
    console.log("Score: n/a");
  } else {
    // Hover: `score` is `number` here
    console.log(`Score: ${score.toFixed(1)}`);
  }
}
// Step 1: Without the check, `printScore(undefined)` would crash at runtime with
// "TypeError: Cannot read properties of undefined (reading 'toFixed')".
// Step 2: Inside the branches, TypeScript knows which type is left. This is called narrowing.

// Step 3
printScore(87.5);
printScore(undefined);
// printScore("high"); // Error: Argument of type 'string' is not assignable to parameter of type 'number'.
// (The message only mentions `number`, but `undefined` is allowed as well, as the call above shows.)

// Step 4
function describeStudent(name: string, age?: number): string {
  // Hover: `age` is `number | undefined` here
  if (age === undefined) {
    return name;
  }
  return `${name} (${age})`;
}

console.log(describeStudent("Max", 17));
console.log(describeStudent("Max"));
// describeStudent(); // Error: Expected 1-2 arguments, but got 0.

// Step 5
const scores = [80, 95, undefined, 60]; // inferred as (number | undefined)[]

for (const score of scores) {
  printScore(score);
}

// Answer: `number | undefined` tells you that the function can be called without a score
// and that it has to deal with that case. The error in step 1 is helpful because it shows the
// crash before the code runs: in plain JavaScript you would only find out when a user hits it.
