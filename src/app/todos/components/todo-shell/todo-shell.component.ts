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

  // App state (dependency on local storage)
  private nextId: number   =  JSON.parse(localStorage.nextId || '1');
  private todoList: Todo[] =  JSON.parse(localStorage.todos  || '[]');

  constructor(private location: Location) {
    // No persistence -> probably not the best idea to start filtered
    this.location.replaceState('');

    this.filter = mapPathToFilter(this.location.path());
    this.location.subscribe(s => (this.filter = mapPathToFilter(s.url)));
  }

  // Template Event Handlers
  createTodo(title: string) {
    this.todoList.push({ id: this.nextId, title, completed: false });
    localStorage.nextId = ++this.nextId;
    localStorage.todos  = JSON.stringify(this.todoList);
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
