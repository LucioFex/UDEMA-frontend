import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { ApiService } from '../../services/api.service';
import { Student, Professor } from '../../models/models';

@Component({
  selector: 'app-directory',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './directory.component.html',
  styleUrls: ['./directory.component.css']
})
export class DirectoryComponent implements OnInit {
  students: Student[] = [];
  professors: Professor[] = [];

  constructor(private apiService: ApiService) {}

  ngOnInit(): void {
    this.loadDirectory();
  }

  private loadDirectory(): void {
    this.apiService.getStudents().subscribe({
      next: (students) => {
        this.students = students;
      },
      error: (error) => {
        console.error('Error loading students:', error);
      }
    });

    this.apiService.getProfessors().subscribe({
      next: (professors) => {
        this.professors = professors;
      },
      error: (error) => {
        console.error('Error loading professors:', error);
      }
    });
  }
}