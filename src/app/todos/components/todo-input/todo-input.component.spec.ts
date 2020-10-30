import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';

import { TodoInputComponent } from './todo-input.component';

describe('TodoInputComponent', () => {
  let component: TodoInputComponent;
  let fixture: ComponentFixture<TodoInputComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TodoInputComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TodoInputComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should clear the title field', () => {

    const inputDE = fixture.debugElement.query(By.css('input'));
    inputDE.nativeElement.value = 'Demo';
    inputDE.triggerEventHandler('change', {});
    inputDE.triggerEventHandler('keyup.enter', {});

    fixture.detectChanges();

    expect(inputDE.nativeElement.value).toBe('');

  });

  it('should not fire the event on empty inputs', () => {
    spyOn(component.create, 'emit');

    const inputDE = fixture.debugElement.query(By.css('input'));
    inputDE.nativeElement.value = '';
    inputDE.triggerEventHandler('change', {});
    inputDE.triggerEventHandler('keyup.enter', {});

    expect(component.create.emit).not.toHaveBeenCalled();
  });

  it('should not fire the event on space inputs', () => {
    spyOn(component.create, 'emit');

    const inputDE = fixture.debugElement.query(By.css('input'));
    inputDE.nativeElement.value = '    ';
    inputDE.triggerEventHandler('change', {});
    inputDE.triggerEventHandler('keyup.enter', {});

    expect(component.create.emit).not.toHaveBeenCalled();
  });
});
