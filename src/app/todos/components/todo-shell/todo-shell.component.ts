import { Component, OnInit } from '@angular/core';
import { Todo } from '../../models/todo';
import { Location, LocationStrategy, HashLocationStrategy } from '@angular/common';
import { VisibilityFilter, mapPathToFilter } from '../../models/visibility-filter.enum';

@Component({
  selector: 'todo-shell',
  templateUrl: './todo-shell.component.html',
  styles: [],
  providers: [
    Location,
    { provide: LocationStrategy, useClass: HashLocationStrategy }
  ]
})
export class TodoShellComponent {
  // Component State
  todoList: Todo[] = [];
  filter: VisibilityFilter;

  // Computed Component State - not the best idea
  get filteredTodoList(): Todo[] {
    return this.filter === VisibilityFilter.All
      ? this.todoList
      : this.todoList.filter(
          t => t.completed === (this.filter === VisibilityFilter.Completed)
        );
  }
  get activeCount() {
    return this.todoList.reduce(
      (count, t) => (t.completed ? count : count + 1),
      0
    );
  }
  get hasCompleted() {
    return this.todoList.findIndex(t => t.completed) !== -1;
  }
  get allCompleted() {
    return this.todoList.findIndex(t => !t.completed) === -1;
  }

  constructor(private location: Location) {
    // No persistence -> probably not the best idea to start filtered
    this.location.replaceState('');

    this.filter = mapPathToFilter(this.location.path());
    this.location.subscribe(s => (this.filter = mapPathToFilter(s.url)));
  }

  // Template Event Handlers
  createTodo(title: string) {
    const id =
      this.todoList.length === 0
        ? 1
        : this.todoList[this.todoList.length - 1].id + 1;
    this.todoList.push({ id, title, completed: false });
  }
  removeTodo(todo: Todo) {
    const ix = this.todoList.indexOf(todo);
    this.todoList.splice(ix, 1);
  }
  removeCompleted() {
    this.todoList = this.todoList.filter(t => !t.completed);
  }

  setAllCompletedStates(completed: boolean) {
    this.todoList.forEach(t => (t.completed = completed));
  }

  // Optimizing ngFor-Directive
  todoId(todo: Todo) {
    return todo.id;
  }
}
