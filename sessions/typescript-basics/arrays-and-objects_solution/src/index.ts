const hobbies: string[] = ["climbing", "reading", "cooking"];

const grades: number[] = [1, 3, 2];
grades.push(4);
// grades.push("A"); // Error: Argument of type 'string' is not assignable to parameter of type 'number'.

const student: {
  name: string;
  age: number;
  isStudent: boolean;
  grades: number[];
} = {
  name: "Max",
  age: 22,
  isStudent: true,
  grades: [1, 2, 1],
};

console.log(student.name);
console.log(student.grades);

// Step 6: the object type has to be repeated for the array element.
// This is the motivation for type aliases in the next session.
const students: {
  name: string;
  age: number;
  isStudent: boolean;
  grades: number[];
}[] = [student, { name: "Eva", age: 24, isStudent: true, grades: [2, 2] }];

console.log(hobbies, students);
