import { Component, OnInit } from '@angular/core';
import { Todo } from './todos/model';
import { LocalPersistenceService } from './todos/services/local-persistence.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {

  // Persistence Service ohne DI
  persistenceSvc = new LocalPersistenceService();

  // Lokaler Component State
  todos: Todo[] = [];

  // Einmaliger Aufruf bei der Initialisierung der Komponente
  ngOnInit(): void {
    this.persistenceSvc.getAll().then( todos => this.todos = todos);
  }

  createTodo(title: string): void {
    this.persistenceSvc.createTodo(title).then(todo => this.todos.push(todo));
  }
}
