import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

/**
 * ==============================================================================
 * SERVICE FOR COMMUNICATION
 * ==============================================================================
 * 
 * Concept: Shared Service
 * When components are not directly related (not parent-child), or when you want to share
 * state across the application, a Service is the best way.
 * 
 * We use an Injectable service with RxJS 'BehaviorSubject' to hold the data.
 * Any component can 'subscribe' to get updates and 'next' to send updates.
 */

@Injectable({
    providedIn: 'root' // Available everywhere in the app
})
export class CommunicationService {

    // BehaviorSubject holds the current value and emits it to new subscribers immediately.
    // Initial value is 'Initial Shared Message'
    private messageSource = new BehaviorSubject<string>('Initial Shared Message');

    // We expose the BehaviorSubject as an Observable using .asObservable()
    // Components will subscribe to this 'currentMessage' to get updates.
    currentMessage = this.messageSource.asObservable();

    constructor() { }

    // Method to update the message
    // Components call this method to send new data to everyone listening.
    changeMessage(message: string) {
        this.messageSource.next(message);
        console.log(`[Service] Message updated to: ${message}`);
    }
}
