import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Student } from '../../models/student.model';

@Component({
  selector: 'app-student-card',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './student-card.html',
  styleUrl: './student-card.css',
})
export class StudentCardComponent {
  @Input({ required: true }) student!: Student;
  @Output() delete = new EventEmitter<number>();

  showDetails = false;

  toggleDetails(): void {
    this.showDetails = !this.showDetails;
  }

  onDelete(): void {
    this.delete.emit(this.student.id);
  }

  getGradeClassification(grade: number): string {
    if (grade >= 95) return 'Excellent';
    if (grade >= 80) return 'Very Good';
    if (grade >= 65) return 'Good';
    if (grade >= 50) return 'Pass';
    return 'Failed';
  }

  isPassed(): boolean {
    return (this.student?.grade ?? 0) >= 50;
  }
}
