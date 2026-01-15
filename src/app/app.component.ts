import { Component } from '@angular/core';
import { ReactiveFormsModule, FormControl } from '@angular/forms';
import { NgIf, NgFor, NgClass } from '@angular/common';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [ReactiveFormsModule, NgIf, NgFor, NgClass],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {

  todoControl = new FormControl('');
  todos = [
    { id: 1, title: 'Learn Angular Basics', completed: false },
    { id: 2, title: 'Understand Directives', completed: true }
  ];

  addTodo() {
    const value = this.todoControl.value;

    if (!value || value.trim().length < 3) return;

    this.todos.push({
      id: Date.now(),
      title: value,
      completed: false
    });

    this.todoControl.reset();
  }

  toggleTodo(todo: any) {
    todo.completed = !todo.completed;
  }

  deleteTodo(id: number) {
    this.todos = this.todos.filter(todo => todo.id !== id);
  }
}
