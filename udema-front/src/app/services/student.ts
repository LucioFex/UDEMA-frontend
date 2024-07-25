import { Injectable } from '@angular/core';
import { Student } from '../model/student';
import { Course } from '../model/course';

@Injectable({
  providedIn: 'root'
})
export class StudentService {
  private students: Student[] = [];

  constructor() { }

  addStudent(student: Student): void {
    this.students.push(student);
  }

  getStudents(): Student[] {
    return this.students;
  }

  getStudentById(id: number): Student | undefined {
    return this.students.find(student => student.id === id);
  }

  getStudentCourses(studentId: number): Course[] | undefined {
    const student = this.getStudentById(studentId);
    return student?.getCurrentCourses();
  }
}
