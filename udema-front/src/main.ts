import { bootstrapApplication } from '@angular/platform-browser';
import { provideRouter, Routes } from '@angular/router';
import { provideHttpClient, withInterceptors } from '@angular/common/http';
import { App } from './app.component';
import { HomeComponent } from './components/home/home.component';
import { CourseDetailsComponent } from './components/course-details/course-details.component';
import { DirectoryComponent } from './components/directory/directory.component';
import { StudentProfileComponent } from './components/student-profile/student-profile.component';
import { ProfessorProfileComponent } from './components/professor-profile/professor-profile.component';
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';
import { AuthService } from './services/auth.service';
import { ApiService } from './services/api.service';
import { authGuard } from './guards/auth.guard';
import { JwtInterceptor } from './services/jwt.interceptor';

const routes: Routes = [
  { path: '', component: HomeComponent, canActivate: [authGuard] },
  { path: 'course/:id', component: CourseDetailsComponent, canActivate: [authGuard] },
  { path: 'directory', component: DirectoryComponent, canActivate: [authGuard] },
  { path: 'student/:id', component: StudentProfileComponent, canActivate: [authGuard] },
  { path: 'professor/:id', component: ProfessorProfileComponent, canActivate: [authGuard] },
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent }
];

bootstrapApplication(App, {
  providers: [
    AuthService,
    ApiService,
    provideRouter(routes),
    provideHttpClient(withInterceptors([JwtInterceptor]))
  ]
});