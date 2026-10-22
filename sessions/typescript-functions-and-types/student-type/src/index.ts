// Step 1: Create a type and a student
// a) Define a type `Student` with these properties:
//    - `firstName`
//    - `lastName`
//    - `age`
//    - `grades` (a list of numbers, e.g. [1, 4, 3])
// b) Create a student of type `Student` with some example data.

// Step 2: Print the student
// a) Write a function `printStudent(student: Student): void`.
// b) It should print the student exactly like this:
//
//    Anton Meier (17)
//    ==============================
//    Grades: 1,4,3,1,3,2,1,2
//
//    The second line always has exactly 30 "=" characters.
//    Tip: You don't have to type all 30 "=" by hand. Look up the string method `repeat()`.
// c) Call `printStudent(student)` to check your output.

// Step 3: Some students were absent, so a grade can be missing.
// a) Change the `grades` type so that a grade can also be `undefined`.
// b) Add some `undefined` grades to the student.
// c) Update `printStudent` so that missing grades are printed as "*":
//
//    Grades: 1,2,*,3,1,4,*,5
//
//    Tip: Check your output carefully. TypeScript won't tell you if it looks wrong.

// Step 4: Print several students
// a) Create two more students.
// b) Write a function `printAllStudents(students: Student[]): void`
//    that prints every student in the list. Reuse `printStudent` for this.
// c) Call `printAllStudents` with all three students.
