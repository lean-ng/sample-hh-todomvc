import { Component, OnInit, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'todo-input',
  templateUrl: './todo-input.component.html',
  styles: []
})
export class TodoInputComponent {

  // Public Event
  @Output()
  create = new EventEmitter<string>();

  // Component State
  title = '';

  // Component Event Handler
  createTodo() {
    if (this.title.trim().length > 0) {
      this.create.emit(this.title.trim());
      this.title = '';
    }
  }
}
