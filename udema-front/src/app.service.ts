import { Injectable } from '@angular/core';
import { Student, Professor, Course, Classroom, ClassSession } from './models';

@Injectable({
  providedIn: 'root'
})
export class AppService {
  private students: Student[] = [
    {
      id: 1,
      name: 'John',
      surname: 'Doe',
      userName: 'johndoe',
      age: 20,
      email: 'john.doe@udema.edu',
      dateOfBirth: '2004-05-15',
      major: 'Computer Science',
      year: 3,
      submissionDate: '2022-09-01',
      courses: []
    },
    {
      id: 2,
      name: 'Jane',
      surname: 'Smith',
      userName: 'janesmith',
      age: 19,
      email: 'jane.smith@udema.edu',
      dateOfBirth: '2005-08-22',
      major: 'Mathematics',
      year: 2,
      submissionDate: '2023-09-01',
      courses: []
    },
    {
      id: 3,
      name: 'Mike',
      surname: 'Johnson',
      userName: 'mikejohnson',
      age: 22,
      email: 'mike.johnson@udema.edu',
      dateOfBirth: '2002-03-10',
      major: 'Physics',
      year: 4,
      submissionDate: '2021-09-01',
      courses: []
    }
  ];

  private professors: Professor[] = [
    {
      id: 1,
      name: 'Robert',
      surname: 'Wilson',
      userName: 'rwilson',
      age: 45,
      email: 'robert.wilson@udema.edu',
      dateOfBirth: '1979-11-28',
      department: 'Computer Science',
      title: 'Professor',
      submissionDate: '2010-09-01'
    },
    {
      id: 2,
      name: 'Sarah',
      surname: 'Brown',
      userName: 'sbrown',
      age: 38,
      email: 'sarah.brown@udema.edu',
      dateOfBirth: '1986-04-15',
      department: 'Mathematics',
      title: 'Associate Professor',
      submissionDate: '2015-09-01'
    },
    {
      id: 3,
      name: 'James',
      surname: 'Davis',
      userName: 'jdavis',
      age: 35,
      email: 'james.davis@udema.edu',
      dateOfBirth: '1989-07-20',
      department: 'Physics',
      title: 'Assistant Professor',
      submissionDate: '2018-09-01'
    }
  ];

  private classrooms: Classroom[] = [
    { id: 1, name: 'Room 101', building: 'Science Building' },
    { id: 2, name: 'Room 202', building: 'Engineering Building' },
    { id: 3, name: 'Room 303', building: 'Mathematics Building' },
    { id: 4, name: 'Room 53', building: 'Physics Building' }
  ];

  private generateClassSessions(classrooms: Classroom[]): ClassSession[] {
    const sessions: ClassSession[] = [];
    const startDate = new Date('2025-03-01');
    const dates: Date[] = [];
    
    while (dates.length < 16) {
      const sessionDate = new Date(startDate);
      sessionDate.setDate(startDate.getDate() + Math.floor(Math.random() * 90));
      const dateStr = sessionDate.toISOString().split('T')[0];
      
      if (!dates.find(d => d.toISOString().split('T')[0] === dateStr)) {
        dates.push(sessionDate);
      }
    }
    
    dates.sort((a, b) => a.getTime() - b.getTime());
    
    dates.forEach((date, index) => {
      sessions.push({
        number: index + 1,
        classroom: classrooms[Math.floor(Math.random() * classrooms.length)],
        date: date.toLocaleDateString('en-GB')
      });
    });
    
    return sessions;
  }

  private assignRandomStudents(): Student[] {
    const numberOfStudents = Math.floor(Math.random() * 3) + 1;
    const shuffledStudents = [...this.students].sort(() => 0.5 - Math.random());
    return shuffledStudents.slice(0, numberOfStudents);
  }

