import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
    selector: 'app-storage-demo',
    standalone: true,
    imports: [CommonModule, FormsModule],
    templateUrl: './storage-demo.component.html',
    styleUrls: ['./storage-demo.component.css']
})
export class StorageDemoComponent implements OnInit {

    // =================================================================================
    // 💾 BROWSER STORAGE CONCEPTS
    // =================================================================================

    // 1. LOCAL STORAGE
    // Concept: "Permanent" storage in the browser.
    // - Data stays even if you close the browser or restart the computer.
    // - Good for: User preferences (Dark mode), Auth Tokens (Keep me logged in).
    // - Limit: Approx 5-10MB.
    // - Access: Shared across all tabs/windows of the same website.
    localStorageInput: string = '';
    localStorageValue: string | null = '';

    // 2. SESSION STORAGE
    // Concept: "Temporary" storage for a single tab.
    // - Data is lost immediately when you close the specific tab/window.
    // - Good for: Sensitive data for a single session, Multi-step forms.
    // - Access: NOT shared between tabs.
    sessionStorageInput: string = '';
    sessionStorageValue: string | null = '';

    // 3. COOKIES
    // Concept: Small data meant for the SERVER.
    // - Unlike storage, Cookies are automatically sent to the server with every HTTP request.
    // - Used for: Server-side Authentication (Session IDs), Tracking.
    // - Has an expiration date.
    cookieInput: string = '';
    cookieValue: string = '';

    ngOnInit() {
        this.refreshValues();
    }

    refreshValues() {
        // Reading from Local Storage
        this.localStorageValue = localStorage.getItem('demoBox');

        // Reading from Session Storage
        this.sessionStorageValue = sessionStorage.getItem('demoSession');

        // Reading Cookies (Browser gives all cookies as one long string "key=value; key2=value2")
        this.cookieValue = document.cookie;
    }

    // --- LOCAL STORAGE OPERATIONS ---
    saveToLocal() {
        // API: setItem(key, value) - Value must be a string!
        localStorage.setItem('demoBox', this.localStorageInput);
        this.refreshValues();
        alert('Saved to Local Storage! Try closing and reopening the browser.');
    }

    clearLocal() {
        // API: removeItem(key)
        localStorage.removeItem('demoBox');
        this.refreshValues();
    }

    // --- SESSION STORAGE OPERATIONS ---
    saveToSession() {
        sessionStorage.setItem('demoSession', this.sessionStorageInput);
        this.refreshValues();
        alert('Saved to Session Storage! Try opening a new tab - it won\'t be there.');
    }

    clearSession() {
        sessionStorage.removeItem('demoSession');
        this.refreshValues();
    }

    // --- COOKIE OPERATIONS ---
    saveCookie() {
        // Writing a cookie is weird. You assign a string to document.cookie
        // Format: "key=value; expires=Date; path=/"
        const d = new Date();
        d.setTime(d.getTime() + (1 * 24 * 60 * 60 * 1000)); // 1 day expiry
        const expires = "expires=" + d.toUTCString();

        document.cookie = `demoCookie=${this.cookieInput}; ${expires}; path=/`;
        this.refreshValues();
        alert('Cookie set! It will be sent with every request.');
    }

    clearCookie() {
        // To delete, set expiry date to the past.
        document.cookie = "demoCookie=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
        this.refreshValues();
    }

}
