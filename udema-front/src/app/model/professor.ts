// src/app/models/professor.model.ts
import { Person } from './person';
import { Course } from './course';

export interface Professor extends Person {
  submissionDate: Date;
  course?: Course;
}
