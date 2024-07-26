// src/app/components/professor-list/professor-list.component.ts
import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProfessorService } from '../../services/professor.service';
import { Professor } from '../../model/professor';
import { HeaderComponent } from '../header/header.component';

@Component({
  selector: 'app-professor-list',
  standalone: true,
  templateUrl: './professor-list.component.html',
  styleUrls: ['./professor-list.component.css'],
  imports: [CommonModule, HeaderComponent]
})
export class ProfessorListComponent implements OnInit {
  professors: Professor[] = [];

  constructor(private professorService: ProfessorService) {}

  ngOnInit(): void {
    this.professorService.getProfessors().subscribe((data: Professor[]) => {
      this.professors = data;
    }, error => {
    });
  }

  deleteProfessor(professorId: number): void {
    this.professorService.deleteProfessor(professorId).subscribe(() => {
      this.professors = this.professors.filter(p => p.id !== professorId);
    });
  }

  updateProfessor(professorId: number, updatedProfessor: Professor): void {
    this.professorService.updateProfessor(professorId, updatedProfessor).subscribe(() => {
      const index = this.professors.findIndex(p => p.id === professorId);
      if (index !== -1) {
        this.professors[index] = updatedProfessor;
      }
    });
  }
}
