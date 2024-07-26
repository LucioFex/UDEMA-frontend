// src/app/models/student.model.ts
import { Person } from './person';
import { Course } from './course';

export interface Student extends Person {
  submissionDate: Date;
  career: string;
  year?: number;
  courses?: Course[];
}
