// src/app/components/class-list/class-list.component.ts
import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ClassService } from '../../services/class.service';
import { Class } from '../../model/class';

@Component({
  selector: 'app-class-list',
  standalone: true,
  templateUrl: './class-list.component.html',
  styleUrls: ['./class-list.component.css'],
  imports: [CommonModule]
})
export class ClassListComponent implements OnInit {
  classes: Class[] = [];

  constructor(private classService: ClassService) { }

  ngOnInit(): void {
    this.classService.getClasses().subscribe((data: Class[]) => {
      this.classes = data;
    });
  }

  deleteClass(classId: number): void {
    this.classService.deleteClass(classId).subscribe(() => {
      this.classes = this.classes.filter(c => c.id !== classId);
    });
  }

  updateClass(classId: number, updatedClass: Class): void {
    this.classService.updateClass(classId, updatedClass).subscribe(() => {
      const index = this.classes.findIndex(c => c.id === classId);
      if (index !== -1) {
        this.classes[index] = updatedClass;
      }
    });
  }
}
