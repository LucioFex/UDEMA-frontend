import { Injectable } from '@angular/core';
import { Professor } from '../model/professor';
import { Course } from '../model/course';
import { Student } from '../model/student';

@Injectable({
  providedIn: 'root'
})
export class ProfessorService {
  private professors: Professor[] = [];

  constructor() { }

  addProfessor(professor: Professor): void {
    this.professors.push(professor);
  }

  getProfessors(): Professor[] {
    return this.professors;
  }

  getProfessorById(id: number): Professor | undefined {
    return this.professors.find(professor => professor.id === id);
  }

  setStudentQualification(professorId: number, course: Course, student: Student, qualification: number): void {
    const professor = this.getProfessorById(professorId);
    if (professor) {
      professor.setQualification(course, student);
    }
  }
}
