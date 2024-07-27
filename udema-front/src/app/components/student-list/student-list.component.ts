import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

interface Student {
  id?: number;
  name: string;
  surname: string;
  email: string;
  career: string;
  dateOfBirth: Date;
  submissionDate: Date;
  password: string;
}

@Component({
  selector: 'app-student-list',
  standalone: true,
  templateUrl: './student-list.component.html',
  styleUrls: ['./student-list.component.css'],
  imports: [CommonModule, FormsModule]
})
export class StudentListComponent implements OnInit {
  students: Student[] = [];
  newStudent: Student = {
    name: '',
    surname: '',
    email: '',
    career: '',
    dateOfBirth: new Date(),
    submissionDate: new Date(),
    password: ''
  };

  constructor(private http: HttpClient) {}

  ngOnInit(): void {
    this.fetchStudents();
  }

  fetchStudents(): void {
    this.http.get<Student[]>('http://localhost:8080/api/students').subscribe(data => {
      this.students = data;
    });
  }

  addStudent(): void {
    console.log('Adding student:', this.newStudent);
    this.http.post('http://localhost:8080/api/students', this.newStudent).subscribe({
      next: response => {
        console.log('Student added successfully:', response);
        this.fetchStudents();
        this.resetForm();
      },
      error: error => {
        console.error('Error adding student:', error);
        alert('Failed to add student: ' + error.message);
      }
    });
  }

  deleteStudent(id: number): void {
    this.http.delete(`http://localhost:8080/api/students/${id}`).subscribe(() => {
      this.fetchStudents();
    });
  }

  resetForm(): void {
    this.newStudent = {
      name: '',
      surname: '',
      email: '',
      career: '',
      dateOfBirth: new Date(),
      submissionDate: new Date(),
      password: ''
    };
  }

  trackById(index: number, student: Student): number {
    return student.id!;
  }
}
