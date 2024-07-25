import { Person } from './person';
import { Course } from './course';
import { Student } from './student';

export class Professor extends Person {
  constructor(
    id: number,
    name: string,
    surname: string,
    age: number,
    email: string,
    password: string,
    public submissionDate: Date
  ) {
    super(id, name, surname, age, email, password);
  }

  register(): void {
    // Implementación del método register
  }

  login(email: string, password: string): void {
    // Implementación del método login
  }

  getCurrentCourses(): Course[] {
    // implementación
    return [];
  }

  setQualification(course: Course, student: Student): void {
    // implementación
  }
}
