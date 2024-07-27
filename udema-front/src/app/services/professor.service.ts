import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Professor } from '../model/professor';

@Injectable({
  providedIn: 'root'
})
export class ProfessorService {
  private apiUrl = 'http://localhost:8080/api/professors';

  constructor(private http: HttpClient) { }

  getProfessors(): Observable<Professor[]> {
    return this.http.get<Professor[]>(this.apiUrl);
  }

  addProfessor(newProfessor: Professor): Observable<Professor> {
    return this.http.post<Professor>(this.apiUrl, newProfessor);
  }

  deleteProfessor(professorId: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${professorId}`);
  }

  updateProfessor(professorId: number, professor: Professor): Observable<void> {
    return this.http.put<void>(`${this.apiUrl}/${professorId}`, professor);
  }
}
