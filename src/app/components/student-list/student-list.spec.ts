import { ComponentFixture, TestBed } from '@angular/core/testing';
import { StudentListComponent } from './student-list';

describe('StudentListComponent', () => {
  let component: StudentListComponent;
  let fixture: ComponentFixture<StudentListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [StudentListComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(StudentListComponent);
    component = fixture.componentInstance;
    component.students = [
      { id: 1, name: 'Alice', age: 20, grade: 90, status: 'Passed' },
      { id: 2, name: 'Bob', age: 19, grade: 40, status: 'Failed' },
    ];
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should calculate passed and failed count correctly', () => {
    expect(component.totalPassed).toBe(1);
    expect(component.totalFailed).toBe(1);
  });

  it('should filter students by search term', () => {
    component.searchTerm = 'Alice';
    expect(component.filteredStudents.length).toBe(1);
    expect(component.filteredStudents[0].name).toBe('Alice');
  });

  it('should toggle list visibility', () => {
    expect(component.isListVisible).toBe(true);
    component.toggleListVisibility();
    expect(component.isListVisible).toBe(false);
  });
});
