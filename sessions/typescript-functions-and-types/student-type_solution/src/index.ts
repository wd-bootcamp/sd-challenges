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

printStudent({
  firstName: "Anton",
  lastName: "Meier",
  age: 16,
  grades: [1, 4, 3, 1, undefined],
});

function printAllStudents(students: Student[]): void {
  students.forEach((student) => printStudent(student));
}

printAllStudents([
  {
    firstName: "Anton",
    lastName: "Meier",
    age: 16,
    grades: [1, 4, 3, 1, undefined],
  },
  {
    firstName: "Berta",
    lastName: "Müller",
    age: 17,
    grades: [1, undefined, 1],
  },
]);
