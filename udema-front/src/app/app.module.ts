// src/app/app.module.ts
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { RouterModule, Routes } from '@angular/router';

import { AppComponent } from './app.component';
import { ClassListComponent } from './components/class-list/class-list.component';
import { CourseListComponent } from './components/course-list/course-list.component';
import { StudentListComponent } from './components/student-list/student-list.component';
import { ProfessorListComponent } from './components/professor-list/professor-list.component';

const routes: Routes = [
  { path: 'classes', component: ClassListComponent },
  { path: 'courses', component: CourseListComponent },
  { path: 'students', component: StudentListComponent },
  { path: 'professors', component: ProfessorListComponent },
  { path: '', redirectTo: '/classes', pathMatch: 'full' }
];

@NgModule({
  imports: [
    BrowserModule,
    HttpClientModule,
    RouterModule.forRoot(routes),
    AppComponent, // Importando el componente independiente
    ClassListComponent,
    CourseListComponent,
    StudentListComponent,
    ProfessorListComponent
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
