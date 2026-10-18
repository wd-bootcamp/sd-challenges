import type { Student } from "./types";

// Step 1: Restructure `Student` in `types.ts` so that grades belong to subjects.
// Print the student with the grades per subject, for example:
//
// Florian Weber (14)
// ==============
//
// Grades:
// Sport: A,1,*
// Art: 3,2,4,5
// Math: 1,2,A
//
// Step 2: Calculate the average grade for each student and for the entire list of students.
// Decide together how to handle `undefined` and letter grades, and how to weight
// students who have more grades than others.

const students: Student[] = [];

console.log(students);
