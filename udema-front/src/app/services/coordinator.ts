import { Injectable } from '@angular/core';
import { Coordinator } from '../model/coordinator';
import { Course } from '../model/course';

@Injectable({
  providedIn: 'root'
})
export class CoordinatorService {
  private coordinators: Coordinator[] = [];

  constructor() { }

  addCoordinator(coordinator: Coordinator): void {
    this.coordinators.push(coordinator);
  }

  getCoordinators(): Coordinator[] {
    return this.coordinators;
  }

  getCoordinatorById(id: number): Coordinator | undefined {
    return this.coordinators.find(coordinator => coordinator.id === id);
  }

  addCourse(coordinatorId: number, course: Course): void {
    const coordinator = this.getCoordinatorById(coordinatorId);
    if (coordinator) {
      coordinator.addCourse(course);
    }
  }

  removeCourse(coordinatorId: number, course: Course): void {
    const coordinator = this.getCoordinatorById(coordinatorId);
    if (coordinator) {
      coordinator.removeCourse(course);
    }
  }
}
