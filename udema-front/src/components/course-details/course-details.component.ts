import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { ApiService } from '../../services/api.service';
import { AuthService } from '../../services/auth.service';
import { Course, Professor, Student, ClassSession } from '../../models/models';
import { forkJoin } from 'rxjs';

@Component({
  selector: 'app-course-details',
  standalone: true,
  imports: [CommonModule, RouterModule, FormsModule],
  templateUrl: './course-details.component.html',
  styleUrls: ['./course-details.component.css']
})
export class CourseDetailsComponent implements OnInit {
  course: Course | undefined;
  showProfessorList = false;
  showStudentList = false;
  showAddClass = false;
  availableProfessors: Professor[] = [];
  allStudents: Student[] = [];
  selectedStudentIds: Set<number> = new Set();
  isProfessor = false;
  classes: ClassSession[] = [];
  newClass = {
    date: '',
    classroom: ''
  };

  constructor(
    private route: ActivatedRoute,
    private apiService: ApiService,
    private authService: AuthService
  ) {
    this.authService.currentUser$.subscribe(user => {
      this.isProfessor = user?.type === 'professor';
    });
  }

  ngOnInit(): void {
    const courseId = this.route.snapshot.paramMap.get('id');
    if (courseId) {
      this.loadCourseData(parseInt(courseId, 10));
    }
  }

  private loadCourseData(courseId: number): void {
    forkJoin({
      course: this.apiService.getCourse(courseId),
      professor: this.apiService.getCourseProfessor(courseId),
      students: this.apiService.getCourseStudents(courseId),
      classes: this.apiService.getCourseClasses(courseId),
      allProfessors: this.apiService.getProfessors(),
      allStudents: this.apiService.getStudents()
    }).subscribe({
      next: (data) => {
        this.course = {
          ...data.course,
          professor: data.professor,
          students: data.students
        };
        this.classes = data.classes;
        this.availableProfessors = data.allProfessors;
        this.allStudents = data.allStudents;
        this.selectedStudentIds = new Set(data.students.map(s => s.id));
      },
      error: (error) => {
        console.error('Error loading course data:', error);
      }
    });
  }

  assignProfessor(professorId: number): void {
    if (this.course && this.isProfessor) {
      this.apiService.assignProfessorToCourse(this.course.id, professorId).subscribe({
        next: () => {
          this.showProfessorList = false;
          this.loadCourseData(this.course!.id);
        },
        error: (error) => {
          console.error('Error assigning professor:', error);
        }
      });
    }
  }

  removeProfessor(): void {
    if (this.course && this.isProfessor) {
      this.apiService.removeProfessorFromCourse(this.course.id).subscribe({
        next: () => {
          this.loadCourseData(this.course!.id);
        },
        error: (error) => {
          console.error('Error removing professor:', error);
        }
      });
    }
  }

  isStudentEnrolled(student: Student): boolean {
    return this.selectedStudentIds.has(student.id);
  }

  toggleStudent(student: Student): void {
    if (!this.isProfessor || !this.course) return;

    const wasEnrolled = this.selectedStudentIds.has(student.id);
    
    if (wasEnrolled) {
      this.apiService.removeStudentFromCourse(this.course.id, student.id).subscribe({
        next: () => {
          this.selectedStudentIds.delete(student.id);
          this.loadCourseData(this.course!.id);
        },
        error: (error) => {
          console.error('Error removing student:', error);
        }
      });
    } else {
      this.apiService.addStudentToCourse(this.course.id, student.id).subscribe({
        next: () => {
          this.selectedStudentIds.add(student.id);
          this.loadCourseData(this.course!.id);
        },
        error: (error) => {
          console.error('Error adding student:', error);
        }
      });
    }
  }

  addClass(): void {
    if (!this.course || !this.isProfessor || !this.newClass.date || !this.newClass.classroom) return;

    this.apiService.addClassSession(this.course.id, this.newClass).subscribe({
      next: () => {
        this.showAddClass = false;
        this.newClass = { date: '', classroom: '' };
        this.loadCourseData(this.course!.id);
      },
      error: (error) => {
        console.error('Error adding class:', error);
      }
    });
  }

  deleteClass(classId: number): void {
    if (!this.course || !this.isProfessor) return;

    this.apiService.deleteClassSession(this.course.id, classId).subscribe({
      next: () => {
        this.loadCourseData(this.course!.id);
      },
      error: (error) => {
        console.error('Error deleting class:', error);
      }
    });
  }
}