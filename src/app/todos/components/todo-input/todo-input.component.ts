import { Component, EventEmitter, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-todo-input',
  templateUrl: './todo-input.component.html',
  styleUrls: ['./todo-input.component.css']
})
export class TodoInputComponent implements OnInit {

  @Output()
  create = new EventEmitter<string>();

  constructor() { }

  ngOnInit(): void {
  }

  createHandler(title: string): void {
    if (title.trim().length > 0) {
      this.create.emit(title);
    }
  }
}
