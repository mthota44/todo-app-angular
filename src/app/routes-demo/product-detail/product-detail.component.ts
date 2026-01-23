import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute } from '@angular/router';

@Component({
    selector: 'app-product-detail',
    standalone: true,
    imports: [CommonModule],
    template: `
    <div class="product-box">
      <h3>📦 Product Detail Page</h3>
      
      <!-- Displaying Parameter -->
      <p>Current Product ID: <strong>{{ productId }}</strong></p>
      
      <!-- Displaying Query Params -->
      <p>Search Query: <strong>{{ searchQuery }}</strong></p>
      
      <p><small>(Look at the URL address bar! It changed!)</small></p>
    </div>
  `,
    styles: [`
    .product-box {
      border: 2px dashed #FF5722;
      background: #FBE9E7;
      padding: 15px;
      margin-top: 15px;
      border-radius: 8px;
    }
  `]
})
export class ProductDetailComponent {

    // In Angular 16+, we can bind Route parameters directly to Component Inputs!
    // This is the simplest way.
    // Ensure 'withComponentInputBinding()' is enabled in app.config.ts for this to work perfectly,
    // but we will use the classic ActivatedRoute for this demo to be safe and explicit about concepts.

    productId: string | null = '';
    searchQuery: string | null = '';

    constructor(private route: ActivatedRoute) {
        // SUBSCRIBE to params to react when URL changes
        this.route.params.subscribe(params => {
            this.productId = params['id'];
        });

        // SUBSCRIBE to query params (?q=something)
        this.route.queryParams.subscribe(queryParams => {
            this.searchQuery = queryParams['q'];
        });
    }
}
