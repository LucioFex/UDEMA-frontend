import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-course',
  standalone: true,
  imports: [],
  templateUrl: './course.component.html',
  styleUrl: './course.component.css'
})
export class CourseComponent {
  @Input() username = '';
  @Output() addFavoriteEvent = new EventEmitter<string>();

  fav(charName: string) {
    this.addFavoriteEvent.emit(charName);
  }

  characters = [
    {name: "Severus", age: 49},
    {name: "Harry", age: 21},
    {name: "Dumbledore", age: 103}
  ];
}
