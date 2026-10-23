export type Grade = 1 | 2 | 3 | 4 | 5 | 6 | "A" | "B" | "C" | "D" | "F";

export type Subject = {
  name: string;
  grades: (Grade | undefined)[];
};

export type Student = {
  firstName: string;
  lastName: string;
  age: number;
  subjects: Subject[];
};
