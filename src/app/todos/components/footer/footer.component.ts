import { Component, Input, OnChanges, OnInit } from '@angular/core';
import { Todo } from '../../model';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.css']
})
export class FooterComponent implements OnInit, OnChanges {

  @Input()
  todos: Todo[];

  activeCount = 17;

  constructor() { }

  ngOnInit(): void {
  }

  // Best practice: Berechnung nur, wenn Todos sich geändert haben!
  // Das bedeutet: ich muss in der App Immutability-Pattern bedienen
  ngOnChanges(): void {
    this.activeCount = this.todos.reduce( (count, todo) => todo.completed ? count : count + 1, 0  );
  }

  // Bad practices
  // 1. ngDoCheck
  // 2. get activeCount()
  // 3. activeCount(): number {}

}
