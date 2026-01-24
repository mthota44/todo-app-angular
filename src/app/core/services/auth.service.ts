import { Injectable, signal } from '@angular/core';

@Injectable({
    providedIn: 'root'
})
export class AuthService {

    // Using Signals to track login state reactively
    // Initial state: false (Not logged in)
    isLoggedIn = signal<boolean>(false);

    constructor() {
        // Check local storage on startup (concept from Storage Demo)
        const storedToken = localStorage.getItem('demoToken');
        if (storedToken) {
            this.isLoggedIn.set(true);
        }
    }

    login() {
        this.isLoggedIn.set(true);
        localStorage.setItem('demoToken', 'fake-jwt-token');
    }

    logout() {
        this.isLoggedIn.set(false);
        localStorage.removeItem('demoToken');
    }
}
