import { Injectable } from '@angular/core';
import { Student } from '../models/student.model';

@Injectable({
  providedIn: 'root',
})
export class StudentService {
  private students: Student[] = [
    { id: 1, name: 'Alice Johnson', age: 20, grade: 88, status: 'Passed' },
    { id: 2, name: 'Bob Smith', age: 19, grade: 45, status: 'Failed' },
    { id: 3, name: 'Charlie Brown', age: 22, grade: 96, status: 'Passed' },
  ];
  private nextId = 4;

  getStudents(): Student[] {
    return [...this.students];
  }

  addStudent(
    student: Omit<Student, 'id' | 'status'> & { id?: number; status?: 'Passed' | 'Failed' },
  ): Student {
    const status: 'Passed' | 'Failed' = student.grade >= 50 ? 'Passed' : 'Failed';
    const newStudent: Student = {
      id: student.id || this.nextId++,
      name: student.name,
      age: Number(student.age),
      grade: Number(student.grade),
      status,
    };
    this.students.push(newStudent);
    return newStudent;
  }

  deleteStudent(id: number): void {
    this.students = this.students.filter((student) => student.id !== id);
  }
}
