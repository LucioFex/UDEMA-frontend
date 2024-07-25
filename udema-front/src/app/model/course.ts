
import { Student } from './student';
import { Professor } from './professor';
import { Class } from './class';

export class Course {
  constructor(
    public name: string,
    public description: string
  ) {}

  getName(): string {
    return this.name;
  }

  getDescription(): string {
    return this.description;
  }

  addStudent(student: Student): void {
    // implementación
  }

  removeStudent(student: Student): void {
    // implementación
  }

  addProfessor(professor: Professor): void {
    // implementación
  }

  removeProfessor(professor: Professor): void {
    // implementación
  }

  addClass(cls: Class): void {
    // implementación
  }

  removeClass(cls: Class): void {
    // implementación
  }
}
