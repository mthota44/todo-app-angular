import { Injectable } from '@angular/core';
import { BehaviorSubject, Subject } from 'rxjs';

/**
 * Service to manage Todo state using RxJS concepts.
 * 
 * CONCEPTS EXPLAINED:
 * 
 * 1. Observable (General Concept):
 *    - A stream of data that can be observed over time. 
 *    - Think of it like a YouTube channel; you don't get the video until you "Subscribe".
 * 
 * 2. Subject:
 *    - A special type of Observable that allows values to be multicasted to many Observers.
 *    - It acts as both an Observer (can emit data) and an Observable (can be subscribed to).
 *    - DOES NOT hold an initial value. If you subscribe late, you miss past events.
 * 
 * 3. BehaviorSubject:
 *    - A variant of Subject that REQUIRES an initial value.
 *    - Stores the latest value.
 *    - When you subscribe, you IMMEDIATELY get the last emitted value (or the initial one).
 *    - Perfect for "State Management" (like holding a list of todos).
 */

@Injectable({
    providedIn: 'root'
})
export class TodoService {

    // --- 1. SETUP DATA ---

    // Initial state of our Todo list
    private initialTodos = [
        { id: 1, title: 'Learn Angular Basics', completed: false },
        { id: 2, title: 'Understand Directives', completed: true }
    ];

    // --- 2. BEHAVIOR SUBJECT ---
    // We use BehaviorSubject because:
    // a) We need an initial value (the array above).
    // b) Any component subscribing to this should know the CURRENT list of todos immediately.
    // naming convention: subject usually private, exposed as observable
    private todosSubject = new BehaviorSubject<any[]>(this.initialTodos);

    // Expose as Read-Only Observable so components can't mess with the source directly
    todos$ = this.todosSubject.asObservable();


    // --- 3. SUBJECT ---
    // We use a regular Subject for "Events" where we don't care about the past value, only the new one.
    // Example: A notification system.
    // If no one is listening when an event happens, it's okay to miss it.
    public notificationSubject = new Subject<string>();


    constructor() { }

    // Method to get current value (snapshot) if needed, though usually we subscribe
    getTodosSnapshot() {
        return this.todosSubject.value; // Access the current value of BehaviorSubject synchronously
    }

    addTodo(newTodo: any) {
        // 1. Get current data
        const currentTodos = this.todosSubject.value;

        // 2. Modify data
        const updatedTodos = [...currentTodos, newTodo];

        // 3. Emit new value to all subscribers
        // .next() pushes the new value down the stream.
        this.todosSubject.next(updatedTodos);

        // 4. Emit an event on the regular Subject
        this.notificationSubject.next(`Todo "${newTodo.title}" was added!`);
    }

    deleteTodo(id: number) {
        const currentTodos = this.todosSubject.value;
        const updatedTodos = currentTodos.filter(t => t.id !== id);

        // Emit the update
        this.todosSubject.next(updatedTodos);

        this.notificationSubject.next(`Todo with ID ${id} was deleted.`);
    }

    toggleTodo(todo: any) {
        const currentTodos = this.todosSubject.value;
        const updatedTodos = currentTodos.map(t => {
            if (t.id === todo.id) {
                return { ...t, completed: !t.completed };
            }
            return t;
        });

        this.todosSubject.next(updatedTodos);
    }
}
