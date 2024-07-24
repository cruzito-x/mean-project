import { Component, inject, OnInit } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { CartService } from '../../services/cart.service';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faSearch, faCartShopping } from '@fortawesome/free-solid-svg-icons';
import { NgxPaginationModule } from 'ngx-pagination';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { map } from 'rxjs/operators';
import { ProductsService } from '../../services/products.service';
import $ from "jquery";

@Component({
  selector: 'app-category',
  standalone: true,
  imports: [FontAwesomeModule, RouterLink, NgxPaginationModule],
  templateUrl: './category.component.html',
  styles: `
  .form-check-input, .form-check-label {
    cursor: pointer;
  }
  `
})
export class CategoryComponent implements OnInit {
  category_id: string = '';
  category: string = '';
  subcategory: string = '';
  subsubcategory: string = '';
  itemsPerPage: number = 9;
  page: number = 1;
  faSearch = faSearch;
  faCartShopping = faCartShopping;

  constructor(private route: ActivatedRoute, private breakpointObserver: BreakpointObserver) {}

  cartService = inject(CartService);
  productsService = inject(ProductsService);

  ngOnInit(): void {
    this.route.params.subscribe((params) => {
      this.category_id = params['id'];
      this.category = params['category'];
      this.subcategory = params['subcategory'];
      this.subsubcategory = params['subsubcategory'];
      this.productsService.getProductsByCategory(this.category_id);

      $("#searchBar").on("keyup", () => {
        this.productsService.searchByNameCategoryAndBrand(this.category_id);
      });
  
      $("#searchButton").on("click", () => {
        this.productsService.searchByNameCategoryAndBrand(this.category_id);
      });


    });

    this.breakpointObserver.observe([Breakpoints.Small, Breakpoints.HandsetPortrait])
    .pipe(map(result => result.matches))
    .subscribe(isSmallScreen => {
      this.itemsPerPage = isSmallScreen ? 5 : 9;
    });
  }

  handlePageChange(event: any) {
    this.page = event;
  }
}
