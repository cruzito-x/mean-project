import { Component, inject, OnInit } from '@angular/core';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faCartShopping } from '@fortawesome/free-solid-svg-icons';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { CartService } from '../../services/cart.service';
import { NgxPaginationModule } from 'ngx-pagination';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { map } from 'rxjs/operators';
import { ProductsService } from '../../services/products.service';

@Component({
  selector: 'app-brand-products',
  standalone: true,
  imports: [FontAwesomeModule, RouterLink, NgxPaginationModule],
  templateUrl: './brand-products.component.html',
  styles: ``,
})
export class BrandProductsComponent implements OnInit {
  faCartShopping = faCartShopping;
  brand_name: string = '';
  itemsPerPage = 9;
  cartService = inject(CartService);
  productsService = inject(ProductsService);

  constructor(
    private route: ActivatedRoute,
    private breakpointObserver: BreakpointObserver
  ) {}

  ngOnInit(): void {
    this.route.params.subscribe((params) => {
      this.brand_name = params['brand'];

      return this.route;
    });

    this.breakpointObserver
      .observe([Breakpoints.Small, Breakpoints.HandsetPortrait])
      .pipe(map((result) => result.matches))
      .subscribe((isSmallScreen) => {
        this.itemsPerPage = isSmallScreen ? 10 : 9;
      });

      this.productsService.getProductsByBrand(this.brand_name);
  }
}
