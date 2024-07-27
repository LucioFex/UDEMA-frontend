import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

interface Professor {
  id?: number;
  name: string;
  surname: string;
  email: string;
  dateOfBirth: Date;
  submissionDate: Date;
  password: string;
}

@Component({
  selector: 'app-professor-list',
  standalone: true,
  templateUrl: './professor-list.component.html',
  styleUrls: ['./professor-list.component.css'],
  imports: [CommonModule, FormsModule]
})
export class ProfessorListComponent implements OnInit {
  professors: Professor[] = [];
  newProfessor: Professor = {
    name: '',
    surname: '',
    email: '',
    dateOfBirth: new Date(),
    submissionDate: new Date(),
    password: ''
  };

  constructor(private http: HttpClient) {}

  ngOnInit(): void {
    this.fetchProfessors();
  }

  fetchProfessors(): void {
    this.http.get<Professor[]>('http://localhost:8080/api/professors').subscribe(data => {
      this.professors = data;
    });
  }

  addProfessor(): void {
    console.log('Adding professor:', this.newProfessor);
    this.http.post('http://localhost:8080/api/professors', this.newProfessor).subscribe({
      next: response => {
        console.log('Professor added successfully:', response);
        this.fetchProfessors(); // Refresh the list
        this.resetForm(); // Clear the form fields
      },
      error: error => {
        console.error('Error adding professor:', error);
        alert('Failed to add professor: ' + error.message); // Show an alert
      }
    });
  }

  deleteProfessor(id: number): void {
    this.http.delete(`http://localhost:8080/api/professors/${id}`).subscribe(() => {
      this.fetchProfessors(); // Refresh the list
    });
  }

  resetForm(): void {
    this.newProfessor = {
      name: '',
      surname: '',
      email: '',
      dateOfBirth: new Date(),
      submissionDate: new Date(),
      password: ''
    };
  }

  trackById(index: number, professor: Professor): number {
    return professor.id!;
  }
}
