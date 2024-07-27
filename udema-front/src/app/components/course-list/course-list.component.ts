import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CourseService } from '../../services/course.service';
import { Course } from '../../model/course';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-course-list',
  standalone: true,
  templateUrl: './course-list.component.html',
  styleUrls: ['./course-list.component.css'],
  imports: [CommonModule, FormsModule]
})
export class CourseListComponent implements OnInit {
  courses: Course[] = [];
  newCourse: Partial<Course> = {};

  constructor(private courseService: CourseService) { }

  ngOnInit(): void {
    this.courseService.getCourses().subscribe((data: Course[]) => {
      this.courses = data;
    }, error => {
      console.error('Error fetching courses:', error);
    });
  }

  addCourse(): void {
    if (this.newCourse.name && this.newCourse.description) {
      this.courseService.addCourse(this.newCourse as Course).subscribe((newCourse: Course) => {
        this.courses.push(newCourse);
        this.newCourse = {};
      }, error => {
        console.error('Error adding course:', error);
      });
    }
  }

  deleteCourse(courseId: number): void {
    this.courseService.deleteCourse(courseId).subscribe(() => {
      this.courses = this.courses.filter(c => c.id !== courseId);
    }, error => {
      console.error('Error deleting course:', error);
    });
  }
}
