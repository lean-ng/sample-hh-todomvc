import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Todo } from '../../model';

import { TodoItemComponent } from './todo-item.component';

const todoMock: Todo = {
  id: 45,
  title: 'Unit Testing',
  completed: false
};

describe('TodoItemComponent', () => {
  let component: TodoItemComponent;
  let fixture: ComponentFixture<TodoItemComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TodoItemComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TodoItemComponent);
    component = fixture.componentInstance;
    component.todo = todoMock;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
