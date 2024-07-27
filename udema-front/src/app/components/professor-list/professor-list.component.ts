import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProfessorService } from '../../services/professor.service';
import { Professor } from '../../model/professor';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-professor-list',
  standalone: true,
  templateUrl: './professor-list.component.html',
  styleUrls: ['./professor-list.component.css'],
  imports: [CommonModule, FormsModule]
})
export class ProfessorListComponent implements OnInit {
  professors: Professor[] = [];
  newProfessor: Partial<Professor> = {};

  constructor(private professorService: ProfessorService) { }

  ngOnInit(): void {
    this.professorService.getProfessors().subscribe((data: Professor[]) => {
      this.professors = data;
    }, error => {
      console.error('Error fetching professors:', error);
    });
  }

  addProfessor(): void {
    if (this.newProfessor.name && this.newProfessor.surname && this.newProfessor.email && this.newProfessor.dateOfBirth && this.newProfessor.password) {
      this.professorService.addProfessor(this.newProfessor as Professor).subscribe((newProfessor: Professor) => {
        this.professors.push(newProfessor);
        this.newProfessor = {};
      }, error => {
        console.error('Error adding professor:', error);
      });
    }
  }

  deleteProfessor(professorId: number): void {
    this.professorService.deleteProfessor(professorId).subscribe(() => {
      this.professors = this.professors.filter(p => p.id !== professorId);
    }, error => {
      console.error('Error deleting professor:', error);
    });
  }
}
