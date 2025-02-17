import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, tap } from 'rxjs';
import { Student, Professor, BaseUser } from '../models/models';
import { ApiService } from './api.service';
import { Router } from '@angular/router';

export type UserType = 'student' | 'professor';

export interface AuthUser extends BaseUser {
  type: UserType;
}

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private currentUserSubject = new BehaviorSubject<Partial<AuthUser> | null>(null);
  currentUser$ = this.currentUserSubject.asObservable();

  constructor(
    private apiService: ApiService,
    private router: Router
  ) {
    const token = localStorage.getItem('jwt_token');
    if (token) {
      const userType = localStorage.getItem('user_type');
      const userData = JSON.parse(localStorage.getItem('user_data') || '{}');
      if (userType && userData) {
        this.currentUserSubject.next({ ...userData, type: userType as UserType });
      }
    }
  }

  login(username: string, password: string, type: UserType): Observable<{token: string}> {
    const loginCall = type === 'student' 
      ? this.apiService.loginStudent(username, password)
      : this.apiService.loginProfessor(username, password);

    return loginCall.pipe(
      tap(response => {
        localStorage.setItem('jwt_token', response.token);
        localStorage.setItem('user_type', type);
        const userData = {
          username,
          type
        };
        localStorage.setItem('user_data', JSON.stringify(userData));
        this.currentUserSubject.next(userData);
      })
    );
  }

  logout(): void {
    localStorage.removeItem('jwt_token');
    localStorage.removeItem('user_type');
    localStorage.removeItem('user_data');
    this.currentUserSubject.next(null);
    this.router.navigate(['/login']);
  }

  isAuthenticated(): boolean {
    return this.currentUserSubject.value !== null;
  }
}