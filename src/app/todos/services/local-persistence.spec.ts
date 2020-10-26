import { TestBed, async } from '@angular/core/testing';

import { LocalPersistenceService } from './local-persistence.service';

describe('LocalPersistenceService', () => {
  let service: LocalPersistenceService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [LocalPersistenceService]
    });
    service = TestBed.inject(LocalPersistenceService);
    localStorage.clear();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('can add todos', async () => {
    let todo = await service.createTodo('Unit Testing');
    expect(todo.id).toBe(1);
    expect(todo.title).toBe('Unit Testing');
    expect(todo.completed).toBeFalse();
    todo = await service.createTodo('E2E Testing');
    expect(todo.id).toBe(2);
    expect(todo.title).toBe('E2E Testing');
    expect(todo.completed).toBeFalse();
  });

  it('has initially zero todos', async () => {
    const todos = await service.getAll();
    expect(todos.length).toBe(0);
  });

  it('loads correct count of todos', async () => {
    await service.createTodo('Unit Testing');
    await service.createTodo('E2E Testing');

    const todos = await service.getAll();
    expect(todos.length).toBe(2);
  });

  it('updates a todo item', async () => {
    await service.createTodo('Unit Testing');
    await service.createTodo('E2E Testing');

    const todo1 = await service.updateTodo(2, { title: 'Only title changed' });
    const todo2 = await service.updateTodo(1, { completed: true });
    const todos = await service.getAll();

    expect(todo1.title).toBe('Only title changed');
    expect(todo2.completed).toBeTrue();
    expect(todos[1].title).toBe(todo1.title);
    expect(todos[0].completed).toBe(todo2.completed);
  });

  it('deletes todo items', async () => {
    await service.createTodo('Unit Testing');
    await service.createTodo('E2E Testing');

    await service.deleteTodo(1);

    let todos = await service.getAll();
    expect(todos.length).toBe(1);
    expect(todos[0].title).toBe('E2E Testing');

    await service.deleteTodo(2);

    todos = await service.getAll();
    expect(todos.length).toBe(0);
  });
});
