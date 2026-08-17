import { Component, EventEmitter, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Student } from '../../models/student.model';

@Component({
  selector: 'app-student-form',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './student-form.html',
  styleUrl: './student-form.css',
})
export class StudentFormComponent {
  @Output() studentAdded = new EventEmitter<Student>();

  studentForm: FormGroup;

  constructor(private fb: FormBuilder) {
    this.studentForm = this.fb.group({
      name: ['', [Validators.required]],
      age: ['', [Validators.required, Validators.min(18)]],
      grade: ['', [Validators.required, Validators.min(0), Validators.max(100)]],
    });
  }

  onSubmit(): void {
    if (this.studentForm.invalid) {
      this.studentForm.markAllAsTouched();
      return;
    }

    const { name, age, grade } = this.studentForm.value;
    const numericGrade = Number(grade);
    const numericAge = Number(age);
    const status: 'Passed' | 'Failed' = numericGrade >= 50 ? 'Passed' : 'Failed';

    const newStudent: Student = {
      id: 0, // Parent/Service will assign unique ID if needed
      name: name.trim(),
      age: numericAge,
      grade: numericGrade,
      status,
    };

    this.studentAdded.emit(newStudent);
    this.studentForm.reset();
  }
}
