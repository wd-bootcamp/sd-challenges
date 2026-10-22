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

// Step 1: Create a type alias `Grade`
// a) A grade can be one of the numbers 1, 2, 3, 4, 5, 6
//    or one of the letters "A", "B", "C", "D", "F" (American system).
// b) Use `Grade` for the grades in `Student`.
//    Remember: a grade can still be missing (`undefined`).

// Step 2: Check the output
// a) Create a student with a mix of number grades, letter grades and missing grades.
// b) Call `printStudent` with your student. The grades should look like this:
//
//    Grades: A,2,*,F,3,1,B,*,5
//
// c) Did you have to change `printStudent`?

// Step 3: Break it on purpose
// a) Add the grade 7 or "E" to your student.
// b) Read the error message. Which types does TypeScript allow here?
// c) Remove the wrong grade again.

// Step 4: Move `Student` and `Grade` into their own file `src/types.ts`, export them
// and import them here with `import type { ... } from "./types";`.
