import { Component,inject } from '@angular/core';
import { ReactiveFormsModule, FormControl, Validators,FormBuilder, FormGroup ,AbstractControl,ValidationErrors } from '@angular/forms';
import { NgIf, NgFor, NgClass,CommonModule } from '@angular/common';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {

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

  // user registrations forms 
  loginForm: FormGroup = this.fb.group({
    email: ['', [Validators.required, Validators.email]],
    password: ['', [Validators.required, Validators.minLength(8), Validators.pattern(/^(?=.*[A-Z])(?=.*\d).+$/)]],
    confirmPassword: ['', [Validators.required]]
  }, {
    validators: this.passwordMatchValidator
  });

  passwordMatchValidator(control: AbstractControl): ValidationErrors | null {
    const password = control.get('password')?.value;
    const confirmPassword = control.get('confirmPassword')?.value;

    if (password !== confirmPassword) {
      return { passwordMismatch: true };
    }
    return null;
  }

  onSubmit() {
    if (this.loginForm.valid) {
      console.log('Form Submitted successfully!', this.loginForm);
    } else {
      console.warn('Form is invalid! Check the errors on the screen.');
      this.loginForm.markAllAsTouched(); // This highlights all red errors for the user
    }
  }

}
