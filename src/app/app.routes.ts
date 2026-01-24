import { Routes } from '@angular/router';
import { SignupComponent } from './signup/signup.component';
import { SigninComponent } from './signin/signin.component';
import { TodoComponent } from './todo/todo.component';
import { TodoInfoComponent } from './todo/components/todo-info/todo-info.component';
import { TodoArchiveComponent } from './todo/components/todo-archive/todo-archive.component';
import { Day5Component } from './day5/day5.component';
import { CommunicationParentComponent } from './communication/communication-parent/communication-parent.component';
import { authGuard } from './core/guards/auth.guard';

/**
 * ==============================================================================
 * 🚀 ANGULAR ROUTING CONCEPTS EXPLAINED
 * ==============================================================================
 * 
 * 1. WHAT IS ROUTING?
 *    Routing is the mechanism that allows users to navigate between different views (pages)
 *    in a Single Page Application (SPA) without reloading the page. 
 *    Instead of requesting a new HTML file from the server, Angular swaps components.
 * 
 * 2. ROUTES ARRAY:
 *    This 'routes' array defines the configuration for the router. 
 *    Each object in the array represents a specific URL path and what should happen when that URL is visited.
 */

export const routes: Routes = [

    // --- BASIC ROUTE ---
    // Concept: Mapping a URL path to a Component.
    // When URL is ".../signup", Angular loads SignupComponent into the <router-outlet>
    { path: 'signup', component: SignupComponent },

    { path: 'signin', component: SigninComponent },

    // --- NESTED ROUTES (CHILD ROUTES) ---
    // Concept: A component can have its own sub-routes.
    // Here, TodoComponent (parent) has its own <router-outlet> inside its HTML.
    // When visiting 'todo/info', TodoComponent remains, and TodoInfoComponent fills IT'S outlet.
    {
        path: 'todo',
        component: TodoComponent,
        children: [
            // The full URL for this would be: localhost:4200/todo/info
            { path: 'info', component: TodoInfoComponent },

            // The full URL for this would be: localhost:4200/todo/archive
            { path: 'archive', component: TodoArchiveComponent }
        ]
    },

    // --- NEW ROUTE ---
    // Protected by AuthGuard: Only logged-in users can see this page.
    { path: 'day5', component: Day5Component, canActivate: [authGuard] },

    // --- COMMUNICATION CONCEPTS ROUTE ---
    { path: 'communication', component: CommunicationParentComponent },

    // --- LAZY LOADED ROUTES ---
    // =================================================================================
    // 💤 CONCEPT: LAZY LOADING
    // =================================================================================
    //
    // 1. WHAT IS IT?
    //    Normally, when you open an Angular app, it downloads ALL the code for ALL pages at once (Eager Loading).
    //    Lazy Loading means we only download the code for a page WHEN THE USER CLICKS ON IT.
    //
    // 2. WHY USE IT? (Performance 🚀)
    //    - Faster Initial Load: The initial bundle size is smaller because it doesn't include every single page.
    //    - Bandwidth Saving: Users don't download code for pages they never visit.
    //
    // 3. SYNTAX: loadComponent
    //    Instead of `component: ComponentName` (which imports it at the top),
    //    we use `loadComponent: () => import('...').then(m => m.ComponentName)`.
    //    This dynamic import tells Webpack/Angular to split this code into a separate "chunk" file.
    // =================================================================================

    // --- MODERN SIGNALS COMMUNICATION ---
    {
        path: 'modern-communication',
        loadComponent: () => import('./communication/modern-parent/modern-parent.component').then(m => m.ModernParentComponent)
    },

    // --- ROUTES DEMO ---
    {
        path: 'routes-demo',
        loadComponent: () => import('./routes-demo/routes-demo.component').then(m => m.RoutesDemoComponent),
        children: [
            // The ':id' is a placeholder for the variable.
            {
                path: 'product/:id',
                loadComponent: () => import('./routes-demo/product-detail/product-detail.component').then(m => m.ProductDetailComponent)
            }
        ]
    },

    // --- LIFECYCLE HOOKS DEMO ---
    {
        path: 'lifecycle-hooks',
        loadComponent: () => import('./lifecycle-demo/lifecycle-demo.component').then(m => m.LifecycleDemoComponent)
    },

    // --- RXJS DEMO ---
    {
        path: 'rxjs',
        loadComponent: () => import('./rxjs-demo/rxjs-demo.component').then(m => m.RxjsDemoComponent)
    },

    // --- ANGULAR BASICS (THEORY) ---
    {
        path: 'angular-basics',
        children: [
            {
                path: '',
                loadComponent: () => import('./angular-basics/angular-basics.component').then(m => m.AngularBasicsComponent)
            },
            {
                path: 'versions',
                loadComponent: () => import('./angular-basics/angular-versions/angular-versions.component').then(m => m.AngularVersionsComponent)
            }
        ]
    },

    // --- FORMS DEMO ---
    {
        path: 'forms-demo',
        loadComponent: () => import('./forms-demo/forms-demo.component').then(m => m.FormsDemoComponent)
    },

    // --- MODULES DEMO ---
    {
        path: 'modules-demo',
        loadComponent: () => import('./modules-demo/modules-demo.component').then(m => m.ModulesDemoComponent)
    },

    // --- STORAGE DEMO ---
    {
        path: 'storage-demo',
        loadComponent: () => import('./storage-demo/storage-demo.component').then(m => m.StorageDemoComponent)
    },

    // --- REDIRECT ROUTE & DEFAULT PATH ---
    // Concept: Handling the empty path (Root URL: localhost:4200/)
    // 'redirectTo': Tells Angular to go to another path immediately.
    // 'pathMatch: full': Crucial concept!
    //    - 'full': Matches ONLY if the entire URL is empty string ''. (Use this for root redirects)
    //    - 'prefix': Matches if the URL *starts* with empty string (which is everything).
    { path: '', redirectTo: '/todo', pathMatch: 'prefix' }

    // --- WILDCARD ROUTE (404 Page) ---
    // You can add a route like this at the very end to catch invalid URLs:
    // { path: '**', component: PageNotFoundComponent }
];

/**
 * 🔑 KEY CONCEPTS SUMMARY:
 * 
 * 1. <router-outlet> (In app.component.html):
 *    This is a placeholder directive. It marks the spot where the router should insert
 *    the component that matches the current URL.
 * 
 * 2. routerLink (In HTML tags, e.g., <a routerLink="/todo">):
 *    This is used instead of 'href'. It tells Angular to change the URL
 *    internally without triggering a browser page reload.
 * 
 * 3. routerLinkActive:
 *    Adds a CSS class (like 'active') to the link when its route is currently active.
 * 
 * 4. ActivatedRoute (Service):
 *    Used inside components to read URL parameters (e.g., /product/:id).
 */
