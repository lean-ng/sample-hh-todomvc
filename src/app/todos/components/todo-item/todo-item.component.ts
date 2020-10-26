import { Component, Input, OnInit } from '@angular/core';
import { Todo } from '../../model';

@Component({
  selector: 'app-todo-item',
  templateUrl: './todo-item.component.html',
  styleUrls: ['./todo-item.component.css']
})
export class TodoItemComponent implements OnInit {

  // Lokaler Component State, Component Input
  @Input()
  todo: Todo;

  constructor() { }

  ngOnInit(): void {
  }

}
