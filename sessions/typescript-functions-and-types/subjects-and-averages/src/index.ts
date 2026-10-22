import type { Student } from "./types";

// Step 1: Grades per subject
// a) Restructure `Student` in `types.ts` so that grades belong to subjects
//    (e.g. Sport, Art, Math). There is more than one good solution.
// b) Add at least two students to the `students` array.
//    Give them different subjects and a different number of grades.
// c) Copy `printStudent` from the previous challenge and update it,
//    so that it prints the grades per subject, for example:
//
//    Florian Weber (14)
//    ==============================
//
//    Grades:
//    Sport: A,1,*
//    Art: 3,2,4,5
//    Math: 1,2,A
//
// d) Print all students.

// Step 2: Averages
// a) Calculate the average grade for each student.
// b) Calculate the average grade for the entire list of students.
// c) Decide together:
//    - How do you handle missing grades (`undefined`)?
//    - How do you handle letter grades?
//    - Should a student with many grades count more than a student with only a few?
//    Write your decisions as comments.

const students: Student[] = [];

console.log(students);
