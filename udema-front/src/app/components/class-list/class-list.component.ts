import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ClassService } from '../../services/class.service';
import { Class } from '../../model/class';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-class-list',
  standalone: true,
  templateUrl: './class-list.component.html',
  styleUrls: ['./class-list.component.css'],
  imports: [CommonModule, FormsModule]
})
export class ClassListComponent implements OnInit {
  classes: Class[] = [];
  newClass: Partial<Class> = {};

  constructor(private classService: ClassService) { }

  ngOnInit(): void {
    this.classService.getClasses().subscribe((data: Class[]) => {
      this.classes = data;
    }, error => {
      console.error('Error fetching classes:', error);
    });
  }

  addClass(): void {
    if (this.newClass.number && this.newClass.classroom && this.newClass.date) {
      this.classService.addClass(this.newClass as Class).subscribe((newClass: Class) => {
        this.classes.push(newClass);
        this.newClass = {};
      }, error => {
        console.error('Error adding class:', error);
      });
    }
  }

  deleteClass(classId: number): void {
    this.classService.deleteClass(classId).subscribe(() => {
      this.classes = this.classes.filter(c => c.id !== classId);
    }, error => {
      console.error('Error deleting class:', error);
    });
  }
}
