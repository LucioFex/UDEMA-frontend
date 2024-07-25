import { Injectable } from '@angular/core';
import { Course } from '../model/course';
import { Student } from '../model/student';
import { Professor } from '../model/professor';
import { Class } from '../model/class';

@Injectable({
  providedIn: 'root'
})
export class CourseService {
  private courses: Course[] = [];

  constructor() { }

  addCourse(course: Course): void {
    this.courses.push(course);
  }

  getCourses(): Course[] {
    return this.courses;
  }

  getCourseByName(name: string): Course | undefined {
    return this.courses.find(course => course.name === name);
  }

  addStudentToCourse(courseName: string, student: Student): void {
    const course = this.getCourseByName(courseName);
    if (course) {
      course.addStudent(student);
    }
  }

  removeStudentFromCourse(courseName: string, student: Student): void {
    const course = this.getCourseByName(courseName);
    if (course) {
      course.removeStudent(student);
    }
  }

  addProfessorToCourse(courseName: string, professor: Professor): void {
    const course = this.getCourseByName(courseName);
    if (course) {
      course.addProfessor(professor);
    }
  }

  removeProfessorFromCourse(courseName: string, professor: Professor): void {
    const course = this.getCourseByName(courseName);
    if (course) {
      course.removeProfessor(professor);
    }
  }

  addClassToCourse(courseName: string, cls: Class): void {
    const course = this.getCourseByName(courseName);
    if (course) {
      course.addClass(cls);
    }
  }

  removeClassFromCourse(courseName: string, cls: Class): void {
    const course = this.getCourseByName(courseName);
    if (course) {
      course.removeClass(cls);
    }
  }
}
