import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, ActivatedRoute } from '@angular/router';
import { ApiService } from '../../services/api.service';
import { Professor, Course } from '../../models/models';

@Component({
  selector: 'app-professor-profile',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './professor-profile.component.html',
  styleUrls: ['./professor-profile.component.css']
})
export class ProfessorProfileComponent implements OnInit {
  professor: Professor | undefined;
  teachingCourses: Course[] = [];

  constructor(
    private route: ActivatedRoute,
    private apiService: ApiService
  ) {}

  ngOnInit(): void {
    const professorId = this.route.snapshot.paramMap.get('id');
    if (professorId) {
      this.loadProfessorData(parseInt(professorId, 10));
    }
  }

  private loadProfessorData(professorId: number): void {
    this.apiService.getProfessors().subscribe({
      next: (professors) => {
        this.professor = professors.find(p => p.id === professorId);
        if (this.professor) {
          this.loadProfessorCourses();
        }
      },
      error: (error) => {
        console.error('Error loading professor:', error);
      }
    });
  }

  private loadProfessorCourses(): void {
    this.apiService.getCourses().subscribe({
      next: (courses) => {
        // For each course, check if this professor is teaching it
        courses.forEach(course => {
          this.apiService.getCourseProfessor(course.id).subscribe({
            next: (professor) => {
              if (professor?.id === this.professor?.id) {
                this.teachingCourses.push(course);
              }
            },
            error: (error) => {
              console.error(`Error loading professor for course ${course.id}:`, error);
            }
          });
        });
      },
      error: (error) => {
        console.error('Error loading courses:', error);
      }
    });
  }

  formatDate(date: string): string {
    return new Date(date).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  }
}