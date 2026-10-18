import type { Student } from "./types";

function printStudent(student: Student): void {
  const title = `${student.firstName} ${student.lastName} (${student.age})`;
  console.log(title);
  console.log("=".repeat(30));
  const grades = student.grades.map((grade) =>
    grade === undefined ? "*" : grade
  );
  console.log(`Grades: ${grades.join(",")}`);
}

const anton: Student = {
  firstName: "Anton",
  lastName: "Meier",
  age: 17,
  grades: ["A", 2, "F", 3, undefined],
};

// grades: ["G"] // Error: Type '"G"' is not assignable to type 'Grade | undefined'.
// grades: [7] // Error: Type '7' is not assignable to type 'Grade | undefined'.

printStudent(anton);
