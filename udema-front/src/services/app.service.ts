import { Injectable } from '@angular/core';
import { Student, Professor, Course } from '../models/models';

@Injectable({
  providedIn: 'root'
})
export class AppService {
  constructor() {}

  getStudents(): Student[] {
    return [];
  }

  getProfessors(): Professor[] {
    return [];
  }

  getCourses(): Course[] {
    return [];
  }

  getStudentById(id: number): Student | undefined {
    return undefined;
  }

  getProfessorById(id: number): Professor | undefined {
    return undefined;
  }

  addStudent(student: Student): void {
    // Implementation will be handled by API
  }

  addProfessor(professor: Professor): void {
    // Implementation will be handled by API
  }

  addCourse(courseData: { name: string; description: string; professor: Professor | null }): void {
    // Implementation will be handled by API
  }

  deleteCourse(courseId: number): void {
    // Implementation will be handled by API
  }

  assignProfessor(courseId: number, professorId: number): void {
    // Implementation will be handled by API
  }

  removeProfessor(courseId: number): void {
    // Implementation will be handled by API
  }

  updateStudents(courseId: number, studentIds: number[]): void {
    // Implementation will be handled by API
  }
}