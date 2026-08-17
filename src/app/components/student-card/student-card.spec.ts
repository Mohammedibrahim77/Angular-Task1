import { ComponentFixture, TestBed } from '@angular/core/testing';
import { StudentCardComponent } from './student-card';
import { vi } from 'vitest';

describe('StudentCardComponent', () => {
  let component: StudentCardComponent;
  let fixture: ComponentFixture<StudentCardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [StudentCardComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(StudentCardComponent);
    component = fixture.componentInstance;
    component.student = {
      id: 1,
      name: 'Alice Johnson',
      age: 20,
      grade: 96,
      status: 'Passed',
    };
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should toggle details on button click', () => {
    expect(component.showDetails).toBe(false);
    component.toggleDetails();
    expect(component.showDetails).toBe(true);
  });

  it('should emit delete event when onDelete is called', () => {
    const spy = vi.spyOn(component.delete, 'emit');
    component.onDelete();
    expect(spy).toHaveBeenCalledWith(1);
  });

  it('should correctly classify grade performance', () => {
    expect(component.getGradeClassification(96)).toBe('Excellent');
    expect(component.getGradeClassification(85)).toBe('Very Good');
    expect(component.getGradeClassification(70)).toBe('Good');
    expect(component.getGradeClassification(55)).toBe('Pass');
    expect(component.getGradeClassification(40)).toBe('Failed');
  });
});
