import { Component, inject, OnInit, OnDestroy } from '@angular/core';
import { RouterOutlet, RouterLink } from '@angular/router';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { TodoService } from './todo.service'; // Import the service
import { Subscription } from 'rxjs';

/**
 * CONCEPTS EXPLAINED:
 * 
 * 1. ngOnInit:
 *    - A Lifecycle Hook. It runs once AFTER the component is initialized.
 *    - This is the standard place to fetch data, make API calls, or "Subscribe" to streams.
 * 
 * 2. Subscribe:
 *    - The function used to "listen" to an Observable (Subject or BehaviorSubject).
 *    - Without .subscribe(), the Observable does nothing (it's "cold").
 *    - It handles the data emitted by the Observable.
 */

@Component({
  selector: 'app-todo',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule, RouterOutlet, RouterLink],
  templateUrl: './todo.component.html',
  styleUrl: './todo.component.css'
})
export class TodoComponent implements OnInit, OnDestroy {

  private fb = inject(FormBuilder);
  // Inject the service where our State (BehaviorSubject) lives
  private todoService = inject(TodoService);

  todoForm: FormGroup = this.fb.group({
    todo: ['', [Validators.required, Validators.minLength(3)]]
  });

  // Local property to hold data for the template
  todos: any[] = [];

  // We keep track of subscriptions to "unsubscribe" later (avoid memory leaks)
  private todoSubscription?: Subscription;
  private notificationSubscription?: Subscription;

  // --- ngOnInit CONCEPT ---
  ngOnInit(): void {
    console.log('ngOnInit: Component Initialized. Setting up subscriptions...');

    // --- SUBSCRIBE CONCEPT ---
    // 1. Subscribe to the BehaviorSubject (the list of Todos)
    // Because it's a BehaviorSubject, this code runs IMMEDIATELY with the initial data.
    // It also runs every time the service runs "next()" on this subject.
    this.todoSubscription = this.todoService.todos$.subscribe({
      next: (data) => {
        console.log('Subscribe: Received new todos list:', data);
        this.todos = data; // Update local variable, causing HTML to update
      },
      error: (err) => console.error('Error:', err),
      complete: () => console.log('Stream completed')
    });

    // 2. Subscribe to the regular Subject (Notifications)
    // This will NOT run immediately. It waits for an event.
    this.notificationSubscription = this.todoService.notificationSubject.subscribe((message) => {
      alert(message); // Show a browser alert for the notification
    });
  }

  // Good practice: Clean up subscriptions when component is destroyed
  ngOnDestroy(): void {
    if (this.todoSubscription) this.todoSubscription.unsubscribe();
    if (this.notificationSubscription) this.notificationSubscription.unsubscribe();
  }

  addTodo() {
    console.log('AddTodo triggered');
    if (this.todoForm.invalid) return;

    const newTodo = {
      id: Date.now(),
      title: this.todoForm.value.todo,
      completed: false
    };

    // Delegate logic to the service
    // We don't push to 'this.todos' directly anymore. 
    // We tell the service to update the 'Source of Truth'.
    this.todoService.addTodo(newTodo);

    this.todoForm.reset();
  }

  toggleTodo(todo: any) {
    this.todoService.toggleTodo(todo);
  }

  deleteTodo(id: number) {
    this.todoService.deleteTodo(id);
  }
}
