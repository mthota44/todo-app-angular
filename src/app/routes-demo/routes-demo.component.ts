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
    template: `
    <div class="container">
        <h1>🗺️ Routing Concepts Explained</h1>
        <p>Routing is how we change "Pages" without reloading the browser.</p>

        <div class="row">
            <div class="col control-panel">
                <h2>🎛️ Control Panel</h2>
                
                <!-- 1. ROUTER LINK -->
                <div class="section">
                    <h3>1. RouterLink (HTML)</h3>
                    <p>Best for static menus and links.</p>
                    <a routerLink="/routes-demo/product/101" class="btn link-btn">Open Product 101</a>
                </div>

                <!-- 2. NAVIGATE VS NAVIGATE BY URL -->
                <div class="section">
                    <h3>2. Programmatic Navigation (TS)</h3>
                    <p>Used when you need logic before moving (e.g., after login).</p>
                    
                    <div class="comparison">
                        <button (click)="goWithNavigate()" class="btn nav-btn">
                            Use navigate(['...'])
                        </button>
                        <p class="desc">
                            Better for complex paths.<br>
                            <code>router.navigate(['routes-demo', 'product', 202])</code>
                        </p>
                    </div>

                    <div class="comparison">
                        <button (click)="goWithNavigateByUrl()" class="btn nav-url-btn">
                            Use navigateByUrl('...')
                        </button>
                        <p class="desc">
                            Simple absolute string.<br>
                            <code>router.navigateByUrl('/routes-demo/product/303')</code>
                        </p>
                    </div>
                </div>

                <!-- 3. QUERY PARAMS -->
                <div class="section">
                    <h3>3. Query Params (?key=value)</h3>
                    <button (click)="goWithQuery()" class="btn query-btn">Search for 'iPhone'</button>
                </div>
            </div>

            <!-- THE OUTLET FOR SUB-ROUTES -->
            <div class="col output-panel">
                <h2>📺 Router Outlet</h2>
                <p>Child routes will load below here:</p>
                <hr>
                <!-- This router-outlet is SPECIFIC to this component's children -->
                <router-outlet></router-outlet>
            </div>
        </div>

        <div class="explanation">
            <h3>🤔 navigate() vs navigateByUrl()</h3>
            <ul>
                <li>
                    <strong>navigate(['path', param]):</strong> 
                    <ul>
                        <li>Takes an array.</li>
                        <li>Angular builds the URL for you.</li>
                        <li>Easier to use with variables.</li>
                        <li>Can handle relative paths (relativeTo: this.route).</li>
                    </ul>
                </li>
                <li>
                    <strong>navigateByUrl('/path/param'):</strong> 
                    <ul>
                        <li>Takes a single string.</li>
                        <li>You must manually construct the exact string.</li>
                        <li>Always absolute (starts from root).</li>
                        <li>Slightly faster if you already have the full string.</li>
                    </ul>
                </li>
            </ul>
        </div>
    </div>
  `,
    styles: [`
    .container { padding: 20px; max-width: 1200px; margin: 0 auto; }
    .row { display: flex; gap: 20px; flex-wrap: wrap; }
    .col { flex: 1; min-width: 300px; }
    
    .control-panel { background: #f0f4c3; padding: 20px; border-radius: 10px; border: 2px solid #cddc39; }
    .output-panel { background: #e0f7fa; padding: 20px; border-radius: 10px; border: 2px solid #00bcd4; min-height: 300px; }
    
    .section { margin-bottom: 20px; border-bottom: 1px dotted #999; padding-bottom: 10px; }
    .comparison { margin-bottom: 10px; background: rgba(255,255,255,0.5); padding: 10px; border-radius: 5px; }
    
    .btn { display: inline-block; padding: 10px 15px; text-decoration: none; color: white; border-radius: 5px; border: none; cursor: pointer; margin-bottom: 5px; }
    .link-btn { background: #4caf50; }
    .nav-btn { background: #2196f3; }
    .nav-url-btn { background: #9c27b0; }
    .query-btn { background: #ff9800; }
    
    .desc { font-size: 0.85em; color: #555; margin: 5px 0 0 0; }
    code { background: #eee; padding: 2px 4px; border-radius: 3px; font-family: monospace; }
    
    .explanation { margin-top: 30px; background: #fff3e0; padding: 20px; border-left: 5px solid #ff9800; }
  `]
})
export class RoutesDemoComponent {

    constructor(private router: Router) { }

    // 1. Router.navigate()
    // Benefits: We pass an array. We don't worry about slashes.
    goWithNavigate() {
        const id = 202;
        // Input: ['routes-demo', 'product', 202]
        // Result URL: /routes-demo/product/202
        this.router.navigate(['routes-demo', 'product', id]);
    }

    // 2. Router.navigateByUrl()
    // Benefits: Simple if you have a full string ready.
    // Downside: You must concat strings manually. Harder to maintain.
    goWithNavigateByUrl() {
        const id = 303;
        // We must manually build the string: '/routes-demo/product/303'
        this.router.navigateByUrl(`/routes-demo/product/${id}`);
    }

    // 3. Navigate with Query Params
    goWithQuery() {
        // Result URL: /routes-demo/product/777?q=iPhone&sort=price
        this.router.navigate(['routes-demo', 'product', 777], {
            queryParams: { q: 'iPhone', sort: 'price' }
        });
    }
}
