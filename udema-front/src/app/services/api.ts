import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Student } from '../model/student';
import { Professor } from '../model/professor';
import { Coordinator } from '../model/coordinator';
import { Course } from '../model/course';
import { Class } from '../model/class';
import { Person } from '../model/person';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  private readonly _url: string = 'http://localhost:8080/api/';

  constructor(private http: HttpClient) { }

  getToken(): string | null {
    return localStorage.getItem('token') || null;
  }

  getAuthHeader(): object {
    return { headers: { 'Authorization': 'Bearer ' + this.getToken() } };
  }

  // ----------------- Auth Endpoints -----------------

  login(email: string, password: string): Observable<any> {
    return this.http.post<any>(`${this._url}auth/login`, { email, password });
  }

  signup(newUser: Person): Observable<any> {
    return this.http.post<Person>(`${this._url}auth/signup`, newUser);
  }

  // -------------- Person Endpoints ------------------

  getUserInfo(): Observable<Person> {
    return this.http.get<Person>(`${this._url}users/me`, this.getAuthHeader());
  }

  // -------------- Student Endpoints -----------------

  getStudents(): Observable<Student[]> {
    return this.http.get<Student[]>(`${this._url}students`, this.getAuthHeader());
  }

  getStudentById(studentId: number): Observable<Student> {
    return this.http.get<Student>(`${this._url}students/${studentId}`, this.getAuthHeader());
  }

  createStudent(student: Student): Observable<Student> {
    return this.http.post<Student>(`${this._url}students`, student, this.getAuthHeader());
  }

  updateStudent(studentId: number, student: Student): Observable<Student> {
    return this.http.put<Student>(`${this._url}students/${studentId}`, student, this.getAuthHeader());
  }

  deleteStudent(studentId: number): Observable<any> {
    return this.http.delete<any>(`${this._url}students/${studentId}`, this.getAuthHeader());
  }

  // -------------- Professor Endpoints -----------------

  getProfessors(): Observable<Professor[]> {
    return this.http.get<Professor[]>(`${this._url}professors`, this.getAuthHeader());
  }

  getProfessorById(professorId: number): Observable<Professor> {
    return this.http.get<Professor>(`${this._url}professors/${professorId}`, this.getAuthHeader());
  }

  createProfessor(professor: Professor): Observable<Professor> {
    return this.http.post<Professor>(`${this._url}professors`, professor, this.getAuthHeader());
  }

  updateProfessor(professorId: number, professor: Professor): Observable<Professor> {
    return this.http.put<Professor>(`${this._url}professors/${professorId}`, professor, this.getAuthHeader());
  }

  deleteProfessor(professorId: number): Observable<any> {
    return this.http.delete<any>(`${this._url}professors/${professorId}`, this.getAuthHeader());
  }

  // -------------- Coordinator Endpoints -----------------

  getCoordinators(): Observable<Coordinator[]> {
    return this.http.get<Coordinator[]>(`${this._url}coordinators`, this.getAuthHeader());
  }

  getCoordinatorById(coordinatorId: number): Observable<Coordinator> {
    return this.http.get<Coordinator>(`${this._url}coordinators/${coordinatorId}`, this.getAuthHeader());
  }

  createCoordinator(coordinator: Coordinator): Observable<Coordinator> {
    return this.http.post<Coordinator>(`${this._url}coordinators`, coordinator, this.getAuthHeader());
  }

  updateCoordinator(coordinatorId: number, coordinator: Coordinator): Observable<Coordinator> {
    return this.http.put<Coordinator>(`${this._url}coordinators/${coordinatorId}`, coordinator, this.getAuthHeader());
  }

  deleteCoordinator(coordinatorId: number): Observable<any> {
    return this.http.delete<any>(`${this._url}coordinators/${coordinatorId}`, this.getAuthHeader());
  }

  // -------------- Course Endpoints -----------------

  getCourses(): Observable<Course[]> {
    return this.http.get<Course[]>(`${this._url}courses`, this.getAuthHeader());
  }

  getCourseById(courseId: number): Observable<Course> {
    return this.http.get<Course>(`${this._url}courses/${courseId}`, this.getAuthHeader());
  }

  createCourse(course: Course): Observable<Course> {
    return this.http.post<Course>(`${this._url}courses`, course, this.getAuthHeader());
  }

  updateCourse(courseId: number, course: Course): Observable<Course> {
    return this.http.put<Course>(`${this._url}courses/${courseId}`, course, this.getAuthHeader());
  }

  deleteCourse(courseId: number): Observable<any> {
    return this.http.delete<any>(`${this._url}courses/${courseId}`, this.getAuthHeader());
  }

  // -------------- Class Endpoints -----------------

  getClasses(): Observable<Class[]> {
    return this.http.get<Class[]>(`${this._url}classes`, this.getAuthHeader());
  }

  getClassById(classId: number): Observable<Class> {
    return this.http.get<Class>(`${this._url}classes/${classId}`, this.getAuthHeader());
  }

  createClass(cls: Class): Observable<Class> {
    return this.http.post<Class>(`${this._url}classes`, cls, this.getAuthHeader());
  }

  updateClass(classId: number, cls: Class): Observable<Class> {
    return this.http.put<Class>(`${this._url}classes/${classId}`, cls, this.getAuthHeader());
  }

  deleteClass(classId: number): Observable<any> {
    return this.http.delete<any>(`${this._url}classes/${classId}`, this.getAuthHeader());
  }
}
