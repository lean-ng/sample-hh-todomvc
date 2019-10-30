import { Component, OnInit, Input } from '@angular/core';
import { Todo } from '../../models/todo';

@Component({
  selector: 'todo-item',
  templateUrl: './todo-item.component.html',
  styles: []
})
export class TodoItemComponent {

  // Public Input Properties
  @Input()
  todo: Todo;

  // Template Event Handlers
  toggleCompleted() {
    this.todo.completed = !this.todo.completed;
  }
}
