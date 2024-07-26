// src/app/services/class.service.ts
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Class } from '../model/class';

@Injectable({
  providedIn: 'root'
})
export class ClassService {
  private apiUrl = 'http://localhost:8080/api/classes';

  constructor(private http: HttpClient) { }

  getClasses(): Observable<Class[]> {
    return this.http.get<Class[]>(this.apiUrl);
  }

  deleteClass(classId: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${classId}`);
  }

  updateClass(classId: number, pClass: Class): Observable<void> {
    return this.http.put<void>(`${this.apiUrl}/${classId}`, pClass);
  }
}
