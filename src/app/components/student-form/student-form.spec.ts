import { ComponentFixture, TestBed } from '@angular/core/testing';
import { StudentFormComponent } from './student-form';
import { expect, vi } from 'vitest';

describe('StudentFormComponent', () => {
  let component: StudentFormComponent;
  let fixture: ComponentFixture<StudentFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [StudentFormComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(StudentFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should validate form controls as required', () => {
    const form = component.studentForm;
    expect(form.valid).toBeFalsy();

    form.controls['name'].setValue('Test Student');
    form.controls['age'].setValue(17); // Invalid min 18
    form.controls['grade'].setValue(80);

    expect(form.valid).toBeFalsy();

    form.controls['age'].setValue(19);
    expect(form.valid).toBeTruthy();
  });

  it('should emit studentAdded event when valid form is submitted', () => {
    const spy = vi.spyOn(component.studentAdded, 'emit');

    component.studentForm.controls['name'].setValue('John Smith');
    component.studentForm.controls['age'].setValue(21);
    component.studentForm.controls['grade'].setValue(90);

    component.onSubmit();

    expect(spy).toHaveBeenCalledWith(
      expect.objectContaining({
        name: 'John Smith',
        age: 21,
        grade: 90,
        status: 'Passed',
      }),
    );
  });
});
