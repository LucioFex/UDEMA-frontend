import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StudentService } from '../../services/student.service';
import { Student } from '../../model/student';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-student-list',
  standalone: true,
  templateUrl: './student-list.component.html',
  styleUrls: ['./student-list.component.css'],
  imports: [CommonModule, FormsModule]
})
export class StudentListComponent implements OnInit {
  students: Student[] = [];
  newStudent: Partial<Student> = {};

  constructor(private studentService: StudentService) { }

  ngOnInit(): void {
    this.studentService.getStudents().subscribe((data: Student[]) => {
      this.students = data;
    }, error => {
      console.error('Error fetching students:', error);
    });
  }

  addStudent(): void {
    if (this.newStudent.name && this.newStudent.surname && this.newStudent.email && this.newStudent.career && this.newStudent.dateOfBirth) {
      this.studentService.addStudent(this.newStudent as Student).subscribe((newStudent: Student) => {
        this.students.push(newStudent);
        this.newStudent = {};
      }, error => {
        console.error('Error adding student:', error);
      });
    }
  }

  deleteStudent(studentId: number): void {
    this.studentService.deleteStudent(studentId).subscribe(() => {
      this.students = this.students.filter(s => s.id !== studentId);
    }, error => {
      console.error('Error deleting student:', error);
    });
  }
}
