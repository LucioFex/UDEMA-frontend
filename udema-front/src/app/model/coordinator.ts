import { Person } from './person';
import { Course } from './course';

export class Coordinator extends Person {
  constructor(
    id: number,
    name: string,
    surname: string,
    age: number,
    email: string,
    password: string
  ) {
    super(id, name, surname, age, email, password);
  }

  register(): void {
    // Implementación del método register
  }

  login(email: string, password: string): void {
    // Implementación del método login
  }

  addCourse(course: Course): void {
    // implementación
  }

  removeCourse(course: Course): void {
    // implementación
  }
}
