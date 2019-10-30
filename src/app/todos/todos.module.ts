import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { TodoShellComponent } from './components/todo-shell/todo-shell.component';
import { TodoInputComponent } from './components/todo-input/todo-input.component';
import { TodoItemComponent } from './components/todo-item/todo-item.component';
import { FocusOnDirective } from './directives/focus-on.directive';

@NgModule({
  declarations: [
    TodoShellComponent,
    TodoInputComponent,
    TodoItemComponent,
    FocusOnDirective
  ],
  imports: [
    CommonModule
  ],
  exports: [
    TodoShellComponent
  ]
})
export class TodosModule { }
