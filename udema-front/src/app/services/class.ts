import { Injectable } from '@angular/core';
import { Class } from '../model/class';

@Injectable({
  providedIn: 'root'
})
export class ClassService {
  private classes: Class[] = [];

  constructor() { }

  addClass(cls: Class): void {
    this.classes.push(cls);
  }

  getClasses(): Class[] {
    return this.classes;
  }

  getClassByNumber(number: number): Class | undefined {
    return this.classes.find(cls => cls.number === number);
  }
}
