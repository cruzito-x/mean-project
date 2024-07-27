import { Component, inject } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faHome, faCartShopping, faSearch } from '@fortawesome/free-solid-svg-icons';
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
  faHome = faHome;
  faCartShopping = faCartShopping;
  faSearch = faSearch;
  subcategory: string = '';
  itemsPerPage = 9;
  cartService = inject(CartService);
  productsService = inject(ProductsService);

  constructor(private route: ActivatedRoute, private breakpointObserver: BreakpointObserver) { }

  ngOnInit(): void {

    this.route.params.subscribe((params) => {
      this.subcategory = params['category'];

      return this.route;
    });

    this.productsService.getProductsBySubcategory(this.subcategory);

    this.breakpointObserver.observe([Breakpoints.Small, Breakpoints.HandsetPortrait])
    .pipe(map(result => result.matches))
    .subscribe(isSmallScreen => {
      this.itemsPerPage = isSmallScreen ? 5 : 9;
    });

    $("#searchBar").on("keyup", () => {
      this.productsService.searchByNameSubcategoryAndBrand(this.subcategory);
    });

    $("#searchButton").on("click", () => {
      this.productsService.searchByNameSubcategoryAndBrand(this.subcategory);
    });
  }
}
