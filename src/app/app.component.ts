import { Component, OnInit } from '@angular/core';
import { Todo } from './todos/model';
import { LocalPersistenceService } from './todos/services/local-persistence.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {

  constructor(private persistenceSvc: LocalPersistenceService) {}

  // Lokaler Component State
  todos: Todo[] = [];

  // Einmaliger Aufruf bei der Initialisierung der Komponente
  ngOnInit(): void {
    this.persistenceSvc.getAll().then( todos => this.todos = todos);
  }

  createTodo(title: string): void {
    // Delegiere Erzeugung an Service. Dieser liefert erzeugtes Todo
    // zurück. Dieses wird dann dem lokalen State hinzugefügt
    this.persistenceSvc.createTodo(title).then(todo => {
      // Immutable Pattern: keine Mutation, sondern neuer State
      this.todos = [ ...this.todos, todo ];
    });
  }

  toggleTodo(todo: Todo): void {
    this.persistenceSvc.updateTodo(todo.id, {
      completed: !todo.completed
    }).then( changedTodo => {
      // lokale State Änderung (Mutation) - uncool
      // todo.completed = t.completed;
      // Immutable Pattern: neuer lokaler State!
      // this.todos = [ ...this.todos ];
      this.todos =
        this.todos.map( t => t.id === todo.id ? changedTodo : t );
    });
  }

  destroyTodo(id: number): void {
    this.persistenceSvc.deleteTodo(id).then(() => {
      this.todos = this.todos.filter(t => t.id !== id);
    });
  }
}
