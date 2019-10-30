import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { TodoShellComponent } from './components/todo-shell/todo-shell.component';

@NgModule({
  declarations: [
    TodoShellComponent
  ],
  imports: [
    CommonModule
  ],
  exports: [
    TodoShellComponent
  ]
})
export class TodosModule { }
