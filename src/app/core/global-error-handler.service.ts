
import { ErrorHandler, Injectable } from '@angular/core';

/**
 * Global Error Handler
 * 
 * CONCEPT EXPLAINED:
 * Angular provides a global `ErrorHandler` class that acts as a catch-all for any 
 * exception that occurs within your application. By default, Angular simply logs 
 * events to the console.
 * 
 * By creating our own class that implements `ErrorHandler`, we can intercept 
 * EVERY error that happens in the app (whether in a component, service, or template)
 * and perform custom logic.
 * 
 * Why use this?
 * 1. Centralized Logging: Send error details to a backend logging service (like Sentry, LogRocket, or your own API).
 * 2. User Feedback: Show a friendly "Something went wrong" notification (Toast/Snackbar) instead of the app just crashing silently.
 * 3. Debugging: Format errors in the console to be more readable during development.
 */
@Injectable()
export class GlobalErrorHandler implements ErrorHandler {

    handleError(error: any): void {
        // 1. Log the error to the console (standard behavior)
        console.error('🔥 Global Error Handler caught an error:', error);

        // In a real app, you might want to unwrap the error if it's an HTTP error
        // or a specific framework error to get a cleaner message.

        // 2. Show a notification to the user
        // We use a simple confirm/alert here for demonstration.
        // In a real app, use a Toast service (be careful of cyclic dependencies).
        alert('Global Error Handler Caught:\n' + (error.message || error));
    }
}
