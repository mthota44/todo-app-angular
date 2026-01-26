import { CanDeactivateFn } from '@angular/router';

/**
 * =========================================================================================
 * 🛑 PREVENT UNSAVED CHANGES GUARD (CanDeactivate)
 * =========================================================================================
 * 
 * 1. WHAT IS IT?
 *    This guard runs when a user tries to LEAVE a page.
 *    It is perfect for forms where the user might lose data if they accidentally click a link.
 * 
 * 2. HOW IT WORKS:
 *    It typically checks a property on the component (like `form.dirty` or a boolean flag).
 *    If there are unsaved changes, it prompts the user with `confirm()`.
 *    - If User clicks 'OK' -> Return true (Leave page).
 *    - If User clicks 'Cancel' -> Return false (Stay on page).
 * 
 * 3. GENERIC IMPLEMENTATION:
 *    We define an interface `CanComponentDeactivate` ensuring the component has a `canDeactivate` method.
 *    Or we can just check any component.
 * =========================================================================================
 */

export interface CanComponentDeactivate {
    canDeactivate: () => boolean | Promise<boolean>;
}

export const preventUnsavedChangesGuard: CanDeactivateFn<CanComponentDeactivate> = (component) => {
    // If the component has a specific 'canDeactivate' method, use it.
    if (component.canDeactivate) {
        return component.canDeactivate();
    }
    return true; // Otherwise, allow navigation
};
