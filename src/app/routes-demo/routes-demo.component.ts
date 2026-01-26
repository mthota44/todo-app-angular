import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterLink, RouterOutlet } from '@angular/router';

/**
 * ==============================================================================
 * 🛣️ ROUTES CONCEPTS DEMO
 * ==============================================================================
 * 
 * 1. RouterLink: Used in HTML to link pages (like <a href> but for SPAs).
 * 2. Router.navigate(): Used in TS code. It takes an ARRAY of commands.
 *      - Good for dynamic paths: ['.', 'product', productId]
 *      - Handles relative paths well.
 * 3. Router.navigateByUrl(): Used in TS code. Takes a pure STRING.
 *      - Good if you have the full URL string ready.
 *      - Always absolute (starts from root '/').
 */

@Component({
    selector: 'app-routes-demo',
    standalone: true,
    imports: [CommonModule, RouterLink, RouterOutlet],
    templateUrl: './routes-demo.component.html',
    styleUrl: './routes-demo.component.css'
})
export class RoutesDemoComponent {

    // We inject the Router service so we can change pages using code
    constructor(private router: Router) { }

    // 1. Using router.navigate() 
    // This takes an ARRAY. It's safe and easy.
    // Example: ['product', 123] becomes "/product/123"
    goWithNavigate() {
        console.log("Navigating using Array...");
        this.router.navigate(['routes-demo', 'product', 202]);
    }

    // 2. Using router.navigateByUrl()
    // This takes a STRING. You have to type the whole path yourself.
    // Example: "/product/123"
    goWithNavigateByUrl() {
        console.log("Navigating using String...");
        this.router.navigateByUrl('/routes-demo/product/303');
    }

    // 3. Query Params
    // These are optional extras like "?q=iphone".
    // We use the optional argument { queryParams: ... } inside navigate()
    goWithQuery() {
        this.router.navigate(['routes-demo', 'product', 777], {
            queryParams: {
                search: 'iPhone',
                color: 'black'
            }
        });
    }
}
