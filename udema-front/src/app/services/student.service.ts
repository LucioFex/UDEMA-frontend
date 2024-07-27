// src/app/services/student.service.ts
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Student } from '../model/student';

@Injectable({
  providedIn: 'root'
})
export class StudentService {
  private apiUrl = 'http://localhost:8080/api/students';

  constructor(private http: HttpClient) { }

  getStudents(): Observable<Student[]> {
    return this.http.get<Student[]>(this.apiUrl);
  }

  addStudent(newStudent: Student): Observable<Student> {
    return this.http.post<Student>(this.apiUrl, newStudent);
  }

  deleteStudent(studentId: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${studentId}`);
  }

  updateStudent(studentId: number, student: Student): Observable<void> {
    return this.http.put<void>(`${this.apiUrl}/${studentId}`, student);
  }
}
