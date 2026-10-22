import type { Grade, Student } from "./types";

const students: Student[] = [
  {
    firstName: "Florian",
    lastName: "Weber",
    age: 14,
    subjects: [
      { name: "Sport", grades: ["A", 1, undefined] },
      { name: "Art", grades: [3, 2, 4, 5] },
      { name: "Math", grades: [1, 2, "A"] },
    ],
  },
  {
    firstName: "Lena",
    lastName: "Schmidt",
    age: 15,
    subjects: [
      { name: "Sport", grades: [2] },
      { name: "Math", grades: [1] },
    ],
  },
];

// Step 1

function formatGrades(grades: (Grade | undefined)[]): string {
  return grades.map((grade) => (grade === undefined ? "*" : grade)).join(",");
}

function printStudent(student: Student): void {
  console.log(`${student.firstName} ${student.lastName} (${student.age})`);
  console.log("=".repeat(30));
  console.log("");
  console.log("Grades:");
  student.subjects.forEach((subject) => {
    console.log(`${subject.name}: ${formatGrades(subject.grades)}`);
  });
  console.log("");
}

students.forEach((student) => printStudent(student));

// Step 2
// Our decisions:
// - Missing grades (`undefined`) are ignored.
// - Letter grades are ignored, because there is no exact conversion to numbers.
// - We show both ways to calculate the overall average (see below).

function getAverage(numbers: number[]): number | undefined {
  if (numbers.length === 0) {
    return undefined;
  }
  let sum = 0;
  numbers.forEach((number) => {
    sum += number;
  });
  return sum / numbers.length;
}

function getNumberGrades(student: Student): number[] {
  const numberGrades: number[] = [];
  student.subjects.forEach((subject) => {
    subject.grades.forEach((grade) => {
      if (typeof grade === "number") {
        numberGrades.push(grade);
      }
    });
  });
  return numberGrades;
}

function getStudentAverage(student: Student): number | undefined {
  return getAverage(getNumberGrades(student));
}

// Option A: every grade counts the same
// → students with many grades have more influence
function getAverageOfAllGrades(students: Student[]): number | undefined {
  const allGrades: number[] = [];
  students.forEach((student) => {
    getNumberGrades(student).forEach((grade) => allGrades.push(grade));
  });
  return getAverage(allGrades);
}

// Option B: every student counts the same
function getAverageOfStudents(students: Student[]): number | undefined {
  const averages: number[] = [];
  students.forEach((student) => {
    const average = getStudentAverage(student);
    if (average !== undefined) {
      averages.push(average);
    }
  });
  return getAverage(averages);
}

students.forEach((student) => {
  console.log(`${student.firstName}: ${getStudentAverage(student)}`);
});
console.log(`All grades: ${getAverageOfAllGrades(students)}`);
console.log(`All students: ${getAverageOfStudents(students)}`);
