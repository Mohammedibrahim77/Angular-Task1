import { TestBed } from '@angular/core/testing';
import { StudentService } from './student.service';

describe('StudentService', () => {
  let service: StudentService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(StudentService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should return initial students list', () => {
    const students = service.getStudents();
    expect(students.length).toBeGreaterThan(0);
  });

  it('should add a student with correct status based on grade', () => {
    const initialLength = service.getStudents().length;
    const addedPassed = service.addStudent({ name: 'John Doe', age: 20, grade: 85 });
    expect(addedPassed.status).toBe('Passed');
    expect(service.getStudents().length).toBe(initialLength + 1);

    const addedFailed = service.addStudent({ name: 'Jane Doe', age: 18, grade: 40 });
    expect(addedFailed.status).toBe('Failed');
  });

  it('should delete a student by id', () => {
    const students = service.getStudents();
    const firstId = students[0].id;
    service.deleteStudent(firstId);
    const updatedStudents = service.getStudents();
    expect(updatedStudents.find((s) => s.id === firstId)).toBeUndefined();
  });
});
