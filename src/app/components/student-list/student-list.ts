import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Student } from '../../models/student.model';
import { StudentCardComponent } from '../student-card/student-card';

@Component({
  selector: 'app-student-list',
  standalone: true,
  imports: [CommonModule, FormsModule, StudentCardComponent],
  templateUrl: './student-list.html',
  styleUrl: './student-list.css',
})
export class StudentListComponent {
  @Input() students: Student[] = [];
  @Output() deleteStudent = new EventEmitter<number>();

  searchTerm = '';
  sortDirection: 'none' | 'asc' | 'desc' = 'none';
  isListVisible = true;

  toggleListVisibility(): void {
    this.isListVisible = !this.isListVisible;
  }

  onDeleteStudent(id: number): void {
    this.deleteStudent.emit(id);
  }

  get filteredStudents(): Student[] {
    let result = this.students.filter((student) =>
      student.name.toLowerCase().includes(this.searchTerm.trim().toLowerCase()),
    );

    if (this.sortDirection === 'asc') {
      result = [...result].sort((a, b) => a.grade - b.grade);
    } else if (this.sortDirection === 'desc') {
      result = [...result].sort((a, b) => b.grade - a.grade);
    }

    return result;
  }

  get totalPassed(): number {
    return this.students.filter((s) => s.grade >= 50).length;
  }

  get totalFailed(): number {
    return this.students.filter((s) => s.grade < 50).length;
  }

  setSort(direction: 'none' | 'asc' | 'desc'): void {
    this.sortDirection = direction;
  }
}
