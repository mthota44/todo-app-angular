import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from '../services/auth.service';

/**
 * =========================================================================================
 * 🛡️ AUTH GUARDS EXPLAINED
 * =========================================================================================
 * 
 * 1. WHAT IS A GUARD?
 *    A Guard is a piece of logic (a function) that runs BEFORE the router completes a navigation.
 *    Think of it like a security checkpoint at an airport or a club.
 *    - If the guard returns `true` -> "Access Granted" ✅ (Navigation proceeds).
 *    - If the guard returns `false` -> "Access Denied" ⛔ (Navigation is cancelled).
 *    - It can also redirect the user to a different page (like a login page).
 * 
 * 2. TYPES OF GUARDS (Router Interfaces):
 *    - CanActivate: Checks if a user can visit a route. (e.g., Are you logged in?)
 *    - CanActivateChild: Checks if a user can visit children of a route.
 *    - CanDeactivate: Checks if a user can LEAVE a route. (e.g., You have unsaved changes!)
 *    - CanMatch: Checks if the route definition should even be matched/considered.
 *    - Resolve: Fetches data before the route is activated.
 * 
 * 3. FUNCTIONAL GUARDS:
 *    In modern Angular (v15+), we use simple functions (`CanActivateFn`) instead of classes.
 *    - Easier to write and test.
 *    - Uses `inject()` to access services like Router or AuthService without a constructor.
 * 
 * =========================================================================================
 */

export const authGuard: CanActivateFn = (route, state) => {

    // 1. Inject dependencies
    // 'inject()' allows us to get instances of services inside this function provided by Angular's dependency injection system.
    const authService = inject(AuthService);
    const router = inject(Router);

    console.log(`🛡️ AuthGuard Checking access for: ${state.url}`);

    // 2. Check the condition (Is the user logged in?)
    if (authService.isLoggedIn()) {
        console.log('✅ Access Granted!');
        return true;
    } else {
        console.warn('⛔ Access Denied! User is not logged in. Redirecting to Signin...');

        // 3. Handle the failure
        // Instead of just blocking, we verify helpfulness by sending them to the login page.
        // We typically pass the logic to 'navigate' so the user is not stuck on a blank screen.
        router.navigate(['/signin']);

        return false;
    }
};
