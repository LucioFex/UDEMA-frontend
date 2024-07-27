import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

interface Class {
  id?: number;
  number: number;
  classroom: string;
  date: string; // Usamos string y no date, porque sino se genera un error por conversión de tipos de datos con el back
}

@Component({
  selector: 'app-class-list',
  standalone: true,
  templateUrl: './class-list.component.html',
  styleUrls: ['./class-list.component.css'],
  imports: [CommonModule, FormsModule]
})
export class ClassListComponent implements OnInit {
  classes: Class[] = [];
  newClass: Class = { number: 0, classroom: '', date: '' };

  constructor(private http: HttpClient) {}

  ngOnInit(): void {
    this.getClasses();
  }

  getClasses(): void {
    this.http.get<Class[]>('http://localhost:8080/api/classes').subscribe(
      (response) => {
        this.classes = response;
      },
      (error) => {
        console.error('Error fetching classes:', error);
        alert('Error fetching classes.');
      }
    );
  }

  addClass(): void {
    const formattedDate = this.newClass.date;
    console.log('Adding class with formatted date:', formattedDate);

    this.http.post<Class>('http://localhost:8080/api/classes', { ...this.newClass, date: formattedDate }).subscribe(
      (response) => {
        this.classes.push(response);
        this.newClass = { number: 0, classroom: '', date: '' };
      },
      (error) => {
        console.error('Error adding class:', error);
        alert('Error adding class.');
      }
    );
  }

  deleteClass(id: number): void {
    this.http.delete(`http://localhost:8080/api/classes/${id}`).subscribe(
      () => {
        this.classes = this.classes.filter(c => c.id !== id);
      },
      (error) => {
        console.error('Error deleting class:', error);
        alert('Error deleting class.');
      }
    );
  }
}
