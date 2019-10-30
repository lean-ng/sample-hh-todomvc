import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { TodoShellComponent } from './components/todo-shell/todo-shell.component';
import { TodoInputComponent } from './components/todo-input/todo-input.component';

@NgModule({
  declarations: [
    TodoShellComponent,
    TodoInputComponent
  ],
  imports: [
    CommonModule
  ],
  exports: [
    TodoShellComponent
  ]
})
export class TodosModule { }
