import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Course } from '../model/course';

@Injectable({
  providedIn: 'root'
})
export class CourseService {
  private apiUrl = 'http://localhost:8080/api/courses';

  constructor(private http: HttpClient) { }

  getCourses(): Observable<Course[]> {
    return this.http.get<Course[]>(this.apiUrl);
  }

  addCourse(newCourse: Course): Observable<Course> {
    return this.http.post<Course>(this.apiUrl, newCourse);
  }

  deleteCourse(courseId: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${courseId}`);
  }

  updateCourse(courseId: number, course: Course): Observable<void> {
    return this.http.put<void>(`${this.apiUrl}/${courseId}`, course);
  }
}
