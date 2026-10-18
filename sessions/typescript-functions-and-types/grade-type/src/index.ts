type Student = {
  firstName: string;
  lastName: string;
  age: number;
  grades: (number | undefined)[];
};

function printStudent(student: Student): void {
  const title = `${student.firstName} ${student.lastName} (${student.age})`;
  console.log(title);
  console.log("=".repeat(30));
  const grades = student.grades.map((grade) =>
    grade === undefined ? "*" : grade
  );
  console.log(`Grades: ${grades.join(",")}`);
}

// Step 1: Create a type alias `Grade`. Besides the numbers 1 to 6 it also allows
// the letters "A" to "F" (American system). Use it in `Student`.

// Step 2: Make sure `printStudent` still prints all grades, e.g. "A,2,F,3,1,B,2,5".

// Step 3: Try to put "G" or 7 into the grades. Read the error message, then remove it again.

// Step 4: Move `Student` and `Grade` into their own file `types.ts`, export them
// and import them here with `import type { ... } from "./types";`.
