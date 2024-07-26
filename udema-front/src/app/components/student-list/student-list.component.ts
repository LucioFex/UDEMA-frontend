// src/app/components/student-list/student-list.component.ts
import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StudentService } from '../../services/student.service';
import { Student } from '../../model/student';
import { HeaderComponent } from '../header/header.component';

@Component({
  selector: 'app-student-list',
  standalone: true,
  templateUrl: './student-list.component.html',
  styleUrls: ['./student-list.component.css'],
  imports: [CommonModule, HeaderComponent]
})
export class StudentListComponent implements OnInit {
  students: Student[] = [];

  constructor(private studentService: StudentService) { }

  ngOnInit(): void {
    this.studentService.getStudents().subscribe((data: Student[]) => {
      this.students = data;
    });
  }

  deleteStudent(studentId: number): void {
    this.studentService.deleteStudent(studentId).subscribe(() => {
      this.students = this.students.filter(s => s.id !== studentId);
    });
  }

  updateStudent(studentId: number, updatedStudent: Student): void {
    this.studentService.updateStudent(studentId, updatedStudent).subscribe(() => {
      const index = this.students.findIndex(s => s.id === studentId);
      if (index !== -1) {
        this.students[index] = updatedStudent;
      }
    });
  }
}
