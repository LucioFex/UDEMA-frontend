import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, ActivatedRoute } from '@angular/router';
import { ApiService } from '../../services/api.service';
import { Student, Course } from '../../models/models';
import { forkJoin } from 'rxjs';

@Component({
  selector: 'app-student-profile',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './student-profile.component.html',
  styleUrls: ['./student-profile.component.css']
})
export class StudentProfileComponent implements OnInit {
  student: Student | undefined;
  enrolledCourses: Course[] = [];

  constructor(
    private route: ActivatedRoute,
    private apiService: ApiService
  ) {}

  ngOnInit(): void {
    const studentId = this.route.snapshot.paramMap.get('id');
    if (studentId) {
      this.loadStudentData(parseInt(studentId, 10));
    }
  }

  private loadStudentData(studentId: number): void {
    forkJoin({
      students: this.apiService.getStudents(),
      courses: this.apiService.getCourses()
    }).subscribe({
      next: ({ students, courses }) => {
        this.student = students.find(s => s.id === studentId);
        if (this.student) {
          // For each course, check if this student is enrolled
          courses.forEach(course => {
            this.apiService.getCourseStudents(course.id).subscribe({
              next: (students) => {
                if (students.some(s => s.id === studentId)) {
                  this.enrolledCourses.push(course);
                }
              },
              error: (error) => {
                console.error(`Error loading students for course ${course.id}:`, error);
              }
            });
          });
        }
      },
      error: (error) => {
        console.error('Error loading student data:', error);
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