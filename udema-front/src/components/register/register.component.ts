import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { ApiService } from '../../services/api.service';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterModule],
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent {
  userData = {
    type: 'student' as const,
    name: '',
    surname: '',
    username: '',
    age: 0,
    email: '',
    dateOfBirth: '',
    password: ''
  };
  career: string = '';
  confirmPassword: string = '';
  error: string = '';

  constructor(
    private apiService: ApiService,
    private router: Router
  ) {}

  calculateAge(): void {
    if (this.userData.dateOfBirth) {
      const birthDate = new Date(this.userData.dateOfBirth);
      const today = new Date();
      let age = today.getFullYear() - birthDate.getFullYear();
      const monthDiff = today.getMonth() - birthDate.getMonth();

      if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birthDate.getDate())) {
        age--;
      }

      this.userData.age = age;
    }
  }

  onSubmit(): void {
    if (this.userData.password !== this.confirmPassword) {
      this.error = 'Passwords do not match';
      return;
    }

    if (this.validateForm()) {
      const submissionDate = new Date().toISOString().split('T')[0];

      if (this.userData.type === 'student') {
        this.apiService.registerStudent({
          ...this.userData,
          career: this.career,
          year: 1,
          submissionDate
        }).subscribe({
          next: () => {
            this.router.navigate(['/login']);
          },
          error: (error) => {
            this.error = 'Registration failed. Please try again.';
            console.error('Registration error:', error);
          }
        });
      } else {
        this.apiService.registerProfessor({
          ...this.userData,
          title: 'Assistant Professor',
          submissionDate
        }).subscribe({
          next: () => {
            this.router.navigate(['/login']);
          },
          error: (error) => {
            this.error = 'Registration failed. Please try again.';
            console.error('Registration error:', error);
          }
        });
      }
    }
  }

  private validateForm(): boolean {
    if (!this.userData.type || !this.userData.name || !this.userData.surname || 
        !this.userData.username || !this.userData.email || !this.userData.dateOfBirth || 
        !this.userData.password) {
      this.error = 'Please fill in all fields';
      return false;
    }

    if (this.userData.type === 'student' && !this.career) {
      this.error = 'Please enter your career';
      return false;
    }

    return true;
  }
}