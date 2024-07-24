import { Component, inject } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faCartShopping, faSearch } from '@fortawesome/free-solid-svg-icons';
import { NgxPaginationModule } from 'ngx-pagination';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { map } from 'rxjs/operators';
import { CartService } from '../services/cart.service';
import { ProductsService } from '../services/products.service';
import $ from "jquery";

@Component({
  selector: 'app-products',
  standalone: true,
  imports: [FontAwesomeModule, RouterLink, NgxPaginationModule],
  templateUrl: './products.component.html',
  styles: `
  .form-check-input, .form-check-label {
    cursor: pointer;
  }
  `
})
export class ProductsComponent {
  faCartShopping = faCartShopping;
  faSearch = faSearch;
  category: string = '';
  itemsPerPage = 9;
  page = 1;
  cartService = inject(CartService);
  productsService = inject(ProductsService);

  constructor(private route: ActivatedRoute, private breakpointObserver: BreakpointObserver) { }

  ngOnInit(): void {

    this.route.params.subscribe((params) => {
      this.category = params['category'];

      return this.route;
    });

    this.productsService.getProductsHomeByCategory(this.category);

    this.breakpointObserver.observe([Breakpoints.Small, Breakpoints.HandsetPortrait])
    .pipe(map(result => result.matches))
    .subscribe(isSmallScreen => {
      this.itemsPerPage = isSmallScreen ? 5 : 9;
    });

    $("#searchBar").on("keyup", () => {
      this.productsService.searchProductByName();
    });

    $("#searchButton").on("click", () => {
      this.productsService.searchProductByName();
    });
  }

  handlePageChange(event: any) {
    this.page = event;
  }
}
