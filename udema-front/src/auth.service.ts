import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Student, Professor, BaseUser } from './models';
import { AppService } from './app.service';

export type UserType = 'student' | 'professor';

export interface AuthUser extends BaseUser {
  type: UserType;
}

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private currentUserSubject = new BehaviorSubject<AuthUser | null>(null);
  currentUser$ = this.currentUserSubject.asObservable();

  constructor(private appService: AppService) {}

  login(username: string, password: string): boolean {
    // For demo purposes, we'll just check if the username exists
    const student = this.appService.getStudents().find(s => s.userName === username);
    if (student) {
      this.currentUserSubject.next({ ...student, type: 'student' });
      return true;
    }

    const professor = this.appService.getProfessors().find(p => p.userName === username);
    if (professor) {
      this.currentUserSubject.next({ ...professor, type: 'professor' });
      return true;
    }

    return false;
  }

  register(userData: Omit<BaseUser, 'id'> & { type: UserType, password: string, major?: string }): boolean {
    const existingStudent = this.appService.getStudents().find(s => s.userName === userData.userName);
    const existingProfessor = this.appService.getProfessors().find(p => p.userName === userData.userName);

    if (existingStudent || existingProfessor) {
      return false;
    }

    const id = Math.floor(Math.random() * 10000) + 1;
    const submissionDate = new Date().toISOString().split('T')[0];

    if (userData.type === 'student') {
      const student: Student = {
        ...userData,
        id,
        major: userData.major || 'Undeclared',
        year: 1,
        courses: [],
        submissionDate
      };
      this.appService.addStudent(student);
    } else {
      const professor: Professor = {
        ...userData,
        id,
        department: 'General',
        title: 'Assistant Professor',
        submissionDate
      };
      this.appService.addProfessor(professor);
    }

    return true;
  }

  logout(): void {
    this.currentUserSubject.next(null);
  }

  isAuthenticated(): boolean {
    return this.currentUserSubject.value !== null;
  }
}