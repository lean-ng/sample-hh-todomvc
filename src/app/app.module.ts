import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { TodoItemComponent } from './todos/components/todo-item/todo-item.component';
import { FooterComponent } from './todos/components/footer/footer.component';
import { TodoInputComponent } from './todos/components/todo-input/todo-input.component';

@NgModule({
  declarations: [
    AppComponent,
    TodoItemComponent,
    FooterComponent,
    TodoInputComponent
  ],
  imports: [
    BrowserModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
