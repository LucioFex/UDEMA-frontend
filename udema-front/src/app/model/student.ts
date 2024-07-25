import { Person } from './person';
import { Course } from './course';

export class Student extends Person {
  constructor(
    id: number,
    name: string,
    surname: string,
    age: number,
    email: string,
    password: string,
    public submissionDate: Date,
    public career: string,
    public year: number
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

  getQualification(course: Course): number {
    // implementación
    return 0;
  }

  getAverageQualification(): number {
    // implementación
    return 0;
  }
}
