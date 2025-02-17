import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { ApiService } from '../../services/api.service';
import { AuthService } from '../../services/auth.service';
import { Course } from '../../models/models';
import { firstValueFrom } from 'rxjs';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, RouterModule, FormsModule],
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  courses: Course[] = [];
  showAddCourse = false;
  newCourse = {
    name: '',
    description: '',
    professor: null
  };

  constructor(
    private apiService: ApiService,
    public authService: AuthService
  ) {}

  ngOnInit(): void {
    this.loadCourses();
  }

  private loadCourses(): void {
    this.apiService.getCourses().subscribe({
      next: (courses) => {
        this.courses = courses;
      },
      error: (error) => {
        console.error('Error loading courses:', error);
      }
    });
  }

  addCourse(): void {
    if (this.newCourse.name && this.newCourse.description) {
      this.apiService.addCourse({
        name: this.newCourse.name,
        description: this.newCourse.description
      }).subscribe({
        next: () => {
          this.showAddCourse = false;
          this.newCourse = {
            name: '',
            description: '',
            professor: null
          };
          this.loadCourses();
        },
        error: (error) => {
          console.error('Error adding course:', error);
        }
      });
    }
  }

  async deleteCourse(id: number): Promise<void> {
    try {
      // First, check if the course has any classes
      const classes = await firstValueFrom(this.apiService.getCourseClasses(id));

      if (classes.length > 0) {
        alert('Cannot delete this course because it has existing classes. Please remove all classes first.');
        return;
      }

      // If no classes exist, proceed with deletion confirmation
      if (confirm('Are you sure you want to delete this course?')) {
        this.apiService.deleteCourse(id).subscribe({
          next: () => {
            this.loadCourses();
          },
          error: (error) => {
            console.error('Error deleting course:', error);
          }
        });
      }
    } catch (error) {
      console.error('Error checking course classes:', error);
      alert('An error occurred while trying to delete the course. Please try again.');
    }
  }
}