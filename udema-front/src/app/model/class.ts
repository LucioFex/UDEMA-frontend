import { Course } from './course';

export interface Class {
  id?: number;
  number: number;
  classroom: string;
  date: Date;
  course?: Course;
}
