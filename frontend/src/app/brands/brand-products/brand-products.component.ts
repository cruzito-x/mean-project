import { Component, inject, OnInit } from '@angular/core';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faCartShopping } from '@fortawesome/free-solid-svg-icons';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { CartService } from '../../services/cart.service';
import { NgxPaginationModule } from 'ngx-pagination';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { map } from 'rxjs/operators';

interface Brand {
  id: string;
  name: string;
}

interface Product {
  id: string;
  name: string;
  brand: Brand[];
  category_id: string;
  category: string;
  created_at: string;
  description: string;
  photo: string;
  price: number;
  discount: number;
  rating: number;
  stock: number;
  sub_category: string;
  technical_specifications: string;
  updated_at: string | null;
}

@Component({
  selector: 'app-brand-products',
  standalone: true,
  imports: [FontAwesomeModule, RouterLink, NgxPaginationModule],
  templateUrl: './brand-products.component.html',
  styles: ``,
})
export class BrandProductsComponent implements OnInit {
  products: Product[] = [];
  faCartShopping = faCartShopping;
  brand_name: string = '';
  itemsPerPage = 9;
  page = 1;
  cartService = inject(CartService);

  constructor(
    private route: ActivatedRoute,
    private breakpointObserver: BreakpointObserver
  ) {}

  ngOnInit(): void {
    this.route.params.subscribe((params) => {
      this.brand_name = params['brand'];

      this.getProductsByBrand(this.brand_name);
      return this.route;
    });

    this.breakpointObserver
      .observe([Breakpoints.Small, Breakpoints.HandsetPortrait])
      .pipe(map((result) => result.matches))
      .subscribe((isSmallScreen) => {
        this.itemsPerPage = isSmallScreen ? 10 : 9;
      });
  }

  getProductsByBrand(brand: string) {
    fetch(`http://localhost:3000/products/brand/${brand}`)
      .then((response) => {
        if (!response.ok) {
          throw new Error('Error getting product details');
        }
        return response.json();
      })
      .then((data: Product[]) => {
        this.products = data;
      })
      .catch((error) => console.error('Error:', error));
  }

  handlePageChange(event: any) {
    this.page = event;
  }

  addToCart(product: Product) {
    this.cartService.addToCart(product);
  }
}
