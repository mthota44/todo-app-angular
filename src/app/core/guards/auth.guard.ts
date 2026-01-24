import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from '../services/auth.service';

/**
 * =========================================================================================
 * 🛡️ AUTH GUARDS EXPLAINED
 * =========================================================================================
 * 
 * 1. WHAT IS A GUARD?
 *    A Guard is a script that runs BEFORE the router allows access to a page.
 *    It acts like a Security Guard at the door of a club.
 *    If the guard returns 'true' -> "Come on in!" (Navigation proceeds).
 *    If the guard returns 'false' -> "Stop right there!" (Navigation is blocked).
 * 
 * 2. TYPES OF GUARDS:
 *    - CanActivate: Can I enter this route/page? (Most common)
 *    - CanDeactivate: Can I LEAVE this page? (e.g., "You have unsaved changes!")
 *    - CanMatch: Can I even see that this route exists?
 * 
 * 3. FUNCTIONAL GUARDS:
 *    Since Angular 15+, we use simple functions (CanActivateFn) instead of Class-based guards.
 *    It's cleaner and easier to use 'inject()'.
 */

export const authGuard: CanActivateFn = (route, state) => {

    // 1. Inject dependencies needed for the check
    const authService = inject(AuthService);
    const router = inject(Router);

    // 2. Check the condition
    if (authService.isLoggedIn()) {
        console.log('✅ AuthGuard: Access Granted to', state.url);
        return true; // OK to proceed
    } else {
        console.warn('⛔ AuthGuard: Access Denied! User not logged in.');

        // 3. Redirect if blocked (Optional but recommended)
        // Send them to the 'signin' page
        router.navigate(['/signin']);

        return false; // Stop navigation
    }
};
