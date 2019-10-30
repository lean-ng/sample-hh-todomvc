import { Component, Input, EventEmitter, Output } from '@angular/core';
import { Todo } from '../../models/todo';

@Component({
  selector: 'todo-item',
  templateUrl: './todo-item.component.html',
  styles: []
})
export class TodoItemComponent {

  // Component State
  editText: string;
  editMode = false;

  // Public Input Properties
  @Input()
  todo: Todo;

  // Public Output Events
  @Output()
  remove = new EventEmitter();

  // Template Event Handlers
  toggleCompleted() {
    this.todo.completed = !this.todo.completed;
  }
  removeTodo() {
    this.remove.emit();
  }
  beginEdit() {
    this.editText = this.todo.title;
    this.editMode = true;
  }
  cancelEdit() {
    this.editMode = false;
  }
  commitEdit() {
    this.todo.title = this.editText;
    this.editMode = false;
  }
}
