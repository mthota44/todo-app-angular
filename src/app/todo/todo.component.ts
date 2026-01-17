import { Component, inject } from '@angular/core';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-todo',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './todo.component.html',
  styleUrl: './todo.component.css'
})
export class TodoComponent {
  private fb = inject(FormBuilder);

  todoForm: FormGroup = this.fb.group({
    todo: ['', [Validators.required, Validators.minLength(3)]]
  });
  todos = [
    { id: 1, title: 'Learn Angular Basics', completed: false },
    { id: 2, title: 'Understand Directives', completed: true }
  ];

  addTodo() {
    console.log('AddTodo triggered');
    if (this.todoForm.invalid) return;

    this.todos.push({
      id: Date.now(),
      title: this.todoForm.value.todo,
      completed: false
    });

    this.todoForm.reset('');
  }

  toggleTodo(todo: any) {
    todo.completed = !todo.completed;
  }

  deleteTodo(id: number) {
    this.todos = this.todos.filter(todo => todo.id !== id);
  }
}
