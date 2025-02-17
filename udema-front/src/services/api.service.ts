import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Course, Student, Professor, ClassSession } from '../models/models';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  private baseUrl = 'http://localhost:8080/api';

  constructor(private http: HttpClient) {}

  // Auth endpoints
  loginStudent(username: string, password: string): Observable<{token: string}> {
    return this.http.post<{token: string}>(`${this.baseUrl}/auth/student/login`, { username, password });
  }

  loginProfessor(username: string, password: string): Observable<{token: string}> {
    return this.http.post<{token: string}>(`${this.baseUrl}/auth/professor/login`, { username, password });
  }

  // Registration endpoints
  registerStudent(student: Omit<Student, 'id'>): Observable<void> {
    return this.http.post<void>(`${this.baseUrl}/students`, student);
  }

  registerProfessor(professor: Omit<Professor, 'id'>): Observable<void> {
    return this.http.post<void>(`${this.baseUrl}/professors`, professor);
  }

  // Course endpoints
  getCourses(): Observable<Course[]> {
    return this.http.get<Course[]>(`${this.baseUrl}/courses`);
  }

  getCourse(id: number): Observable<Course> {
    return this.http.get<Course>(`${this.baseUrl}/courses/${id}`);
  }

  addCourse(courseData: { name: string; description: string }): Observable<void> {
    return this.http.post<void>(`${this.baseUrl}/courses`, courseData);
  }

  deleteCourse(id: number): Observable<void> {
    return this.http.delete<void>(`${this.baseUrl}/courses/${id}`);
  }

  // Class session endpoints
  getCourseClasses(courseId: number): Observable<ClassSession[]> {
    return this.http.get<ClassSession[]>(`${this.baseUrl}/classes/courses/${courseId}`);
  }

  addClassSession(courseId: number, classData: { date: string, classroom: string }): Observable<void> {
    return this.http.post<void>(`${this.baseUrl}/classes/courses/${courseId}`, classData);
  }

  deleteClassSession(courseId: number, classId: number): Observable<void> {
    return this.http.delete<void>(`${this.baseUrl}/classes/${classId}`);
  }

  // Professor endpoints
  getCourseProfessor(courseId: number): Observable<Professor> {
    return this.http.get<Professor>(`${this.baseUrl}/courses/${courseId}/professor`);
  }

  assignProfessorToCourse(courseId: number, professorId: number): Observable<void> {
    return this.http.post<void>(`${this.baseUrl}/courses/${courseId}/professor/${professorId}`, {});
  }

  removeProfessorFromCourse(courseId: number): Observable<void> {
    return this.http.delete<void>(`${this.baseUrl}/courses/${courseId}/professor`);
  }

  getCourseStudents(courseId: number): Observable<Student[]> {
    return this.http.get<Student[]>(`${this.baseUrl}/courses/${courseId}/students`);
  }

  addStudentToCourse(courseId: number, studentId: number): Observable<void> {
    return this.http.post<void>(`${this.baseUrl}/courses/${courseId}/students/${studentId}`, {});
  }

  removeStudentFromCourse(courseId: number, studentId: number): Observable<void> {
    return this.http.delete<void>(`${this.baseUrl}/courses/${courseId}/student/${studentId}`);
  }

  // Student endpoints
  getStudents(): Observable<Student[]> {
    return this.http.get<Student[]>(`${this.baseUrl}/students`);
  }

  // Professor endpoints
  getProfessors(): Observable<Professor[]> {
    return this.http.get<Professor[]>(`${this.baseUrl}/professors`);
  }
}