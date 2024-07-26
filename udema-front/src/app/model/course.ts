// src/app/models/course.model.ts
import { Class } from './class';
import { Student } from './student';
import { Professor } from './professor';

export interface Course {
  id?: number;
  name: string;
  description: string;
  students?: Student[];
  classes?: Class[];
  professor?: Professor;
}
