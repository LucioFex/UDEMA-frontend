export interface BaseUser {
  id: number;
  name: string;
  surname: string;
  username: string;
  email: string;
  dateOfBirth: string;
  age?: number;
}

export interface Student extends BaseUser {
  career: string;
  year: number;
  submissionDate: string;
}

export interface Professor extends BaseUser {
  department?: string;
  title?: string;
  submissionDate: string;
}

export interface Classroom {
  id: number;
  name: string;
  building: string;
}

export interface ClassSession {
  id: number;
  number: number;
  classroom: string;
  date: string;
  course?: Course;
}

export interface Course {
  id: number;
  name: string;
  description: string;
  professor?: Professor | null;
  students?: Student[];
}