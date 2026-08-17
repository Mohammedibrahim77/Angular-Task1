import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StudentFormComponent } from './components/student-form/student-form';
import { StudentListComponent } from './components/student-list/student-list';
import { StudentService } from './services/student.service';
import { Student } from './models/student.model';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, StudentFormComponent, StudentListComponent],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App implements OnInit {
  students: Student[] = [];

  constructor(private studentService: StudentService) {}

  ngOnInit(): void {
    this.loadStudents();
  }

  loadStudents(): void {
    this.students = this.studentService.getStudents();
  }

  onStudentAdded(student: Student): void {
    this.studentService.addStudent(student);
    this.loadStudents();
  }

  onDeleteStudent(id: number): void {
    this.studentService.deleteStudent(id);
    this.loadStudents();
  }
}
