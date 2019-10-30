import { Component, OnInit } from '@angular/core';
import { Todo } from '../../models/todo';

@Component({
  selector: 'todo-shell',
  templateUrl: './todo-shell.component.html',
  styles: []
})
export class TodoShellComponent {

  // Component State
  todoList: Todo[] = [];

  // Template Event Handlers
  createTodo(title: string) {
    const id = this.todoList.length === 0
      ? 1 : this.todoList[this.todoList.length - 1].id + 1;
    this.todoList.push({ id, title, completed: false });
  }
  removeTodo(todo: Todo) {
    const ix = this.todoList.indexOf(todo);
    this.todoList.splice(ix, 1);
  }

  // Optimizing ngFor-Directive
  todoId(todo: Todo) { return todo.id; }
}
