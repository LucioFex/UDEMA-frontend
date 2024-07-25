import { Component } from '@angular/core';
import { CourseComponent } from "../course/course.component";
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-person',
  standalone: true,
  imports: [CommonModule, CourseComponent],
  templateUrl: './person.component.html',
  styleUrl: './person.component.css'
})
export class PersonComponent {
  username = 'Test-username';

  favChar = '';

  getFavorite(charName: string) {
    this.favChar = charName;
  }


  isPersonLogged=false;
  clicardo() {
    alert("Hello World")
  }
}
