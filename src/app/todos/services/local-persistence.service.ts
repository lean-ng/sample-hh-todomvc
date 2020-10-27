
import { Injectable } from '@angular/core';
import { Todo } from '../model';

@Injectable({
  providedIn: 'root'
})
export class LocalPersistenceService {

  async getAll(): Promise<Todo[]> {
    return this.loadTodos();
  }

  async createTodo(title: string): Promise<Todo> {
    const todos = this.loadTodos();

    const todo: Todo = {
      id: this.generateId(),
      title,
      completed: false
    };

    todos.push(todo);
    this.saveTodos(todos);

    return todo;
  }

  async updateTodo(id: number, changes: Partial<Todo>): Promise<Todo> {
    const todos = this.loadTodos();

    // ensure id is not changed
    delete changes.id;

    const ix = todos.findIndex(t => t.id === id);
    Object.assign(
      todos[ix],
      changes
    );

    this.saveTodos(todos);
    return todos[ix];
  }

  async deleteTodo(id: number): Promise<void> {
    const todos = this.loadTodos();
    this.saveTodos(todos.filter(t => t.id !== id));
  }

  private loadTodos(): Todo[] {
    return JSON.parse(localStorage.todos || '[]');
  }

  private saveTodos(todos: Todo[]): void {
    localStorage.todos = JSON.stringify(todos);
  }

  private generateId(): number {
    const nextId = JSON.parse(localStorage.lastId || '0') + 1;
    localStorage.lastId = nextId;
    return nextId;
  }
}

