import { ChangeDetectionStrategy, Component, EventEmitter, Input, OnChanges, OnInit, Output } from '@angular/core';
import { Todo } from '../../model';
import { LocalPersistenceService } from '../../services/local-persistence.service';

@Component({
  selector: 'app-todo-item',
  templateUrl: './todo-item.component.html',
  styleUrls: ['./todo-item.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class TodoItemComponent implements OnInit {

  // Lokaler Component State, Component Input
  @Input()
  todo: Todo;

  @Output()
  toggleState = new EventEmitter<void>();

  constructor() { }

  ngOnInit(): void {
  }

  toggleTodo(): void {
    this.toggleState.emit();
  }
}