  private generateCourseCode(): string {
    const departments = ['CS', 'MATH', 'PHYS', 'ENG', 'BIO', 'CHEM'];
    const department = departments[Math.floor(Math.random() * departments.length)];
    const number = Math.floor(Math.random() * 499) + 101;
    return `${department}${number}`;
  }

  private courses: Course[] = [
    {
      id: 1,
      name: 'Introduction to Programming',
      code: 'CS101',
      description: 'A foundational course covering basic programming concepts, algorithms, and problem-solving techniques using modern programming languages.',
      professor: null,
      students: this.assignRandomStudents(),
      sessions: this.generateClassSessions(this.classrooms)
    },
    {
      id: 2,
      name: 'Linear Algebra',
      code: 'MATH201',
      description: 'Study of linear equations, matrices, vector spaces, determinants, and linear transformations with applications in science and engineering.',
      professor: this.professors[1],
      students: this.assignRandomStudents(),
      sessions: this.generateClassSessions(this.classrooms)
    },
    {
      id: 3,
      name: 'Quantum Mechanics',
      code: 'PHYS301',
      description: 'Advanced course exploring quantum theory, wave functions, Schrödinger equation, and applications in modern physics.',
      professor: null,
      students: this.assignRandomStudents(),
      sessions: this.generateClassSessions(this.classrooms)
    }
  ];

  constructor() {
    // Initialize student courses
    this.courses.forEach(course => {
      course.students.forEach(student => {
        const fullStudent = this.students.find(s => s.id === student.id);
        if (fullStudent) {
          fullStudent.courses.push(course);
        }
      });
    });
  }

  getStudents(): Student[] {
    return this.students;
  }

  getProfessors(): Professor[] {
    return this.professors;
  }

  getCourses(): Course[] {
    return this.courses;
  }

  getStudentById(id: number): Student | undefined {
    return this.students.find(student => student.id === id);
  }

  getProfessorById(id: number): Professor | undefined {
    return this.professors.find(professor => professor.id === id);
  }

  addStudent(student: Student): void {
    this.students.push(student);
  }

  addProfessor(professor: Professor): void {
    this.professors.push(professor);
  }

  assignProfessor(courseId: number, professorId: number): void {
    const course = this.courses.find(c => c.id === courseId);
    const professor = this.professors.find(p => p.id === professorId);
    
    if (course && professor) {
      course.professor = professor;
    }
  }

  removeProfessor(courseId: number): void {
    const course = this.courses.find(c => c.id === courseId);
    if (course) {
      course.professor = null;
    }
  }

  updateStudents(courseId: number, studentIds: number[]): void {
    const course = this.courses.find(c => c.id === courseId);
    if (course) {
      // Remove course from previous students
      course.students.forEach(student => {
        const fullStudent = this.students.find(s => s.id === student.id);
        if (fullStudent) {
          fullStudent.courses = fullStudent.courses.filter(c => c.id !== course.id);
        }
      });

      // Update course students
      course.students = this.students.filter(student => studentIds.includes(student.id));

      // Add course to new students
      course.students.forEach(student => {
        const fullStudent = this.students.find(s => s.id === student.id);
        if (fullStudent) {
          fullStudent.courses.push(course);
        }
      });
    }
  }

  addCourse(course: Omit<Course, 'id' | 'code' | 'students' | 'sessions'>): void {
    const newId = Math.max(...this.courses.map(c => c.id)) + 1;
    this.courses.push({
      ...course,
      id: newId,
      code: this.generateCourseCode(),
      students: [],
      sessions: this.generateClassSessions(this.classrooms)
    });
  }

  deleteCourse(courseId: number): void {
    const index = this.courses.findIndex(c => c.id === courseId);
    if (index !== -1) {
      const course = this.courses[index];
      
      // Remove course from all students
      course.students.forEach(student => {
        const fullStudent = this.students.find(s => s.id === student.id);
        if (fullStudent) {
          fullStudent.courses = fullStudent.courses.filter(c => c.id !== course.id);
        }
      });

      this.courses.splice(index, 1);
    }
  }
}