// src/app/app.routes.ts
import { Routes } from '@angular/router';
import { ClassListComponent } from './components/class-list/class-list.component';
import { CourseListComponent } from './components/course-list/course-list.component';
import { StudentListComponent } from './components/student-list/student-list.component';
import { ProfessorListComponent } from './components/professor-list/professor-list.component';

export const routes: Routes = [
  { path: 'classes', component: ClassListComponent },
  { path: 'courses', component: CourseListComponent },
  { path: 'students', component: StudentListComponent },
  { path: 'professors', component: ProfessorListComponent },
  { path: '', redirectTo: '/classes', pathMatch: 'full' }
];
