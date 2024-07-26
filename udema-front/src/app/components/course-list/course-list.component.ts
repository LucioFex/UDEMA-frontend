// src/app/components/course-list/course-list.component.ts
import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CourseService } from '../../services/course.service';
import { Course } from '../../model/course';

@Component({
  selector: 'app-course-list',
  standalone: true,
  templateUrl: './course-list.component.html',
  styleUrls: ['./course-list.component.css'],
  imports: [CommonModule, CourseListComponent]
})
export class CourseListComponent implements OnInit {
  courses: Course[] = [];

  constructor(private courseService: CourseService) { }

  ngOnInit(): void {
    this.courseService.getCourses().subscribe((data: Course[]) => {
      this.courses = data;
    });
  }

  deleteCourse(courseId: number): void {
    this.courseService.deleteCourse(courseId).subscribe(() => {
      this.courses = this.courses.filter(c => c.id !== courseId);
    });
  }

  updateCourse(courseId: number, updatedCourse: Course): void {
    this.courseService.updateCourse(courseId, updatedCourse).subscribe(() => {
      const index = this.courses.findIndex(c => c.id === courseId);
      if (index !== -1) {
        this.courses[index] = updatedCourse;
      }
    });
  }
}
