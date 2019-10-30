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

  // Computed Component State - not the best idea
  get activeCount() {
    return this.todoList.reduce((count, t) => t.completed ? count : count + 1, 0);
  }
  get hasCompleted() {
    return this.todoList.findIndex(t => t.completed) !== -1;
  }
  get allCompleted() {
    return this.todoList.findIndex(t => !t.completed) === -1;
  }

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
