import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-product-detail',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './product-detail.component.html',
  styleUrl: './product-detail.component.css'
})
export class ProductDetailComponent {

  productId: string | null = '';
  searchQuery: string | null = '';

  // We inject 'ActivatedRoute' because it represents the Current URL info
  constructor(private route: ActivatedRoute) {

    // 1. Get the ID from URL (e.g. /product/101)
    // We 'subscribe' because the URL might change without destroying the component
    this.route.params.subscribe(params => {
      this.productId = params['id'];
    });

    // 2. Get Query Params from URL (e.g. ?search=iPhone)
    this.route.queryParams.subscribe(queryParams => {
      this.searchQuery = queryParams['search'];
    });

  }
}
